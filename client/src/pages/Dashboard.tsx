/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { useGetDashboardQuery } from "../store/services/api";
import { GridColDef } from "@mui/x-data-grid";
import millify from "millify";
import { FlexBetween, PageHeader } from "../components";
import { DownloadOutlined } from "@mui/icons-material";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery(undefined);
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${millify(params.value)}`,
    },
  ];

  return (
    <Box m={"1rem 1.5rem"}>
      <FlexBetween>
        <PageHeader title="Dashboard" subTitle="Welcome to you dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              //@ts-ignore
              color: theme.palette.background.alt,
              ":hover": {
                backgroundColor:
                  //@ts-ignore
                  theme.palette.secondary[600],
              },
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      {/** Grid Element */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      ></Box>
    </Box>
  );
};

export default Dashboard;
