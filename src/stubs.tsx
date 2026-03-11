import {
  List,
  TextField,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  NumberField,
  BooleanField,
  BooleanInput,
  Show,
  SimpleShowLayout,
  SearchInput,
  FilterButton,
  TopToolbar,
  ExportButton,
  CreateButton,
  AutocompleteInput,
  useGetList,
} from "react-admin";
import { JsonField } from "./components/json/JsonField";
import { JsonInput } from "./components/json/JsonInput";
import { useState } from "react";
import type { ReactElement } from "react";

import { useJsonTheme } from "./utils/jsonTheme";
import { downloadJsonFile } from "./utils/fileDownload";
import {
  readGridDensity as readStoredGridDensity,
  writeGridDensity,
  type GridDensity,
} from "./utils/uiPreferences";
import { DensityToolbarControl } from "./components/table/DensityToolbarControl";
import { listContentSx } from "./components/table/listStyles";
import { ActiveFiltersSummary } from "./components/table/ActiveFiltersSummary";
import type { StubRecord } from "./types/entities";
import { StubsDatagrid } from "./features/stubs/components/StubsDatagrid";

// Export function for stubs list
const exportStubs = (stubs: object[]) => {
  downloadJsonFile(stubs, "stubs-export.json");
};

const STUB_GRID_DENSITY_KEY = "gripmock.ui.stubs.density";

const readStubsGridDensity = (): GridDensity => {
  return readStoredGridDensity(STUB_GRID_DENSITY_KEY);
};

const useGridDensity = () => {
  const [density, setDensity] = useState<GridDensity>(() => readStubsGridDensity());

  const setNextDensity = (next: GridDensity) => {
    setDensity(next);
    writeGridDensity(STUB_GRID_DENSITY_KEY, next);
  };

  return { density, setNextDensity };
};

// Service Autocomplete Filter
const ServiceFilter = (props: Record<string, unknown>) => {
  const { data: stubs, isLoading } = useGetList<StubRecord>("stubs", {
    pagination: { page: 1, perPage: 1000 },
  });

  if (isLoading) return <TextInput {...props} source="service" label="Service" />;

  // Extract unique services from stubs
  const services = Array.from(
    new Set(stubs?.map((stub) => stub.service).filter(Boolean) || []),
  );

  return (
    <AutocompleteInput
      {...props}
      source="service"
      label="Service"
      choices={services.map((service) => ({ id: service, name: service }))}
    />
  );
};

// Method Autocomplete Filter
const MethodFilter = (props: Record<string, unknown>) => {
  const { data: stubs, isLoading } = useGetList<StubRecord>("stubs", {
    pagination: { page: 1, perPage: 1000 },
  });

  if (isLoading) return <TextInput {...props} source="method" label="Method" />;

  // Extract unique methods from stubs
  const methods = Array.from(
    new Set(stubs?.map((stub) => stub.method).filter(Boolean) || []),
  );

  return (
    <AutocompleteInput
      {...props}
      source="method"
      label="Method"
      choices={methods.map((method) => ({ id: method, name: method }))}
    />
  );
};

// Filters for stubs
const stubFilters = [
  <SearchInput
    key="search"
    source="q"
    placeholder="Search stubs..."
    alwaysOn
  />,
  <ServiceFilter key="service" source="service" label="Service" />,
  <MethodFilter key="method" source="method" label="Method" />,
];

const StubListActions = ({
  density,
  onDensityChange,
}: {
  density: GridDensity;
  onDensityChange: (next: GridDensity) => void;
}) => (
  <TopToolbar>
    <FilterButton />
    <ExportButton />
    <CreateButton />
    <DensityToolbarControl density={density} onChange={onDensityChange} />
  </TopToolbar>
);

// Custom toolbar for used/unused stubs (without create button)
const UsedUnusedStubListActions = ({
  density,
  onDensityChange,
}: {
  density: GridDensity;
  onDensityChange: (next: GridDensity) => void;
}) => (
  <TopToolbar>
    <FilterButton />
    <ExportButton />
    <DensityToolbarControl density={density} onChange={onDensityChange} />
  </TopToolbar>
);

const StubsListPage = ({
  actions,
  density,
  allowDelete,
  allowClone,
}: {
  actions: ReactElement;
  density: GridDensity;
  allowDelete?: boolean;
  allowClone?: boolean;
}) => {
  const gridSize = density === "compact" ? "small" : "medium";

  return (
    <List
      filters={stubFilters}
      actions={actions}
      exporter={exportStubs}
      filterDefaultValues={{ q: "" }}
      perPage={25}
      sx={listContentSx}
    >
      <ActiveFiltersSummary />
      <StubsDatagrid
        gridSize={gridSize}
        allowDelete={allowDelete}
        allowClone={allowClone}
      />
    </List>
  );
};

// Stub List component
export const StubList = () => {
  const { density, setNextDensity } = useGridDensity();

  return (
    <StubsListPage
      actions={<StubListActions density={density} onDensityChange={setNextDensity} />}
      density={density}
      allowDelete
      allowClone
    />
  );
};

// Used Stubs List component
export const UsedStubList = () => {
  const { density, setNextDensity } = useGridDensity();

  return (
    <StubsListPage
      actions={
        <UsedUnusedStubListActions
          density={density}
          onDensityChange={setNextDensity}
        />
      }
      density={density}
    />
  );
};

// Unused Stubs List component
export const UnusedStubList = () => {
  const { density, setNextDensity } = useGridDensity();

  return (
    <StubsListPage
      actions={
        <UsedUnusedStubListActions
          density={density}
          onDensityChange={setNextDensity}
        />
      }
      density={density}
    />
  );
};

// Stub Create component
export const StubCreate = () => {
  const jsonTheme = useJsonTheme();

  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="id"
          fullWidth
          helperText="Optional custom stub ID. Leave empty for generated ID."
        />
        <TextInput source="service" fullWidth />
        <TextInput source="method" fullWidth />
        <NumberInput source="priority" fullWidth />
        <NumberInput
          source="options.times"
          fullWidth
          helperText="0 means unlimited matches"
        />
        <BooleanInput source="input.ignoreArrayOrder" />
        <JsonInput source="headers" reactJsonOptions={{ theme: jsonTheme }} />
        <JsonInput source="input" reactJsonOptions={{ theme: jsonTheme }} />
        <JsonInput source="inputs" reactJsonOptions={{ theme: jsonTheme }} />
        <JsonInput source="output" reactJsonOptions={{ theme: jsonTheme }} />
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
        <NumberInput
          source="options.times"
          fullWidth
          helperText="0 means unlimited matches"
        />
        <BooleanInput source="input.ignoreArrayOrder" />
        <JsonInput source="headers" reactJsonOptions={{ theme: jsonTheme }} />
        <JsonInput source="input" reactJsonOptions={{ theme: jsonTheme }} />
        <JsonInput source="inputs" reactJsonOptions={{ theme: jsonTheme }} />
        <JsonInput source="output" reactJsonOptions={{ theme: jsonTheme }} />
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
        <NumberField source="options.times" label="times" />
        <BooleanField
          source="input.ignoreArrayOrder"
          label="ignoreArrayOrder"
        />
        <JsonField source="headers" reactJsonOptions={{ theme: jsonTheme }} />
        <JsonField source="input" reactJsonOptions={{ theme: jsonTheme }} />
        <JsonField source="inputs" reactJsonOptions={{ theme: jsonTheme }} />
        <JsonField source="output" reactJsonOptions={{ theme: jsonTheme }} />
      </SimpleShowLayout>
    </Show>
  );
};
