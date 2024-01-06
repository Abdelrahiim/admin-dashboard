import { Box } from "@mui/material";
import { PageHeader } from "../components";
import { BreakdownChart } from "../components/Charts";

const BreakdownPage = () => {
  return (
    <Box sx={{ m: "1.5rem 2.5rem" }}>
      <PageHeader title="Sales Breakdown" subTitle="not cool" />
      {/** Super important is to put Chart Component in this Box to Render Correctly
       * Other Wise it won't
       *
       */}
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default BreakdownPage;
