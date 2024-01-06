/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useMemo } from "react";
import { useGetSalesQuery } from "../../store/services/api";
import { ResponsiveLine } from "@nivo/line";
import { Box, CircularProgress, useTheme } from "@mui/material";

interface OverviewChartProps {
  isDashboard?: boolean;
  view: string;
}

interface FormattedDataShape {
  id: string;
  data: Array<{
    x: number | string | Date;
    y: number | string | Date;
  }>;
  color?: string;
}

const OverviewChart: FC<OverviewChartProps> = ({
  isDashboard = false,
  view,
}) => {
  const { data, isLoading } = useGetSalesQuery(undefined);
  const theme = useTheme();

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [];
    const { monthlyData } = data;
    const totalSalesLine: FormattedDataShape = {
      id: "totalSales",
      color:
        //   // @ts-ignore
        theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine: FormattedDataShape = {
      id: "totalUnits",
      // @ts-ignore
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: curSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: curUnits },
        ];

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (!data || isLoading) {
    return (
      <Box>
        {/** Loading Componant We Will Make a skeleton*/}
        <CircularProgress />
      </Box>
    );
  }
  const reformattedData =
    view == "sales"
      ? (totalSalesLine as FormattedDataShape[])
      : (totalUnitsLine as FormattedDataShape[]);
  return (
    // @ts-ignore
    <ResponsiveLine
      data={reformattedData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke:
                // @ts-ignore
                theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill:
                // @ts-ignore
                theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke:
                // @ts-ignore
                theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill:
                // @ts-ignore
                theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill:
              // @ts-ignore
              theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
