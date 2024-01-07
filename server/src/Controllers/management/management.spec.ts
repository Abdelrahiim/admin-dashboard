import { Types } from "mongoose";
import { connectMongo, disconnectMongo } from "../../Config/database";
import { AffiliateStat } from "../../Models";
import { dataAffiliateStat } from "../../data";
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

  describe("Test Get user Performance", () => {
    it("it Should Return All User With Some it and all of it Transactions", async () => {
      const id = "63701cc1f03239f09e00018a";
      const userWithStats = await managementService.getUserPerformanceById(id);
      expect(userWithStats).toBeTruthy();
      expect(userWithStats.sales).toBeTruthy();
      expect(userWithStats.user).toBeTruthy();
      expect(userWithStats.sales.length).toBeGreaterThan(0);
    });
  });
});
