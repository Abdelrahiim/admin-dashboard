/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from "react";

import { NavBarProps } from "./NavBar";
import {
  Box,
  // Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import {
  // SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  // ShoppingCart,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
} from "@mui/icons-material";

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlexBetween } from ".";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

interface SideBarProps extends NavBarProps {
  isNonMobile: boolean;
  drawerWidth: string;
}

const Sidebar: FC<SideBarProps> = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  // const path
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  return (
    <Box component={"aside"}>
      <Drawer
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        variant="persistent"
        anchor="left"
        transitionDuration={theme.transitions.duration.short}
        sx={{
          width: isSidebarOpen ? drawerWidth : 0,
          "& .MuiDrawer-paper": {
            // @ts-ignore
            color: theme.palette.secondary[200],
            // @ts-ignore
            backgroundColor: theme.palette.background.alt,
            boxSizing: "border-box",
            borderWidth: isNonMobile ? 0 : "2px",
            width: drawerWidth,
          },
        }}
      >
        <Box width="100%">
          {/** LOGO And Title */}
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display={"flex"} alignItems={"center"} gap={"0.5rem"}>
                <Typography variant="h4" fontWeight={"Bold"}>
                  Infinity
                </Typography>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </Box>
            </FlexBetween>
          </Box>
          {/** List */}
          <List>
            {navItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                    {text}
                  </Typography>
                );
              }
              const lowerText = text.toLowerCase();
              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setActive(lowerText);
                      navigate(`/${lowerText}`);
                    }}
                    sx={{
                      backgroundColor:
                        active === lowerText
                          ? // @ts-ignore
                            theme.palette.secondary[200]
                          : "transparent",
                      color:
                        active === lowerText
                          ? // @ts-ignore
                            theme.palette.primary[600]
                          : // @ts-ignore
                            theme.palette.secondary[200],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color:
                          active === lowerText
                            ? // @ts-ignore
                              theme.palette.primary[600]
                            : // @ts-ignore
                              theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {active === lowerText && (
                      <ChevronRightOutlined sx={{ ml: "auto" }} />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
      {/* </animated.div> */}
      {/* )} */}
    </Box>
  );
};
export default Sidebar;
