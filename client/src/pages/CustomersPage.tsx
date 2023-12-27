/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, useTheme } from "@mui/material";
import { PageHeader } from "../components";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetCustomersQuery } from "../store/services/api";
import parsePhoneNumber from "libphonenumber-js";

const CustomersPage = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery(undefined);
  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        const phoneNumber = parsePhoneNumber(params.value, "US");
        return (params.value = phoneNumber?.format("INTERNATIONAL"));
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];
  return (
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
      <PageHeader title="customers" subTitle="List Of Customers" />
      <DataGrid
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 12,
            },
          },
        }}
        loading={isLoading || !data}
        columns={columns}
        getRowId={(row) => row._id}
        rows={data || []}
      ></DataGrid>
    </Box>
  );
};

export default CustomersPage;
