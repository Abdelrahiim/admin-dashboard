import { connectMongo, disconnectMongo } from "../../Config/database";
import { generalService } from "./general.service";

describe("Testing General Service", () => {
  beforeAll(async () => {
    await connectMongo();
  });
  afterAll(async () => {
    await disconnectMongo();
  });

  describe("Test Find User Method in General Service", () => {
    it("It Should Return Correct User", async () => {
      const user = await generalService.findUser("63701cc1f03239c72c000185");
      expect(user).toBeTruthy();
      expect(user.email).toBe("wsiddon6@state.tx.us");
    });
  });
});
