const getPublicData = require("./dataService");
const rules = require("./../config/gameRules.json");

const check = async function (ticket) {
  try {
    const { drawDate, picks } = ticket;

    // get data from public URL
    let publicData = await getPublicData(drawDate);
    if (!publicData) {
      return {};
    }

    const normalizedWinningNumbers = await getNumbers(
      publicData.winning_numbers
    );

    const normalizedResult = {
      ...publicData,
      winning_numbers: normalizedWinningNumbers,
    };

    const prizes = await getPrizes(picks, normalizedResult);
    let totalPrize = await sumPrizes(prizes);
    const finalResult = {
      isError: false,
      prizes: prizes,
      totalPrize: totalPrize,
      error: false,
    };
    return finalResult;
  } catch (error) {
    return {
      isError: true,
      error,
    };
  }
};

async function getNumbers(numbers) {
  const splitted = numbers.split(" ");
  return splitted;
}

async function getPrizes(picks, resultOfTheDay) {
  let ret = [];
  let value = 0;

  for (let i = 0; i < picks.length; i++) {
    value = await calculate(picks[i], resultOfTheDay);
    ret.push({
      ...picks[i],
      pickPrize: {
        value,
      },
    });
  }
  return ret;
}

async function sumPrizes(prizes) {
  let total = 0;
  for (let i = 0; i < prizes.length; i++) {
    total = total + prizes[i].pickPrize.value;
  }
  return total;
}

async function calculate(pick, result) {
  const multiplier = result.hasOwnProperty("multiplier")
    ? parseInt(result.multiplier)
    : 1;

  const whiteBalls = await countWhiteBalls(pick, result.winning_numbers);
  const powerBall = pick[5] === result.winning_numbers[5];

  return await getPrize(whiteBalls, powerBall, multiplier);
}

async function countWhiteBalls(pick, winningNumbers) {
  for (let i = 0; i <= 4; i++) {}
  const arrays = [pick.slice(0, 5), winningNumbers.slice(0, 5)];
  const reduced = arrays.reduce(function (a, b) {
    return a.filter(function (value) {
      return b.includes(value);
    });
  });
  return reduced.length;
}

async function getPrize(whiteBalls, powerBall, multiplier) {
  const search = rules.find(
    (r) => r.whiteBalls === whiteBalls && r.powerBall === powerBall
  );

  if (!search) {
    return 0;
  }

  return search.hasOwnProperty("multiplier")
    ? search.prize * multiplier
    : search.prize;
}

module.exports = check;
