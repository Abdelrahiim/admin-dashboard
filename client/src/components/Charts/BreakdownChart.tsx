/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC } from "react";
import { useGetSalesQuery } from "../../store/services/api";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";

interface BreakdownChartProps {
  isDashBoard?: boolean;
}

const BreakdownChart: FC<BreakdownChartProps> = ({ isDashBoard = false }) => {
  const { data, isLoading } = useGetSalesQuery(undefined);
  const theme = useTheme();

  if (!data || isLoading)
    return (
      <Box>
        {/** Loading Componant We Will Make a skeleton*/}
        <CircularProgress />
      </Box>
    );

  const colors = [
    // @ts-ignore
    theme.palette.secondary[500],
    // @ts-ignore
    theme.palette.secondary[300],
    // @ts-ignore
    theme.palette.secondary[300],
    // @ts-ignore
    theme.palette.secondary[500],
  ];

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales]) => {
      return {
        id: category,
        label: category,
        value: sales,
      };
    }
  );

  console.log({ formattedData });
  return (
    <Box
      height={isDashBoard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashBoard ? "325" : undefined}
      minWidth={isDashBoard ? "325" : undefined}
      position={"relative"}
    >
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke:
                  //@ts-ignore
                  theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill:
                  //@ts-ignore
                  theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke:
                  //@ts-ignore
                  theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill:
                  //@ts-ignore
                  theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill:
                //@ts-ignore
                theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary.main,
            },
          },
        }}
        // colors={{ datum: "data.color" }}
        colors={colors}
        margin={
          isDashBoard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashBoard}
        arcLinkLabelsTextColor={
          //@ts-ignore
          theme.palette.secondary[200]
        }
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashBoard ? 20 : 0,
            translateY: isDashBoard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor:
                    //@ts-ignore
                    theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />

      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={
          //@ts-ignore
          theme.palette.secondary[400]
        }
        textAlign="center"
        // pointerEvents="none"
        sx={{
          transform: isDashBoard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          {!isDashBoard && "Total:"} ${data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;
