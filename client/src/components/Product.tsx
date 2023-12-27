/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import { Product } from "../types";
import { Dispatch, FC, SetStateAction } from "react";
import millify from "millify";

interface ProductComponentProps {
  product: Product;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}

const ProductComponent: FC<ProductComponentProps> = ({
  product,
  isExpanded,
  setIsExpanded,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundImage: "none",
        //@ts-ignore
        bgcolor: theme.palette.background.alt,
        borderRadius: ".55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={
            //@ts-ignore
            theme.palette.secondary[700]
          }
          gutterBottom
        >
          {product?.category}
        </Typography>
        <Typography variant="h5" component={"div"}>
          {product?.name}
        </Typography>
        <Typography
          sx={{ mb: "1.5rem" }}
          color={
            //@ts-ignore
            theme.palette.secondary[400]
          }
        >
          ${millify(product.price)}
        </Typography>
        <Rating value={product.rating} readOnly />
        <Typography variant="body2">{product.description}</Typography>
        <CardActions>
          <Button
            size="small"
            //@ts-ignore
            variant="primary"
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
          >
            See More
          </Button>
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout={"auto"}
          unmountOnExit
          sx={{
            //@ts-ignore
            color: theme.palette.neutral[300],
          }}
        >
          <CardContent>
            <Typography>
              Supply Left : {millify(product.supply as number)}
            </Typography>
            <Typography>
              Yearly Sales This Year :{" "}
              {millify(product.stat[0].yearlySalesTotal as number)}
            </Typography>
            <Typography>
              Yearly Unit Sold This Year :{" "}
              {millify(product.stat[0].yearlyTotalSoldUnits as number)}
            </Typography>
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default ProductComponent;
