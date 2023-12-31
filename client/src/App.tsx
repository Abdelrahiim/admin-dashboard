import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useMemo } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components";
import { Navigate } from "react-router-dom";
import {
  CustomersPage,
  DailyPage,
  Dashboard,
  GeographyPage,
  MonthlyPage,
  NotFoundPage,
  ProductsPage,
  TransactionsPage,
  OverviewPage,
  BreakdownPage,
  AdminsPage,
  PerformancePage,
} from "./pages";

/**
 * Creating router using new syntax
 * this allow us to use new apis
 * from react router like loader and actions functions
 *
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/customers" element={<CustomersPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/geography" element={<GeographyPage />} />
      <Route path="/overview" element={<OverviewPage />} />
      <Route path="/daily" element={<DailyPage />} />
      <Route path="/monthly" element={<MonthlyPage />} />
      <Route path="/breakdown" element={<BreakdownPage />} />
      <Route path="/admin" element={<AdminsPage />} />
      <Route path="/performance" element={<PerformancePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  const mode = useSelector((state: RootState) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
