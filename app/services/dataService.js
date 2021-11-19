const axios = require("axios").default;
const Redis = require("ioredis");

async function getPublicData(drawDate) {
  this.redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    keyPrefix: "cache:",
  });

  let redisData = await this.redis.get(drawDate);

  if (!redisData) {
    result = await axios.get(process.env.RESULTS_URL);
    publicData = result.data;
    await this.redis.setex(
      drawDate,
      60 * 60 * 24 * process.env.REDIS_PERSISTENCE_PERIOD_IN_DAYS,
      JSON.stringify(publicData)
    );
  } else {
    publicData = JSON.parse(redisData);
  }

  // filtering data based on the draw date
  const filtered = publicData.filter(
    (r) => Date.parse(r.draw_date) === Date.parse(drawDate)
  );

  return filtered && filtered.length > 0 ? filtered[0] : null;
}

module.exports = getPublicData;
