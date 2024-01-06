import { connectMongo, disconnectMongo } from "../../Config/database";
import { managementService } from "./management.service";

describe("Testing Management Service", () => {
  beforeAll(async () => {
    await connectMongo();
  });
  afterAll(async () => {
    await disconnectMongo();
  });
  describe("Retrieve All Admin Users", () => {
    it("It Should Return all User that are admin or superadmin", async () => {
      const admins = await managementService.getAdminUsers();
      expect(admins).toBeTruthy();
      for (const admin of admins) {
        expect(admin.role).toBe("admin" || "superadmin");
      }
    });
  });
});
