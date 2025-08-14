import {
    Datagrid,
    List,
    TextField,
    Create,
    Edit,
    SimpleForm,
    TextInput,
    NumberInput,
    Show,
    SimpleShowLayout,
    SearchInput,
    FilterButton,
    TopToolbar,
    ExportButton,
    CreateButton,
    AutocompleteInput,
    useGetList,
    useRecordContext,
} from 'react-admin';
import { JsonField, JsonInput } from "@bavix/react-admin-json-view";
import { 
    Box, 
    Typography, 
    Card, 
    CardContent,
    Divider,
} from '@mui/material';
import { 
    Code, 
    Functions,
} from '@mui/icons-material';

import { useJsonTheme } from './utils/jsonTheme';
import { downloadJsonFile } from './utils/fileDownload';

// Export function for stubs list
const exportStubs = (stubs: object[]) => {
    downloadJsonFile(stubs, 'stubs-export.json');
};

// Service Autocomplete Filter
const ServiceFilter = () => {
    const { data: stubs, isLoading } = useGetList('stubs');
    
    if (isLoading) return <TextInput source="service" />;
    
    // Extract unique services from stubs
    const services = Array.from(new Set(stubs?.map(stub => stub.service).filter(Boolean) || []));
    
    return (
        <AutocompleteInput
            source="service"
            choices={services.map(service => ({ id: service, name: service }))}
        />
    );
};

// Method Autocomplete Filter
const MethodFilter = () => {
    const { data: stubs, isLoading } = useGetList('stubs');
    
    if (isLoading) return <TextInput source="method" />;
    
    // Extract unique methods from stubs
    const methods = Array.from(new Set(stubs?.map(stub => stub.method).filter(Boolean) || []));
    
    return (
        <AutocompleteInput
            source="method"
            choices={methods.map(method => ({ id: method, name: method }))}
        />
    );
};

// Filters for stubs
const stubFilters = [
    <SearchInput key="search" source="q" placeholder="Search stubs..." alwaysOn />,
    <ServiceFilter key="service" />,
    <MethodFilter key="method" />,
];

// Custom toolbar with export and create buttons
const StubListActions = () => (
    <TopToolbar>
        <FilterButton />
        <ExportButton />
        <CreateButton />
    </TopToolbar>
);

// Custom toolbar for used/unused stubs (without create button)
const UsedUnusedStubListActions = () => (
    <TopToolbar>
        <FilterButton />
        <ExportButton />
    </TopToolbar>
);

// Custom field for ID display
const IdField = () => {
    const record = useRecordContext();
    
    if (!record?.id) return <span>-</span>;
    
    return (
        <Typography 
            variant="body2" 
            sx={{ 
                fontFamily: 'monospace',
                fontSize: '0.8rem'
            }}
        >
            {record.id}
        </Typography>
    );
};

// Stub List component
export const StubList = () => {
    const jsonTheme = useJsonTheme();
    
    return (
        <List 
            filters={stubFilters}
            actions={<StubListActions />}
            exporter={exportStubs}
            filterDefaultValues={{ q: '' }}
            perPage={25}
        >
            <Datagrid 
                rowClick="show" 
                bulkActionButtons={false}
                expand={<StubDetails />}
            >
                <IdField />
                <TextField source="service" sortable />
                <TextField source="method" sortable />
                <TextField source="priority" sortable />
                <JsonField source="headers" reactJsonOptions={{ theme: jsonTheme }} />
                <JsonField source="input" reactJsonOptions={{ theme: jsonTheme }} />
                <JsonField source="inputs" reactJsonOptions={{ theme: jsonTheme }} />
                <JsonField source="output" reactJsonOptions={{ theme: jsonTheme }} />
            </Datagrid>
        </List>
    );
};

// Used Stubs List component
export const UsedStubList = () => {
    const jsonTheme = useJsonTheme();
    
    return (
        <List 
            filters={stubFilters}
            actions={<UsedUnusedStubListActions />}
            exporter={exportStubs}
            filterDefaultValues={{ q: '' }}
            perPage={25}
        >
            <Datagrid 
                bulkActionButtons={false}
                expand={<StubDetails />}
            >
                <IdField />
                <TextField source="service" sortable />
                <TextField source="method" sortable />
                <TextField source="priority" sortable />
                <JsonField source="headers" reactJsonOptions={{ theme: jsonTheme }} />
                <JsonField source="input" reactJsonOptions={{ theme: jsonTheme }} />
                <JsonField source="inputs" reactJsonOptions={{ theme: jsonTheme }} />
                <JsonField source="output" reactJsonOptions={{ theme: jsonTheme }} />
            </Datagrid>
        </List>
    );
};

// Unused Stubs List component
export const UnusedStubList = () => {
    const jsonTheme = useJsonTheme();
    
    return (
        <List 
            filters={stubFilters}
            actions={<UsedUnusedStubListActions />}
            exporter={exportStubs}
            filterDefaultValues={{ q: '' }}
            perPage={25}
        >
            <Datagrid 
                bulkActionButtons={false}
                expand={<StubDetails />}
            >
                <IdField />
                <TextField source="service" sortable />
                <TextField source="method" sortable />
                <TextField source="priority" sortable />
                <JsonField source="headers" reactJsonOptions={{ theme: jsonTheme }} />
                <JsonField source="input" reactJsonOptions={{ theme: jsonTheme }} />
                <JsonField source="inputs" reactJsonOptions={{ theme: jsonTheme }} />
                <JsonField source="output" reactJsonOptions={{ theme: jsonTheme }} />
            </Datagrid>
        </List>
    );
};

// Stub Details component
const StubDetails = ({ record }: { record?: any }) => {
    const jsonTheme = useJsonTheme();
    
    if (!record) return null;

    return (
        <Card sx={{ margin: 2, backgroundColor: '#f8f9fa' }}>
            <CardContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Stub Details
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="body2">
                                    <strong>ID:</strong> {record.id}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Code fontSize="small" />
                                <Typography variant="body2">
                                    <strong>Service:</strong> {record.service}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Functions fontSize="small" />
                                <Typography variant="body2">
                                    <strong>Method:</strong> {record.method}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="body2">
                                    <strong>Priority:</strong> {record.priority || 0}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    
                    <Divider />
                    
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Headers
                        </Typography>
                        {record.headers ? (
                            <JsonField 
                                source="headers" 
                                reactJsonOptions={{ 
                                    theme: jsonTheme,
                                    collapsed: 2,
                                    displayDataTypes: false,
                                    displayObjectSize: false,
                                }}
                            />
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No headers
                            </Typography>
                        )}
                    </Box>
                    
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Input
                        </Typography>
                        {record.input ? (
                            <JsonField 
                                source="input" 
                                reactJsonOptions={{ 
                                    theme: jsonTheme,
                                    collapsed: 2,
                                    displayDataTypes: false,
                                    displayObjectSize: false,
                                }}
                            />
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No input data
                            </Typography>
                        )}
                    </Box>
                    
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Inputs (Array)
                        </Typography>
                        {record.inputs && Array.isArray(record.inputs) && record.inputs.length > 0 ? (
                            <JsonField 
                                source="inputs" 
                                reactJsonOptions={{ 
                                    theme: jsonTheme,
                                    collapsed: 2,
                                    displayDataTypes: false,
                                    displayObjectSize: false,
                                }}
                            />
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No inputs data
                            </Typography>
                        )}
                    </Box>
                    
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Output
                        </Typography>
                        {record.output ? (
                            <JsonField 
                                source="output" 
                                reactJsonOptions={{ 
                                    theme: jsonTheme,
                                    collapsed: 2,
                                    displayDataTypes: false,
                                    displayObjectSize: false,
                                }}
                            />
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No output data
                            </Typography>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

// Stub Create component
export const StubCreate = () => {
    const jsonTheme = useJsonTheme();
    
    return (
        <Create>
            <SimpleForm>
                <TextInput source="service" fullWidth />
                <TextInput source="method" fullWidth />
                <NumberInput source="priority" fullWidth />
                <JsonInput 
                    source="headers" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonInput 
                    source="input" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonInput 
                    source="inputs" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonInput 
                    source="output" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
            </SimpleForm>
        </Create>
    );
};

// Stub Edit component
export const StubEdit = () => {
    const jsonTheme = useJsonTheme();
    
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id" fullWidth disabled />
                <TextInput source="service" fullWidth />
                <TextInput source="method" fullWidth />
                <NumberInput source="priority" fullWidth />
                <JsonInput 
                    source="headers" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonInput 
                    source="input" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonInput 
                    source="inputs" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonInput 
                    source="output" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
            </SimpleForm>
        </Edit>
    );
};

// Stub Show component
export const StubShow = () => {
    const jsonTheme = useJsonTheme();
    
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="service" />
                <TextField source="method" />
                <TextField source="priority" />
                <JsonField 
                    source="headers" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonField 
                    source="input" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonField 
                    source="inputs" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonField 
                    source="output" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
            </SimpleShowLayout>
        </Show>
    );
};

// Used Stub Show component
export const UsedStubShow = () => {
    const jsonTheme = useJsonTheme();
    
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="service" />
                <TextField source="method" />
                <TextField source="priority" />
                <JsonField 
                    source="headers" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonField 
                    source="input" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonField 
                    source="inputs" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonField 
                    source="output" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
            </SimpleShowLayout>
        </Show>
    );
};

// Unused Stub Show component
export const UnusedStubShow = () => {
    const jsonTheme = useJsonTheme();
    
    return (
        <Show>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="service" />
                <TextField source="method" />
                <TextField source="priority" />
                <JsonField 
                    source="headers" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonField 
                    source="input" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonField 
                    source="inputs" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonField 
                    source="output" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
            </SimpleShowLayout>
        </Show>
    );
};

// Used Stub Edit component
export const UsedStubEdit = () => {
    const jsonTheme = useJsonTheme();
    
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id" fullWidth disabled />
                <TextInput source="service" fullWidth />
                <TextInput source="method" fullWidth />
                <NumberInput source="priority" fullWidth />
                <JsonInput 
                    source="headers" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonInput 
                    source="input" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonInput 
                    source="inputs" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonInput 
                    source="output" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
            </SimpleForm>
        </Edit>
    );
};

// Unused Stub Edit component
export const UnusedStubEdit = () => {
    const jsonTheme = useJsonTheme();
    
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id" fullWidth disabled />
                <TextInput source="service" fullWidth />
                <TextInput source="method" fullWidth />
                <NumberInput source="priority" fullWidth />
                <JsonInput 
                    source="headers" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonInput 
                    source="input" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonInput 
                    source="inputs" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
                <JsonInput 
                    source="output" 
                    reactJsonOptions={{ theme: jsonTheme }}
                />
            </SimpleForm>
        </Edit>
    );
};
