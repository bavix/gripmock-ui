import {
    Datagrid,
    List,
    TextField,
    SingleFieldList,
    ChipField, ArrayField
} from 'react-admin';

export const ServiceList = () => (
    <List>
        <Datagrid bulkActionButtons={false}>
            <TextField source="id" />
            <TextField source="package" />
            <TextField source="name" />
            <ArrayField source="methods" sortable={false}>
                <SingleFieldList linkType={false}>
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>
        </Datagrid>
    </List>
);
