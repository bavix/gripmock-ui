import {
    Admin,
    Resource,
    Layout,
    AppBar,
    ToggleThemeButton,
    TitlePortal,
    defaultLightTheme,
    defaultDarkTheme,
} from "react-admin";
import dataProvider from "./gripmock";
import {StubCreate, StubEdit, StubList, StubShow} from "./stubs";
import { Typography } from '@mui/material';
import {ServiceList} from "./services";
import StorageIcon from '@mui/icons-material/Storage';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import indigoColor from '@mui/material/colors/indigo';
import deepOrangeColor from '@mui/material/colors/deepOrange';
import redColor from '@mui/material/colors/red';

const myTheme = {
    ...defaultLightTheme,
    palette: {
        primary: indigoColor,
        secondary: deepOrangeColor,
        error: redColor,
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
};

const GMAppBar = () => (
    <AppBar toolbar={<ToggleThemeButton />}>
        <TitlePortal />
        <Typography
            flex="-1"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            variant="h6"
            color="inherit"
            id="react-admin-logo">GripMock UI</Typography>
    </AppBar>
);

const GMLayout = (props) => <Layout {...props} appBar={GMAppBar} />;

export const App = () => (
  <Admin
      disableTelemetry
      dataProvider={dataProvider}
      layout={GMLayout}
      theme={myTheme}
      darkTheme={defaultDarkTheme} >

      <Resource icon={PrivacyTipIcon} name="services" list={ServiceList} />
      <Resource icon={StorageIcon} name="stubs" list={StubList} edit={StubEdit} show={StubShow} create={StubCreate} />
  </Admin>
);
