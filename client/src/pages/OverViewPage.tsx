import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { PageHeader } from "../components";
import { useState } from "react";
import { OverviewChart } from "../components/Charts";

const OverViewPage = () => {
  const [view, setView] = useState("units");
  return (
    <Box m="1.5rem 2.5rem">
      <PageHeader
        title="overView"
        subTitle="Overview of general revenue and profit"
      />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default OverViewPage;
