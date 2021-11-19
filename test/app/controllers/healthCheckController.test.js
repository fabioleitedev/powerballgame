const request = require("supertest");
const app = require("../../../app/app");

test("Health check route", async () => {
  const res = await request(app).get("/").send({});
  expect(res.statusCode).toEqual(200);
  expect(res.text).toEqual("I'm alive!");
});
