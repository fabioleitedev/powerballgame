const request = require("supertest");
const app = require("../../../app/app");
require("dotenv").config();

test("scenario 1: only 1 power ball", async () => {
  const res = await request(app)
    .post("/api/v1/tickets")
    .send({
      drawDate: "2021-11-17",
      picks: [["02", "56", "29", "21", "13", "01"]],
    });

  expect(res.statusCode).toEqual(200);
  expect(res.body.totalPrize).toEqual(4);
});

test("scenario 2: 1 white ball and 1 power ball", async () => {
  const res = await request(app)
    .post("/api/v1/tickets")
    .send({
      drawDate: "2021-11-17",
      picks: [["03", "56", "29", "21", "13", "01"]],
    });

  expect(res.statusCode).toEqual(200);
  expect(res.body.totalPrize).toEqual(4);
});

test("scenario 3: 2 white balls and 1 power ball", async () => {
  const res = await request(app)
    .post("/api/v1/tickets")
    .send({
      drawDate: "2021-11-17",
      picks: [["03", "16", "29", "21", "13", "01"]],
    });

  expect(res.statusCode).toEqual(200);
  expect(res.body.totalPrize).toEqual(7);
});

test("scenario 4: 3 white balls", async () => {
  const res = await request(app)
    .post("/api/v1/tickets")
    .send({
      drawDate: "2021-11-17",
      picks: [["03", "16", "48", "21", "13", "09"]],
    });

  expect(res.statusCode).toEqual(200);
  expect(res.body.totalPrize).toEqual(7);
});

test("scenario 5: 3 white balls and 1 power ball", async () => {
  const res = await request(app)
    .post("/api/v1/tickets")
    .send({
      drawDate: "2021-11-17",
      picks: [["03", "16", "48", "21", "13", "01"]],
    });

  expect(res.statusCode).toEqual(200);
  expect(res.body.totalPrize).toEqual(100);
});

test("scenario 6: 4 white balls", async () => {
  const res = await request(app)
    .post("/api/v1/tickets")
    .send({
      drawDate: "2021-11-17",
      picks: [["03", "16", "48", "52", "13", "09"]],
    });

  expect(res.statusCode).toEqual(200);
  expect(res.body.totalPrize).toEqual(100);
});

test("scenario 7: 4 white balls and 1 power ball", async () => {
  const res = await request(app)
    .post("/api/v1/tickets")
    .send({
      drawDate: "2021-11-17",
      picks: [["03", "16", "48", "52", "13", "01"]],
    });

  expect(res.statusCode).toEqual(200);
  expect(res.body.totalPrize).toEqual(50000);
});

test("scenario 8: 5 white balls", async () => {
  const res = await request(app)
    .post("/api/v1/tickets")
    .send({
      drawDate: "2021-11-17",
      picks: [["03", "16", "48", "52", "60", "09"]],
    });

  expect(res.statusCode).toEqual(200);
  expect(res.body.totalPrize).toEqual(1000000);
});

test("scenario 9: 5 white balls and 1 power ball", async () => {
  const res = await request(app)
    .post("/api/v1/tickets")
    .send({
      drawDate: "2021-11-17",
      picks: [["03", "16", "48", "52", "60", "01"]],
    });

  expect(res.statusCode).toEqual(200);
  expect(res.body.totalPrize).toEqual(3000000);
});
