import { Box } from "@mui/material";
import { BreakdownChart, PageHeader } from "../components";

const BreakdownPage = () => {
  return (
    <Box sx={{ m: "1.5rem 2.5rem" }}>
      <PageHeader title="Sales Breakdown" subTitle="not cool" />
      {/** Super important is to put Chart Component in this Box to Render Correctly
       * Other Wise it won't
       */}
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default BreakdownPage;
