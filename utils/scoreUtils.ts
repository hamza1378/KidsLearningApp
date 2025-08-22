export const getScoreColor = (percentage: number): string => {
  if (percentage >= 80) return '#22c55e';
  if (percentage >= 60) return '#fbbf24';
  return '#ef4444';
};

export const getScoreEmoji = (percentage: number): string => {
  if (percentage >= 90) return '🏆';
  if (percentage >= 80) return '⭐';
  if (percentage >= 70) return '🎯';
  if (percentage >= 60) return '👍';
  return '📚';
};

export const calculatePercentage = (score: number, total: number): number => {
  return Math.round((score / total) * 100);
};

export const calculateAverageScore = (scores: number[], totals: number[]): number => {
  if (scores.length === 0) return 0;
  const totalPercentage = scores.reduce((sum, score, index) => {
    return sum + calculatePercentage(score, totals[index]);
  }, 0);
  return Math.round(totalPercentage / scores.length);
}; 