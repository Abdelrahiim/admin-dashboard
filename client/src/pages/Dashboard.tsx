/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useGetDashboardQuery } from "../store/services/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import millify from "millify";
import {
  BreakdownChart,
  FlexBetween,
  OverviewChart,
  PageHeader,
  StatBox,
} from "../components";
import {
  DownloadOutlined,
  Email,
  PersonAdd,
  PointOfSale,
  Traffic,
} from "@mui/icons-material";

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
      >
        <StatBox
          title={"Total Customers"}
          value={(data && data.totalCustomers) || 0}
          increase={"+14%"}
          icon={
            <Email
              sx={{
                color:
                  // @ts-ignore
                  theme.palette.secondary[300],
                fontSize: "26",
              }}
            />
          }
          description={"Since Last month"}
        />
        <StatBox
          title={"Sales Today"}
          value={(data && data.todayStats.totalSales) || 0}
          increase={"+31%"}
          icon={
            <PointOfSale
              sx={{
                color:
                  // @ts-ignore
                  theme.palette.secondary[300],
                fontSize: "26",
              }}
            />
          }
          description={"Since Last month"}
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          bgcolor={
            // @ts-ignore
            theme.palette.background.alt
          }
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>

        <StatBox
          title={"Monthly Sales"}
          value={(data && data.monthlyData.totalSales) || 0}
          increase={"+21%"}
          icon={
            <PersonAdd
              sx={{
                color:
                  // @ts-ignore
                  theme.palette.secondary[300],
                fontSize: "26",
              }}
            />
          }
          description={"Since Last month"}
        />
        <StatBox
          title={"Yearly Sales"}
          value={(data && data.yearlySalesTotal) || 0}
          increase={"+21%"}
          icon={
            <Traffic
              sx={{
                color:
                  // @ts-ignore
                  theme.palette.secondary[300],
                fontSize: "26",
              }}
            />
          }
          description={"Since Last Year"}
        />

        {/** Row 2 Data grid and Breakdown chart */}
        <Box
          gridColumn={"span 8"}
          gridRow={"span 3"}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor:
                // @ts-ignore
                theme.palette.background.alt,
              // @ts-ignore
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              // @ts-ignore
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              // @ts-ignore
              backgroundColor: theme.palette.background.alt,
              // @ts-ignore
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              // @ts-ignore
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          //@ts-ignore
          bgcolor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography
            variant="h6"
            sx={{
              color:
                // @ts-ignore
                theme.palette.secondary[100],
            }}
          >
            Sales By Category
          </Typography>
          <BreakdownChart isDashBoard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{
              color:
                // @ts-ignore
                theme.palette.secondary[200],
            }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
