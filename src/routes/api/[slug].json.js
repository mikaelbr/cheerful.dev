const { getUser } = require("./_api");
const { getAndShowResult } = require("./_utils");

export async function get(req, res, next) {
  const { slug } = req.params;
  return getAndShowResult(getUser(slug), res);
}
