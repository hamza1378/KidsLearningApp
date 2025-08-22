export interface PerformanceColors {
  progressColor: string;
  trailColor: string;
  textColor: string;
}

export interface PerformanceThresholds {
  excellent: number; // 90-100%
  good: number;      // 70-89%
  average: number;   // 50-69%
  poor: number;      // 30-49%
  veryPoor: number;  // 0-29%
}

export const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  excellent: 90,
  good: 70,
  average: 50,
  poor: 30,
  veryPoor: 0,
};

export const PERFORMANCE_COLORS = {
  excellent: {
    progressColor: '#3880cc', // Purple (changed from emerald)
    trailColor: '#c6dbf0',    // Light purple
    textColor: '#3880cc',
  },
  good: {
    progressColor: '#06b6d4', // Cyan (changed from blue)
    trailColor: '#cffafe',    // Light cyan
    textColor: '#06b6d4',
  },
  average: {
    progressColor: '#22c55e', // Green (changed from amber)
    trailColor: '#dcfce7',    // Light green
    textColor: '#22c55e',
  },
  poor: {
    progressColor: '#f97316', // Orange (kept same)
    trailColor: '#fed7aa',    // Light orange
    textColor: '#f97316',
  },
  veryPoor: {
    progressColor: '#dc2626', // Dark red (changed from light red)
    trailColor: '#fecaca',    // Light red
    textColor: '#dc2626',
  },
};

export function getPerformanceColors(
  percentage: number,
  thresholds: PerformanceThresholds = DEFAULT_THRESHOLDS
): PerformanceColors {
  if (percentage >= thresholds.excellent) {
    return PERFORMANCE_COLORS.excellent;
  } else if (percentage >= thresholds.good) {
    return PERFORMANCE_COLORS.good;
  } else if (percentage >= thresholds.average) {
    return PERFORMANCE_COLORS.average;
  } else if (percentage >= thresholds.poor) {
    return PERFORMANCE_COLORS.poor;
  } else {
    return PERFORMANCE_COLORS.veryPoor;
  }
}

// Specific color schemes for different metrics
export function getAverageScoreColors(percentage: number): PerformanceColors {
  return getPerformanceColors(percentage);
}

export function getCompletionColors(completed: number, total: number): PerformanceColors {
  const percentage = (completed / total) * 100;
  
  // Different thresholds for completion
  const completionThresholds: PerformanceThresholds = {
    excellent: 90,  // 90%+ completed
    good: 70,       // 70-89% completed
    average: 50,    // 50-69% completed
    poor: 30,       // 30-49% completed
    veryPoor: 0,    // 0-29% completed
  };
  
  return getPerformanceColors(percentage, completionThresholds);
}

export function getSuccessRateColors(passed: number, total: number): PerformanceColors {
  const percentage = total > 0 ? (passed / total) * 100 : 0;
  
  // Different thresholds for success rate
  const successThresholds: PerformanceThresholds = {
    excellent: 95,  // 95%+ success rate
    good: 80,       // 80-94% success rate
    average: 60,    // 60-79% success rate
    poor: 40,       // 40-59% success rate
    veryPoor: 0,    // 0-39% success rate
  };
  
  return getPerformanceColors(percentage, successThresholds);
}

// Helper function to get emoji based on performance
export function getPerformanceEmoji(percentage: number): string {
  if (percentage >= 90) return '🏆';
  if (percentage >= 70) return '👍';
  if (percentage >= 50) return '😊';
  if (percentage >= 30) return '😐';
  return '😔';
}
