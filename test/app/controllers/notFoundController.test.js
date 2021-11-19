const request = require("supertest");
const app = require("../../../app/app");

test("Not found route", async () => {
  const res = await request(app).get("/someroute").send({});
  expect(res.statusCode).toEqual(404);
});
