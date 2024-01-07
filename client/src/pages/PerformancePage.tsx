/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, useTheme } from "@mui/material";
import { PageHeader } from "../components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useGetUserPerformanceQuery } from "../store/services/api";
import { RootState } from "../store/store";
import millify from "millify";

const PerformancePage = () => {
  const theme = useTheme();
  const userId = useSelector((state: RootState) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
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
    <Box m="1.5rem 2.5rem">
      <PageHeader
        title="PERFORMANCE"
        subTitle="Track your Affiliate Sales Performance Here"
      />
      <Box
        m="1.5rem 2.5rem"
        mt="40px"
        height={"78vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            //@ts-ignore
            backgroundColor: theme.palette.background.alt,
            //@ts-ignore
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            //@ts-ignore
            backgroundColor: theme.palette.background.alt,
            //@ts-ignore
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            //@ts-ignore
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default PerformancePage;
