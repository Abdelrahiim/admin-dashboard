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
   * @route /user/:id
   * @method GET
   */
  describe(`Test ${green("GET")} /user/id`, () => {
    test("It Should Return Response 200 And Content-Type = Application/json ", async () => {
      const res = await Client.get("/general/user/63701cc1f03239c72c000185")
        .expect(StatusCodes.OK)
        .expect("Content-type", /json/);
      expect(res.body.email).toBe("wsiddon6@state.tx.us");
    });
    test("It Should Return Response 404 And Content-Type = Application/json ", async () => {
      return await Client.get("/general/user/63701c21f03239c72c000185")
        .expect(StatusCodes.NOT_FOUND)
        .expect("Content-type", /json/);
      // expect(res.body.email).toBe("wsiddon6@state.tx.us");
    });
  });
});
