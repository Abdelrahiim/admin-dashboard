/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetTransactionsQuery } from "../store/services/api";
import { PageHeader } from "../components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import millify from "millify";
import DataGridCustomToolbar from "../components/DataGridCustomToolbar";
import { GridSortModel } from "@mui/x-data-grid";
const TransactionsPage = () => {
  const theme = useTheme();
  // values to be sent to the backend
  // values to be sent to the backend
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });
  const [sort, setSort] = useState<GridSortModel>();
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetTransactionsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort ? sort[0] : {}),
    search,
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
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pageSizeOptions={[10, 20, 50]}
          paginationModel={paginationModel}
          paginationMode="server"
          sortingMode="server"
          onSortModelChange={(sortModel) => setSort(sortModel)}
          // onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          onPaginationModelChange={(model) =>
            setPaginationModel({ page: model.page, pageSize: model.pageSize })
          }
          sortModel={sort}
          slots={{
            toolbar: DataGridCustomToolbar,
          }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default TransactionsPage;
