// 404 Handler
function notFound(req, res) {
  return res.status(404).send();
}

module.exports = {
  notFound,
};
