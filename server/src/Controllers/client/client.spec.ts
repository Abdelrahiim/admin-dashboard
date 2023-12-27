import { connectMongo, disconnectMongo } from "../../Config/database";
import { clientService } from "./client.service";

describe("Testing Client Service", () => {
  beforeAll(async () => {
    await connectMongo();
  });
  afterAll(async () => {
    await disconnectMongo();
  });

  describe("Retrieve All Customers", () => {
    it("It Should Return all User that is not admin or superadmin", async () => {
      const customers = await clientService.getNonAdminUsers();
      expect(customers).toBeTruthy();
      for (const customer of customers) {
        expect(customer.role).toBe("user");
      }
    });
  });
});
