/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Typography, useTheme } from "@mui/material";
import { FlexBetween } from ".";
import { FC, ReactNode } from "react";

interface StatBoxProps {
  title: string;
  value: number;
  increase: string;
  icon: ReactNode;
  description: string;
}

const StatBox: FC<StatBoxProps> = ({
  title,
  value,
  increase,
  icon,
  description,
}) => {
  const theme = useTheme();
  return (
    <Box
      component={"div"}
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      bgcolor={
        // @ts-ignore
        theme.palette.background.alt
      }
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography
          variant="h6"
          sx={{
            color:
              // @ts-ignore
              theme.palette.secondary[100],
          }}
        >
          {title}
        </Typography>
        {icon}
      </FlexBetween>
      <Typography
        variant="h3"
        fontWeight={"600"}
        sx={{
          color:
            // @ts-ignore
            theme.palette.secondary[200],
        }}
      >
        {value}
      </Typography>
      <FlexBetween gap={"1rem"}>
        <Typography
          variant="h5"
          fontStyle={"italic"}
          fontWeight={"600"}
          sx={{
            color: theme.palette.secondary.light,
          }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
