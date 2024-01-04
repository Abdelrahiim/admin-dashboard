import { connectMongo, disconnectMongo } from "../../Config/database";
import { OverallStat } from "../../Models";
import { dataOverallStat } from "../../data";
import { salesService } from "./sales.service";

describe("Testing Sales Service", () => {
  beforeAll(async () => {
    await connectMongo();
  });
  afterAll(async () => {
    await disconnectMongo();
  });
  describe("Test List OverAllTransaction", () => {
    it("it Should Return OverAllStat as an Object", async () => {
      const res = await salesService.getOverAllStat();
      expect(res).toBeTruthy();
      expect(res?.year).toBe(2021);
    });
  });
});
