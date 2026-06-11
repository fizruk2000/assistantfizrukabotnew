// Утилиты для расчета очков
export function calculatePointsForEvent(result, resultsArray, isPositiveDirection = true) {
  if (!result || result <= 0 || !resultsArray || resultsArray.length === 0) {
    return 0;
  }

  if (isPositiveDirection) {
    // Для дисциплин где больше = лучше (прыжки, метания)
    const foundResult = resultsArray.find(r => r.result <= result);
    return foundResult ? foundResult.points : 0;
  } else {
    // Для дисциплин где меньше = лучше (бег)
    const foundResult = resultsArray.find(r => r.result >= result);
    return foundResult ? foundResult.points : 0;
  }
}

export function parseTimeToSeconds(timeStr) {
  if (!timeStr) return null;
  
  // Формат MM:SS,ms (ms — десятые доли секунды)
  const timeRegex = /^(\d{1,2}):(\d{2}),(\d)$/;
  const match = timeStr.match(timeRegex);
  
  if (!match) return null;
  
  const minutes = parseInt(match[1], 10);
  const seconds = parseInt(match[2], 10);
  const tenths = parseInt(match[3], 10);
  
  if (seconds >= 60) return null;
  
  return minutes * 60 + seconds + tenths / 10;
}

export function validateNumericInput(value) {
  return value !== null && value !== undefined && value !== '' && !isNaN(value) && value > 0;
}