import {
    Datagrid,
    List,
    TextField,
    Show,
    SimpleShowLayout,
    SearchInput,
    FilterButton,
    TopToolbar,
    ExportButton,
    ArrayField,
    SingleFieldList,
    ChipField,
    useRecordContext,
} from 'react-admin';
import { 
    Box, 
    Typography, 
    Card, 
    CardContent,
    Chip,
} from '@mui/material';
import { 
    Code, 
    Functions,
    Info,
} from '@mui/icons-material';

// Custom toolbar
const ServiceListActions = () => (
    <TopToolbar>
        <FilterButton />
        <ExportButton />
    </TopToolbar>
);

// Filters
const serviceFilters = [
    <SearchInput key="search" source="q" placeholder="Search services..." alwaysOn />,
];

// Custom field for methods count
const MethodsCountField = () => {
    const record = useRecordContext();
    if (!record?.methods) return <span>0</span>;
    return <span>{record.methods.length}</span>;
};

// Custom field for methods with better display
const MethodsField = () => {
    const record = useRecordContext();
    
    if (!record?.methods || record.methods.length === 0) {
        return <span style={{ color: '#999' }}>No methods</span>;
    }

    return (
        <Box display="flex" flexWrap="wrap" gap={0.5}>
            {record.methods.map((method: any, index: number) => (
                <Chip
                    key={index}
                    label={method.name}
                    size="small"
                    variant="outlined"
                    icon={<Functions fontSize="small" />}
                />
            ))}
        </Box>
    );
};

// Service List component
export const ServiceList = () => (
    <List 
        filters={serviceFilters}
        actions={<ServiceListActions />}
        filterDefaultValues={{ q: '' }}
        perPage={25}
    >
        <Datagrid 
            rowClick="show"
            bulkActionButtons={false}
            expand={<ServiceDetails />}
        >
            <TextField source="id" sortable />
            <TextField source="package" sortable />
            <TextField source="name" sortable />
            <MethodsCountField />
            <MethodsField />
        </Datagrid>
    </List>
);

// Service Details component
const ServiceDetails = ({ record }: { record?: any }) => {
    if (!record) return null;

    return (
        <Card sx={{ margin: 2, backgroundColor: '#f5f5f5' }}>
            <CardContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Service Information
                        </Typography>
                        <Box display="flex" flexDirection="column" gap={1}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Code fontSize="small" />
                                <Typography variant="body2">
                                    <strong>Package:</strong> {record.package}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Info fontSize="small" />
                                <Typography variant="body2">
                                    <strong>Name:</strong> {record.name}
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Functions fontSize="small" />
                                <Typography variant="body2">
                                    <strong>Methods:</strong> {record.methods?.length || 0}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Methods
                        </Typography>
                        {record.methods && record.methods.length > 0 ? (
                            <Box display="flex" flexDirection="column" gap={1}>
                                {record.methods.map((method: any, index: number) => (
                                    <Chip
                                        key={index}
                                        label={method.name}
                                        size="small"
                                        variant="outlined"
                                        icon={<Functions fontSize="small" />}
                                    />
                                ))}
                            </Box>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No methods available
                            </Typography>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

// Service Show component
export const ServiceShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="package" />
            <TextField source="name" />
            <ArrayField source="methods">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);
