import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import {Options} from "ra-core/src/dataProvider/fetch";
import loOrderBy from 'lodash/orderBy'
import loFilter from 'lodash/filter'
import loIteratee from 'lodash/iteratee'
import Fuse from "fuse.js";

const $api = (path: string, options: Options = {}) => {
    const apiUrl = '/api'; // http://localhost:4771/api';

    options.headers = (options.headers || new Headers({Accept: 'application/json'})) as Headers;
    options.headers.set('X-GripMock-RequestInternal', '92b4d5a9-c74b-4ac0-989c-717f80acba22')

    return fetchUtils.fetchJson(`${apiUrl}${path}`, options)
};

const $fuse = (json: Array<object>, fuse: object) => {
    const data = new Fuse(json, {
        keys: Object.keys(fuse),
        includeScore: true,
    })

    for (const query of Object.values(fuse)) {
        console.log('$fuse', query, data.search(query))
    }

    return json
}

const $filter = (json: Array<object>, filter: object) => {
    // @ts-ignore
    const {fuse} = filter
    // @ts-ignore
    delete filter.fuse;

    if (Object.keys(filter).length > 0) {
        json = loFilter(json, loIteratee(filter))
    }

    if (fuse !== undefined) {
        json = $fuse(json, fuse)
    }

    return json
}

const $processing = (json: Array<object>, filter: object, sort: object) => {
    if (filter === undefined && sort === undefined) {
        return json
    }

    // @ts-ignore
    const { field, order } = sort;

    return loOrderBy($filter(json, filter), [field], [order.toLowerCase()])
}

export default {
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `/${resource}?${stringify(query)}`;
        const { json } = await $api(url);

        console.log('$list', json, params)

        return {
            data: $processing(json, params.filter, params.sort),
            total: json.length,
        };
    },

    getOne: async (resource, params) => {
        const { json } = await $api(`/${resource}/${params.id}`);

        return { data: json };
    },

    getMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ ids: params.ids }),
        };
        const url = `/${resource}?${stringify(query)}`;
        const { json } = await $api(url);

        return { data: $processing(json, params.filter, params.sort) };
    },

    getManyReference: async (resource, params) => {
        const url = `/${resource}/${params.id}/${params.target}`;
        const { json } = await $api(url);

        return {
            data: $processing(json, params.filter, params.sort),
            total: json.length,
        };
    },

    create: async (resource, params) => {
        await $api(`/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        })

        return { data: params.data };
    },

    update: async (resource, params) => {
        await $api(`/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        })

        return { id: params.data.id, data: params.data };
    },

    updateMany: async (resource, params) => {
        await $api(`/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        })

        return { data: [] };
    },

    delete: async (resource, params) => {
        const url = `/${resource}/batchDelete`;
        await $api(url, {
            method: 'POST',
            body: JSON.stringify([params.id]),
        });

        return { data: [] };
    },

    deleteMany: async (resource, params) => {
        const url = `/${resource}/batchDelete`;
        await $api(url, {
            method: 'POST',
            body: JSON.stringify(params.ids),
        });

        return { data: [] };
    },
};