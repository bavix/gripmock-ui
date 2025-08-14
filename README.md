# GripMock UI

Modern admin panel for GripMock, built with React-Admin 5.x using React and TypeScript best practices.

## Project Structure

```
src/
├── components/           # Reusable components
│   └── Layout/          # Layout components
│       ├── CustomAppBar.tsx
│       └── CustomLayout.tsx
├── constants/           # Application constants
│   └── api.ts          # API constants
├── theme/              # Theme configuration
│   └── index.ts
├── utils/              # Utilities
│   ├── fileDownload.ts
│   └── jsonTheme.ts
├── App.tsx             # Main application component
├── gripmock.tsx        # DataProvider for API
├── index.tsx           # Entry point
├── services.tsx        # Components for services
└── stubs.tsx           # Components for stubs
```

## Features

- **Modern Architecture**: Uses React-Admin 5.x with best practices
- **TypeScript**: Full typing for better development
- **Modular Structure**: Components separated by functionality
- **Customizable Theme**: Support for light and dark themes
- **JSON Editor**: Built-in JSON editor for data manipulation
- **Data Export**: Ability to export stubs to JSON
- **Client-side Processing**: Filtering, sorting and pagination on client

## Installation and Setup

```bash
# Install dependencies
npm install

# Setup environment variables (optional)
cp env.example .env
# Edit .env file if needed

# Run in development mode
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Code formatting
npm run format
```

### Environment Variables

Create a `.env` file in the project root to configure the API:

```bash
# API Configuration
VITE_GRIPMOCK_API_URL=http://localhost:4771/api
```

If `VITE_GRIPMOCK_API_URL` is not specified, the default value `/api` is used.

## API Integration

The project uses a custom DataProvider to integrate with the GripMock API. Since the API doesn't support standard React-Admin parameters (sort, range, filter), these functions are implemented on the client side.

### Main endpoints:
- `GET /api/services` - get list of services
- `GET /api/services/{serviceID}/methods` - get service methods
- `GET /api/stubs` - get list of stubs
- `GET /api/stubs/{uuid}` - get stub by ID
- `POST /api/stubs` - create new stub
- `POST /api/stubs/batchDelete` - delete stubs by ID

### DataProvider Features:
- **Client-side Filtering**: Support for regular filters and fuzzy search
- **Client-side Sorting**: Sorting by any field
- **Client-side Pagination**: Proper total count
- **Error Handling**: Correct HTTP error handling

## Development

### Adding New Components

1. Create a component in the appropriate folder
2. Use TypeScript for typing
3. Follow React-Admin 5.x principles
4. Add documentation

### Working with Theme

Theme is configured in `src/theme/index.ts`. Customization of colors and other parameters is supported.

### Utilities

- `useJsonTheme()` - hook for getting JSON editor theme
- `downloadJsonFile()` - function for downloading JSON files

### Performance

- For large amounts of data, it's recommended to use reasonable limits for perPage
- All data is loaded into browser memory for client-side processing
- Consider server-side pagination for large datasets

## License

MIT

