import supertest from "supertest";
import { connectMongo, disconnectMongo } from "../src/Config/database";
import { green } from "colorette";
import { StatusCodes } from "http-status-codes";
import { app } from "../src/app";

describe("Test E2E", () => {
  const Client = supertest(app);
  // Connect To The Database Before All Tests
  beforeAll(async () => {
    await connectMongo();
  });
  // Disconnect From The Database After All Tests Done
  afterAll(async () => {
    await disconnectMongo();
  });

  /**
   * Test GET User EndPoint
   * @route /general/user/:id
   * @method GET
   */
  describe(`Test ${green("GET")} general/user/id`, () => {
    it("It Should Return Response 200 And Content-Type = Application/json ", async () => {
      const res = await Client.get("/general/user/63701cc1f03239c72c000185")
        .expect(StatusCodes.OK)
        .expect("Content-type", /json/);
      expect(res.body.email).toBe("wsiddon6@state.tx.us");
    });
    it("It Should Return Response 404 And Content-Type = Application/json ", async () => {
      return await Client.get("/general/user/63701c21f03239c72c000185")
        .expect(StatusCodes.NOT_FOUND)
        .expect("Content-type", /json/);
    });
  });

  /**
   * Test Get All Products with It status is
   * @router /client/product
   * @method GET
   */
  describe.skip(`Test ${green("GET")} client/products`, () => {
    it("It Should Return response 200 OK And Content-Type = Application/json", async () => {
      await Client.get("/client/products")
        .expect(StatusCodes.OK)
        .expect("Content-type", /json/);
    });
  });
  /**
   * Test Get All customers Users with role === "user"
   * @router /client/customers
   * @method GET
   */
  describe(`Test ${green("GET")} client/customers`, () => {
    it("It Should Return response 200 OK And Content-Type = Application/json", async () => {
      await Client.get("/client/customers")
        .expect(StatusCodes.OK)
        .expect("Content-type", /json/);
    });
  });
  /**
   * Test Get All transactions
   * @route /client/transactions
   * @method GET
   */
  describe(`Test ${green("GET")} /client/transactions`, () => {
    it("It Should Return response 200 OK And Content-Type = Application/json", async () => {
      const res = await Client.get("/client/transactions?page=1")
        .expect(StatusCodes.OK)
        .expect("Content-type", /json/);
      expect(res.body.total).toBe(500);
      expect(res.body.transactions.length).toBe(20);
    });
    it("It Should Return response 200 OK And Content-Type = Application/json And Pagesize = 5", async () => {
      const res = await Client.get("/client/transactions?page=1&pageSize=5")
        .expect(StatusCodes.OK)
        .expect("Content-type", /json/);
      expect(res.body.total).toBe(500);
      expect(res.body.transactions.length).toBe(5);
    });
  });
  /**
   * Test Get GeoData
   * @route /client/transaction
   * @method GET
   */
  describe(`Test ${green("GET")} /client/geography`, () => {
    it("It Should Return response 200 OK And Content-Type = Application/json", async () => {
      await Client.get("/client/geography")
        .expect(StatusCodes.OK)
        .expect("Content-type", /json/);
    });
  });

  /**
   * Test Get overAll Sales Stats
   * @route /sales
   * @method GET
   */
  describe(`Test ${green("GET")} /sales`, () => {
    it("It Should Return response 200 OK And Content-Type = Application/json", async () => {
      await Client.get("/sales")
        .expect(StatusCodes.OK)
        .expect("Content-type", /json/);
    });
  });
});
