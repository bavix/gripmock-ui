import { DataProvider } from 'react-admin';
import loOrderBy from 'lodash/orderBy';
import loFilter from 'lodash/filter';
import loIteratee from 'lodash/iteratee';
import Fuse from 'fuse.js';

import { API_CONFIG } from './constants/api';

// API client
const apiClient = {
    async request<T>(path: string, options: { method?: string; body?: string } = {}): Promise<T> {
        const headers: Record<string, string> = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            [API_CONFIG.INTERNAL_HEADER]: API_CONFIG.INTERNAL_VALUE,
        };

        const response = await fetch(`${API_CONFIG.BASE_URL}${path}`, {
            method: options.method || 'GET',
            headers,
            body: options.body,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }
};

// Data processing utilities for client-side filtering and sorting
const dataProcessing = {
    applyFuseSearch(data: any[], searchCriteria: Record<string, any>): any[] {
        if (!searchCriteria || Object.keys(searchCriteria).length === 0) {
            return data;
        }

        const fuse = new Fuse(data, {
            keys: Object.keys(searchCriteria),
            includeScore: true,
            threshold: 0.3,
        });

        const results = new Set();
        
        for (const value of Object.values(searchCriteria)) {
            const searchResults = fuse.search(value as string);
            searchResults.forEach(result => results.add(result.item));
        }

        return Array.from(results);
    },

    applyGlobalSearch(data: any[], searchTerm: string, resource?: string): any[] {
        if (!searchTerm || searchTerm.trim() === '') {
            return data;
        }

        const searchTermLower = searchTerm.toLowerCase();

        if (resource === 'services') {
            // For services, search in service fields and method names
            return data.filter(service => {
                // Search in service fields
                const serviceMatch = 
                    service.id?.toLowerCase().includes(searchTermLower) ||
                    service.name?.toLowerCase().includes(searchTermLower) ||
                    service.package?.toLowerCase().includes(searchTermLower);
                
                // Search in method names
                const methodMatch = service.methods?.some((method: any) => 
                    method.name?.toLowerCase().includes(searchTermLower) ||
                    method.id?.toLowerCase().includes(searchTermLower)
                );
                
                return serviceMatch || methodMatch;
            });
        } else {
            // Default for stubs and other resources
            const searchKeys = ['id', 'service', 'method', 'headers', 'input', 'inputs', 'output'];
            
            const fuse = new Fuse(data, {
                keys: searchKeys,
                includeScore: true,
                threshold: 0.4,
                ignoreLocation: true,
            });

            const searchResults = fuse.search(searchTerm);
            return searchResults.map(result => result.item);
        }
    },

    applyFilters(data: any[], filters: Record<string, any>, resource?: string): any[] {
        if (!filters || Object.keys(filters).length === 0) {
            return data;
        }

        const { fuse, q, ...otherFilters } = filters;
        
        let filteredData = data;

        // Apply global search first
        if (q) {
            filteredData = this.applyGlobalSearch(filteredData, q, resource);
        }

        // Apply regular filters
        if (Object.keys(otherFilters).length > 0) {
            filteredData = loFilter(filteredData, loIteratee(otherFilters));
        }

        // Apply fuzzy search
        if (fuse) {
            filteredData = this.applyFuseSearch(filteredData, fuse);
        }

        return filteredData;
    },

    applySorting(data: any[], sort: { field: string; order: 'ASC' | 'DESC' }): any[] {
        if (!sort || !sort.field) {
            return data;
        }

        return loOrderBy(data, [sort.field], [sort.order.toLowerCase() as 'asc' | 'desc']);
    },

    processData(data: any[], filters?: Record<string, any>, sort?: { field: string; order: 'ASC' | 'DESC' }, resource?: string): any[] {
        if (!filters && !sort) {
            return data;
        }

        let processedData = data;

        if (filters) {
            processedData = this.applyFilters(processedData, filters, resource);
        }

        if (sort) {
            processedData = this.applySorting(processedData, sort);
        }

        return processedData;
    },

    applyPagination(data: any[], page: number, perPage: number): { data: any[], total: number } {
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const paginatedData = data.slice(startIndex, endIndex);
        
        return {
            data: paginatedData,
            total: data.length,
        };
    }
};

// DataProvider implementation according to GripMock API contract
const dataProvider: DataProvider = {
    getList: async (resource, params) => {
        // API doesn't support query parameters, so we fetch all data and process client-side
        const json = await apiClient.request<any[]>(`/${resource}`);
        
        // Apply client-side filtering and sorting
        const processedData = dataProcessing.processData(json, params.filter, params.sort, resource);
        
        // Apply pagination
        const { page, perPage } = params.pagination || { page: 1, perPage: 25 };
        const result = dataProcessing.applyPagination(processedData, page, perPage);

        return result;
    },

    getOne: async (resource, params) => {
        // For stubs/used and stubs/unused, we need to get from the main stubs endpoint
        if (resource === 'stubs/used' || resource === 'stubs/unused') {
            // Get all stubs and find the one with matching ID
            const allStubs = await apiClient.request<any[]>('/stubs');
            const stub = allStubs.find(s => s.id === params.id);
            
            if (!stub) {
                throw new Error(`Stub with id ${params.id} not found`);
            }
            
            return { data: stub };
        }
        
        // GET /stubs/{uuid} or GET /services/{serviceID}
        const data = await apiClient.request<any>(`/${resource}/${params.id}`);
        return { data };
    },

    getMany: async (resource, params) => {
        // API doesn't support filtering by IDs, so we fetch all and filter client-side
        const json = await apiClient.request<any[]>(`/${resource}`);
        
        // Filter by IDs client-side
        const filteredData = json.filter(item => params.ids.includes(item.id));
        
        return { data: filteredData };
    },

    getManyReference: async (resource, params) => {
        // For services/{id}/methods endpoint
        const url = `/${resource}/${params.id}/${params.target}`;
        const json = await apiClient.request<any[]>(url);

        // Apply client-side filtering and sorting
        const processedData = dataProcessing.processData(json, params.filter, params.sort, resource);

        return {
            data: processedData,
            total: json.length,
        };
    },

    create: async (resource, params) => {
        // POST /stubs - creates new stub(s)
        // API supports both single stub and array of stubs
        const requestBody = Array.isArray(params.data) ? params.data : [params.data];
        
        await apiClient.request(`/${resource}`, {
            method: 'POST',
            body: JSON.stringify(requestBody),
        });

        return { data: params.data as any };
    },

    update: async (resource, params) => {
        // API doesn't have update endpoint, so we use create (POST /stubs)
        // This will create a new stub or update existing one
        // API supports both single stub and array of stubs
        const requestBody = Array.isArray(params.data) ? params.data : [params.data];
        
        await apiClient.request(`/${resource}`, {
            method: 'POST',
            body: JSON.stringify(requestBody),
        });

        // Return the updated data with id
        return { data: { id: params.id, ...params.data } as any };
    },

    updateMany: async (resource, params) => {
        // API supports array of stubs, so we can send all updates at once
        const stubsToUpdate = params.ids.map(id => ({ id, ...params.data }));
        
        await apiClient.request(`/${resource}`, {
            method: 'POST',
            body: JSON.stringify(stubsToUpdate),
        });
        
        return { data: params.ids };
    },

    delete: async (resource, params) => {
        // POST /stubs/batchDelete for single deletion
        await apiClient.request(`/${resource}/batchDelete`, {
            method: 'POST',
            body: JSON.stringify([params.id]),
        });

        return { data: params.id as any };
    },

    deleteMany: async (resource, params) => {
        // POST /stubs/batchDelete for multiple deletions
        await apiClient.request(`/${resource}/batchDelete`, {
            method: 'POST',
            body: JSON.stringify(params.ids),
        });

        return { data: params.ids };
    },
};

export default dataProvider;