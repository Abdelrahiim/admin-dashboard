/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetGeographyDataQuery } from "../store/services/api";
import { ResponsiveChoropleth } from "@nivo/geo";
import { Box, CircularProgress, useTheme } from "@mui/material";
import { PageHeader } from "../components";
import { geoData } from "../store/geoData";

const GeographyPage = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyDataQuery(undefined);
  if (!isLoading || data) {
    console.log(data);
  }

  return (
    <Box sx={{ m: "1.5rem 2.5rem" }}>
      <PageHeader title="Geography" subTitle="customer around the world" />
      {/** Component */}
      <Box
        mt={"40px"}
        height={"75vh"}
        border={`1px solid ${
          // @ts-ignore
          theme.palette.secondary[200]
        } `}
        borderRadius={"4px"}
      >
        {!isLoading && data ? (
          <ResponsiveChoropleth
            data={data}
            colors="nivo"
            theme={{
              axis: {
                domain: {
                  line: {
                    // @ts-ignore
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    // @ts-ignore
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    // @ts-ignore
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    // @ts-ignore
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  // @ts-ignore
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                //@ts-ignore
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      //@ts-ignore
                      itemTextColor: theme.palette.background.alt,
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

export default GeographyPage;
