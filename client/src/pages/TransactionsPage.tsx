/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetTransactionsQuery } from "../store/services/api";
import { PageHeader } from "../components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import millify from "millify";
const TransactionsPage = () => {
  const theme = useTheme();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [sort, setSort] = useState<
    { felid: string; sort: "asc" | "desc" } | object
  >({});
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort),
    search: search,
  });
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
    <Box sx={{ m: "1.5rem 2.5rem" }}>
      <PageHeader title="Transactions" subTitle="All transactions is here" />
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
          // initialState={{
          //   pagination: {
          //     paginationModel: {
          //       pageSize: 20,
          //     },
          //   },
          // }}
          pagination
          loading={isLoading || !data}
          columns={columns}
          getRowId={(row) => row._id}
          rows={data?.transactions || []}
          rowCount={(data && data.total) || 0}
          paginationModel={paginationModel}
          pageSizeOptions={[paginationModel.pageSize]}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default TransactionsPage;
