export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_GRIPMOCK_API_URL || '/api',
    INTERNAL_HEADER: 'X-GripMock-RequestInternal',
    INTERNAL_VALUE: '92b4d5a9-c74b-4ac0-989c-717f80acba22',
} as const;

export const RESOURCES = {
    SERVICES: 'services',
    STUBS: 'stubs',
} as const;
