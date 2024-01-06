/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Box, CircularProgress, useTheme } from "@mui/material";
import { PageHeader } from "../components";
import { useState, useMemo } from "react";
import { useGetSalesQuery } from "../store/services/api";
import { ResponsiveLine } from "@nivo/line";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

interface FormattedDataShape {
  id: string;
  data: Array<{
    x: number | string;
    y: number | string;
  }>;
  color?: string;
}

const DailyPage = () => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState<Date | Dayjs>(
    new Date("2021-02-01")
  );
  const [endDate, setEndDate] = useState<Date | Dayjs>(new Date("2021-03-01"));

  const { data } = useGetSalesQuery(undefined);

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { dailyData } = data;
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

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);
        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: splitDate, y: totalSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: splitDate, y: totalUnits },
        ];
      }
    });

    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, startDate, endDate]);

  return (
    <Box>
      <PageHeader title="Daily Sales" subTitle="Chart of daily Sales" />
      <Box height="75vh">
        {/* 
          <Box>
            {/* <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date as Date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            /> */}
        {/* </Box> */}
        {/* <Box> */}
        {/* <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date as Date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            /> }
          </Box>
        </Box> */}
        {/** Using Material Ui Date Picker */}
        <Box display="flex" justifyContent="flex-end">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="Start Date"
                value={dayjs(startDate)}
                onChange={(newValue) => setStartDate(newValue as Dayjs)}
              />
              <DatePicker
                label="End Date"
                value={dayjs(endDate)}
                onChange={(newValue) => setEndDate(newValue as Dayjs)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>

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

export default DailyPage;
