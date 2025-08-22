export const ROUTES = {
  HOME: '/(tabs)/home',
  COURSES: '/courses/course',
  QR_SCANNER: '/(tabs)/qr-scanner',
  QUIZ: '/quiz/quiz-screen',
  QUIZ_RESULT: '/quiz/result',
  SETTINGS: '/(tabs)/settings',
  HELP: '/(tabs)/help',
  STATS: '/(tabs)/stats',
  SUBJECT_SELECTION: '/(auth)/subjectselection',
  AVATAR_CUSTOMIZATION: '/(auth)/avatarcustomization',
  NICKNAME: '/(auth)/nickname',
  SECURITY_QUESTIONS: '/(auth)/securityquestions',
  SUCCESS: '/(auth)/success',
  CAST_TO_TV: '/(auth)/casttotv',
  TEACHER_QR_GENERATOR: '/teacher/qr-generator',
  VIDEO_PLAYER: '/video-player',
  CAST_TO_TV_SCREEN: '/cast-to-tv',
} as const;

export const TAB_ROUTES = {
  HOME: 'home',
  HELP: 'help',
  QR_SCANNER: 'qr-scanner',
  STATS: 'stats',
  SETTINGS: 'settings',
} as const; 