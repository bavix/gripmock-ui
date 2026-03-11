import { defaultDarkTheme, defaultLightTheme } from "react-admin";
import { createTheme } from "@mui/material/styles";

const fontFamily = [
  "Manrope",
  "Inter",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "sans-serif",
].join(",");

const baseComponents = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundImage:
          "radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.08), transparent 45%), radial-gradient(circle at 100% 0%, rgba(2, 132, 199, 0.08), transparent 35%)",
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        border: "1px solid rgba(15, 23, 42, 0.08)",
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: "12px 14px",
      },
      title: {
        fontSize: "1rem",
      },
      subheader: {
        fontSize: "0.8rem",
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: "12px 14px",
        "&:last-child": {
          paddingBottom: "12px",
        },
      },
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: 12,
        paddingRight: 12,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: 10,
        textTransform: "none" as const,
        fontWeight: 600,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        "& .MuiTableCell-root": {
          fontWeight: 700,
          fontSize: 12,
          letterSpacing: 0.4,
          textTransform: "uppercase" as const,
        },
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        "&:hover": {
          backgroundColor: "rgba(37, 99, 235, 0.04)",
        },
      },
    },
  },
};

export const customTheme = createTheme(defaultLightTheme, {
  typography: {
    fontFamily,
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  palette: {
    mode: "light",
    primary: { main: "#0f4c81" },
    secondary: { main: "#ea580c" },
    error: { main: "#dc2626" },
    background: {
      default: "#f3f6fb",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: baseComponents,
});

export const customDarkTheme = createTheme(defaultDarkTheme, {
  typography: {
    fontFamily,
  },
  palette: {
    mode: "dark",
    primary: { main: "#60a5fa" },
    secondary: { main: "#fb923c" },
    background: {
      default: "#0b1220",
      paper: "#0f172a",
    },
  },
  components: {
    ...baseComponents,
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.14), transparent 45%), radial-gradient(circle at 100% 0%, rgba(2, 132, 199, 0.12), transparent 35%)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: "1px solid rgba(148, 163, 184, 0.2)",
          boxShadow: "0 8px 30px rgba(2, 6, 23, 0.35)",
        },
      },
    },
  },
});
