/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from "react";

import { NavBarProps } from "./NavBar";
import {
  Box,
  Divider,
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
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  SettingsOutlined,
  CalendarMonthOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
} from "@mui/icons-material";
import profileImage from "../assets/393635635_3537098063168999_981925921939371583_n.jpg";
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
  user,
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
        <Box position={"absolute"} bottom={"2rem"}>
          <Divider />
          <FlexBetween
            textTransform={"none"}
            gap={"1rem"}
            m={"1.5rem 2rem 0rem 3rem"}
          >
            <Box
              component={"img"}
              alt="profile"
              src={profileImage}
              height={"40px"}
              width={"40px"}
              borderRadius={"50%"}
              sx={{ objectFit: "cover" }}
            />
            <Box textAlign={"left"}>
              <Typography
                fontWeight={"bold"}
                fontSize={"0.9rem"}
                sx={{
                  //@ts-ignore
                  color: theme.palette.secondary[200],
                }}
              >
                {user?.name}
              </Typography>
              <Typography
                fontSize={"0.8rem"}
                sx={{
                  //@ts-ignore
                  color: theme.palette.secondary[200],
                }}
              >
                {user?.occupation}
              </Typography>
            </Box>
            <SettingsOutlined
              sx={{
                // @ts-ignore
                color: theme.palette.secondary[300],
              }}
            />
          </FlexBetween>
        </Box>
      </Drawer>
      {/* </animated.div> */}
      {/* )} */}
    </Box>
  );
};
export default Sidebar;
