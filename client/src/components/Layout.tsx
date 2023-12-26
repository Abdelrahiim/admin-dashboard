import { Outlet } from "react-router-dom";
// import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import NavBar from "./NavBar";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useGetUserQuery } from "../store/services/api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
// import { useSelector } from "react-redux";

/**
 *
 * The Whole application Layout Component
 */
const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const userId = useSelector((state: RootState) => state.global.userId);

  const { data } = useGetUserQuery(userId);
  console.log("🚀 ~ file: Layout.tsx:17 ~ Layout ~ data:", data);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <NavBar
          user={data}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
