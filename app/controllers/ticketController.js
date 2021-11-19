const schema = require("../schemas/payloadValidation");
const check = require("../services/ticketService");

async function ticketHandler(req, res) {
  const ticket = req.body;

  try {
    // basic validations to garantee the payload concistence
    await schema.validateAsync(ticket);
    const result = await check(ticket);

    if (result.isError) {
      res.status(400).send(result.error);
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send();
  }
}

module.exports = {
  ticketHandler,
};
