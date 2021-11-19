function healthCheckHanlder(req, res) {
  return res.status(200).send("I'm alive!");
}

module.exports = {
  healthCheckHanlder,
};
