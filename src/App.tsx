import { Admin, Resource } from "react-admin";
import StorageIcon from '@mui/icons-material/Storage';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import dataProvider from "./gripmock";
import { 
    StubCreate, 
    StubEdit, 
    StubList, 
    StubShow, 
    UsedStubList, 
    UnusedStubList
} from "./stubs";
import { ServiceList } from "./services";
import { Dashboard } from "./dashboard";
import { CustomLayout } from "./components/Layout/CustomLayout";
import { customTheme, customDarkTheme } from "./theme";

export const App = () => {
    return (
        <Admin
            disableTelemetry
            dataProvider={dataProvider}
            layout={CustomLayout}
            theme={customTheme}
            darkTheme={customDarkTheme}
            dashboard={Dashboard}
        >
            <Resource 
                icon={PrivacyTipIcon} 
                name="services" 
                list={ServiceList}
                options={{ label: 'Services' }}
            />
            <Resource 
                icon={StorageIcon} 
                name="stubs" 
                list={StubList} 
                edit={StubEdit} 
                show={StubShow} 
                create={StubCreate}
                options={{ label: 'Stubs' }}
            />
            <Resource 
                icon={CheckCircleIcon} 
                name="stubs/used" 
                list={UsedStubList}
                options={{ label: 'Used Stubs' }}
            />
            <Resource 
                icon={CancelIcon} 
                name="stubs/unused" 
                list={UnusedStubList}
                options={{ label: 'Unused Stubs' }}
            />
        </Admin>
    );
};
