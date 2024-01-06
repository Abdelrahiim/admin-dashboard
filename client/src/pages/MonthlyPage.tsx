/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useTheme, Box, CircularProgress } from "@mui/material";

import { useMemo } from "react";
import { PageHeader } from "../components";
import { useGetSalesQuery } from "../store/services/api";
import { FormattedDataShape } from "../types";
import { ResponsiveLine } from "@nivo/line";

const MonthlyPage = () => {
  const theme = useTheme();

  const { data } = useGetSalesQuery(undefined);
  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
    const totalSalesLine: FormattedDataShape = {
      id: "totalSales",
      // @ts-ignore
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine: FormattedDataShape = {
      id: "totalUnits",
      // @ts-ignore
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data = [
        ...totalSalesLine.data,
        { x: month, y: totalSales },
      ];
      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        { x: month, y: totalUnits },
      ];
    });

    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Box>
      <PageHeader title="Monthly Sales" subTitle="Chart of Monthly Sales" />
      <Box height="75vh">
        {data ? (
          // @ts-ignore
          <ResponsiveLine
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
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
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
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
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
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
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
            ]}
          />
        ) : (
          <Box>
            {/** Loading Componant We Will Make a skeleton*/}
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MonthlyPage;
