// Utility function to calculate RSI
export const calculateRSI = (data, period = 14) => {
  let gains = 0;
  let losses = 0;
  const rsiData = [];

  for (let i = 1; i < data.length; i++) {
    const change = data[i].c - data[i - 1].c;
    if (change > 0) gains += change;
    if (change < 0) losses -= change;

    if (i >= period) {
      if (i > period) {
        const prevChange = data[i - period].c - data[i - period - 1].c;
        if (prevChange > 0) gains -= prevChange;
        if (prevChange < 0) losses += -prevChange;
      }

      const avgGain = gains / period;
      const avgLoss = losses / period;
      const rs = avgGain / avgLoss;
      const rsi = 100 - 100 / (1 + rs);

      rsiData.push({ TimeStamp: data[i].TimeStamp, rsi });
    }
  }

  return rsiData;
};

// Utility function to calculate Bollinger Bands
export const calculateBollingerBands = (data, period = 20) => {
  const bollingerBandsData = [];

  for (let i = period - 1; i < data.length; i++) {
    const subset = data.slice(i - period + 1, i + 1);
    const avg = subset.reduce((acc, point) => acc + point.c, 0) / period;
    const variance =
      subset.reduce((acc, point) => acc + Math.pow(point.c - avg, 2), 0) /
      period;
    const stdDev = Math.sqrt(variance);

    bollingerBandsData.push({
      TimeStamp: data[i].TimeStamp,
      middleBand: avg,
      upperBand: avg + 2 * stdDev,
      lowerBand: avg - 2 * stdDev,
    });
  }

  return bollingerBandsData;
};
