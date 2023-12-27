/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from "react";
import { Typography, Box, useTheme } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subTitle: string;
}

const PageHeader: FC<PageHeaderProps> = ({ title, subTitle }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={
          //@ts-ignore
          theme.palette.secondary["100"]
        }
        fontWeight={"bold"}
        sx={{ mb: "5px" }}
      >
        {title.toUpperCase()}
      </Typography>
      <Typography
        variant="h5"
        color={
          //@ts-ignore
          theme.palette.secondary["300"]
        }
      >
        {subTitle}
      </Typography>
    </Box>
  );
};

export default PageHeader;
