import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Box,
    Chip,
} from '@mui/material';
import {
    useGetList,
    useGetOne,
    Loading,
} from 'react-admin';
import { CheckCircle, Error as ErrorIcon, Warning } from '@mui/icons-material';

import { API_CONFIG } from './constants/api';

// Health check component
const HealthCheck = () => {
    const { data: liveness, isLoading: livenessLoading, error: livenessError } = useGetOne(
        'health/liveness',
        { id: 'status' },
        { retry: false }
    );

    const { data: readiness, isLoading: readinessLoading, error: readinessError } = useGetOne(
        'health/readiness',
        { id: 'status' },
        { retry: false }
    );

    if (livenessLoading || readinessLoading) return <Loading />;
    if (livenessError || readinessError) return <div>Error loading health status</div>;

    const livenessStatus = liveness ? 'healthy' : 'unhealthy';
    const readinessStatus = readiness ? 'ready' : 'not ready';

    return (
        <Card>
            <CardHeader title="System Health" />
            <CardContent>
                <Box display="flex" gap={2}>
                    <Box display="flex" alignItems="center" gap={1} flex={1}>
                        {livenessStatus === 'healthy' ? (
                            <CheckCircle color="success" />
                        ) : (
                            <ErrorIcon color="error" />
                        )}
                        <Typography variant="body2">
                            Liveness: {livenessStatus}
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} flex={1}>
                        {readinessStatus === 'ready' ? (
                            <CheckCircle color="success" />
                        ) : (
                            <Warning color="warning" />
                        )}
                        <Typography variant="body2">
                            Readiness: {readinessStatus}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

// Statistics component
const Statistics = () => {
    const { data: services, isLoading: servicesLoading } = useGetList('services');
    const { data: stubs, isLoading: stubsLoading } = useGetList('stubs');
    const { data: usedStubs, isLoading: usedStubsLoading } = useGetList('stubs/used');
    const { data: unusedStubs, isLoading: unusedStubsLoading } = useGetList('stubs/unused');

    if (servicesLoading || stubsLoading || usedStubsLoading || unusedStubsLoading) {
        return <Loading />;
    }

    const totalServices = services?.length || 0;
    const totalStubs = stubs?.length || 0;
    const usedStubsCount = usedStubs?.length || 0;
    const unusedStubsCount = unusedStubs?.length || 0;

    return (
        <Card>
            <CardHeader title="Statistics" />
            <CardContent>
                <Box display="flex" flexWrap="wrap" gap={2}>
                    <Box textAlign="center" flex={1} minWidth={120}>
                        <Typography variant="h4" color="primary">
                            {totalServices}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Services
                        </Typography>
                    </Box>
                    <Box textAlign="center" flex={1} minWidth={120}>
                        <Typography variant="h4" color="primary">
                            {totalStubs}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Total Stubs
                        </Typography>
                    </Box>
                    <Box textAlign="center" flex={1} minWidth={120}>
                        <Typography variant="h4" color="success.main">
                            {usedStubsCount}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Used Stubs
                        </Typography>
                    </Box>
                    <Box textAlign="center" flex={1} minWidth={120}>
                        <Typography variant="h4" color="warning.main">
                            {unusedStubsCount}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Unused Stubs
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

// API Info component
const ApiInfo = () => {
    return (
        <Card>
            <CardHeader title="API Information" />
            <CardContent>
                <Box display="flex" flexDirection="column" gap={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" fontWeight="bold">
                            Base URL:
                        </Typography>
                        <Chip label={API_CONFIG.BASE_URL} size="small" />
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" fontWeight="bold">
                            Version:
                        </Typography>
                        <Chip label="3.0.0" size="small" />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

// Main Dashboard component
export const Dashboard = () => {
    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>
                GripMock Dashboard
            </Typography>
            <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                    <HealthCheck />
                </Box>
                <Box>
                    <Statistics />
                </Box>
                <Box maxWidth={400}>
                    <ApiInfo />
                </Box>
            </Box>
        </Box>
    );
};
