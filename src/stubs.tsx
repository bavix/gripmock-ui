import {
    Datagrid,
    useTheme,
    List,
    TextField,
    ReferenceInput,
    AutocompleteInput,
    Create,
    useInput,
    AutocompleteArrayInput,
    Loading, useGetManyReference, ReferenceArrayInput, ResourceContextProvider,
} from 'react-admin';
import {JsonField, JsonInput} from "@bavix/react-admin-json-view";
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { Show, SimpleShowLayout } from 'react-admin';
import {ReactElement} from "react";

const saveFile = (blob: string, filename: string) => {
    const link = document.createElement("a")
    link.setAttribute("href", encodeURI(`data:application/json;charset=utf-8,${blob}`))
    link.setAttribute("download", filename)
    link.click()
}

const listExporter = (stubs: Array<object>) => {
    saveFile(JSON.stringify(stubs, null, "  "), 'export.json')
}

const MethodSuggest = (props) => {
    const {field: {value}} = useInput({source: "service"})

    const {data, isLoading, error} = useGetManyReference('services', {
        id: value || "grpc.reflection.v1.ServerReflection",
        target: 'methods',
    })

    let suggest = []

    if (!isLoading && data !== undefined && !error) {
        suggest = data
    }

    return <AutocompleteInput {...props} name="method"
            optionText="name"
            optionValue="id"
            label="Method"
            filterToQuery={searchText => ({ fuse: {name: searchText} })}
            choices={suggest}
        />
}

// @ts-ignore
const stubFilters = [
    <ReferenceInput key="service" label="Service" source="service" reference="services" name="service_input">
        <AutocompleteInput name="service"
                           optionText="name"
                           optionValue="id"
                           filterToQuery={searchText => ({ fuse: {name: searchText} })}
                           label="Service"
        />
    </ReferenceInput>,
    <ResourceContextProvider name="method_input" source="method" reference="methods">
        <MethodSuggest />
    </ResourceContextProvider>,
];

export const StubList = () => {
    //filters={stubFilters}>
    return <List exporter={listExporter}>
        <Datagrid rowClick="show">
            <TextField source="id" sortable={true} />
            <TextField source="service" sortable={true} />
            <TextField source="method" sortable={true} />
            <JsonField source="headers" sortable={false} reactJsonOptions={{theme: getJsonTheme()}}/>
            <JsonField source="input" sortable={false} reactJsonOptions={{theme: getJsonTheme()}}/>
            <JsonField source="output" sortable={false} reactJsonOptions={{theme: getJsonTheme()}}/>
        </Datagrid>
    </List>
}

export const StubCreate = () => {
    return <Create>
        <SimpleForm>
            <TextInput source="service"/>
            <TextInput source="method"/>
            <JsonInput source="headers" reactJsonOptions={{theme: getJsonTheme()}}/>
            <JsonInput source="input" reactJsonOptions={{theme: getJsonTheme()}}/>
            <JsonInput source="output" reactJsonOptions={{theme: getJsonTheme()}}/>
        </SimpleForm>
    </Create>
}

export const StubEdit = () => {
    return <Edit>
        <SimpleForm>
            <TextInput source="id"/>
            <TextInput source="service"/>
            <TextInput source="method"/>
            <JsonInput source="headers" reactJsonOptions={{theme: getJsonTheme()}}/>
            <JsonInput source="input" reactJsonOptions={{theme: getJsonTheme()}}/>
            <JsonInput source="output" reactJsonOptions={{theme: getJsonTheme()}}/>
        </SimpleForm>
    </Edit>
}

export const StubShow = () => {
    return <Show>
        <SimpleShowLayout>
            <TextField source="id" sortable={true} />
            <TextField source="service" sortable={true} />
            <TextField source="method" sortable={true} />
            <JsonField source="headers" sortable={false} reactJsonOptions={{theme: getJsonTheme()}}/>
            <JsonField source="input" sortable={false} reactJsonOptions={{theme: getJsonTheme()}}/>
            <JsonField source="output" sortable={false} reactJsonOptions={{theme: getJsonTheme()}}/>
        </SimpleShowLayout>
    </Show>
}

const getJsonTheme = () => {
    const [theme] = useTheme()

    return theme === 'dark' ? "monokai" : 'rjv-default'
}
