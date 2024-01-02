/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, useMediaQuery, CircularProgress } from "@mui/material";

import { useGetProductsQuery } from "../store/services/api";
import { PageHeader } from "../components";
import ProductComponent from "../components/Product";
import { useState } from "react";


const ProductsPage = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  return (
    <Box sx={{ m: "1.5rem 2.5rem" }}>
      <PageHeader title="Products" subTitle="See your list of products" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data?.map((product) => (
            <ProductComponent
              key={product._id}
              product={product}
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
            />
          ))}
        </Box>
      ) : (
        <Box>
          {/** Loading Componant We Will Make a skeleton*/}
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ProductsPage;
