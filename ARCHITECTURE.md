# Project Architecture

This document outlines the professional code structure and organization patterns used in this React Native/Expo application.

## Directory Structure

```
kid app/
├── app/                    # Expo Router screens
│   ├── (auth)/            # Authentication flow screens
│   ├── (tabs)/            # Main tab navigation screens
│   ├── courses/           # Course-related screens
│   ├── quiz/              # Quiz-related screens
│   └── teacher/           # Teacher-specific screens
├── components/            # Reusable UI components
│   ├── ComponentName/     # Each component in its own directory
│   │   ├── ComponentName.tsx
│   │   └── index.ts       # Export file
├── constants/             # Application constants
│   ├── Colors.ts          # Color definitions
│   ├── navigation.ts      # Route constants
│   ├── subject.ts         # Subject data
│   ├── theme.ts           # Design tokens
│   ├── voicePresets.ts    # Voice configuration
│   └── index.ts           # Central export
├── data/                  # Static data and mock data
│   ├── learningData.ts    # Learning items data
│   ├── achievementData.ts # Achievement data
│   ├── sampleQuizResults.ts
│   ├── sampleAchievements.ts
│   └── index.ts           # Central export
├── types/                 # TypeScript type definitions
│   ├── Achievement.ts
│   ├── AchievementItem.ts
│   ├── LearningItem.ts
│   ├── QuizResult.ts
│   └── index.ts           # Central export
├── utils/                 # Utility functions
│   ├── scoreUtils.ts      # Score calculation utilities
│   └── index.ts           # Central export
├── hooks/                 # Custom React hooks
├── context/               # React Context providers
└── assets/                # Static assets
```

## Key Principles

### 1. Separation of Concerns
- **Data**: All static data is separated into dedicated files in the `data/` directory
- **Types**: TypeScript interfaces are defined in the `types/` directory
- **Constants**: Application constants are organized in the `constants/` directory
- **Components**: Reusable UI components are in the `components/` directory

### 2. Component Organization
Each component follows this structure:
```
ComponentName/
├── ComponentName.tsx      # Main component file
└── index.ts              # Export file for clean imports
```

### 3. Data Management
- **No hardcoded data in components**: All data is imported from dedicated data files
- **Type safety**: All data is properly typed with TypeScript interfaces
- **Centralized exports**: All data is exported through index files for clean imports

### 4. Constants and Configuration
- **Theme constants**: Colors, spacing, shadows, and border radius in `constants/theme.ts`
- **Navigation constants**: Route definitions in `constants/navigation.ts`
- **Centralized exports**: All constants exported through `constants/index.ts`

### 5. Utility Functions
- **Reusable logic**: Common calculations and operations in utility functions
- **Pure functions**: Utility functions are pure and testable
- **Type safety**: All utilities are properly typed

## Import Patterns

### Before (Unorganized)
```typescript
import { SUBJECTS } from '../../constants/subject';
import { VOICE_STYLES } from '../../constants/voicePresets';
const learningData = [/* hardcoded data */];
```

### After (Organized)
```typescript
import { SUBJECTS, VOICE_STYLES } from '@/constants';
import { learningData } from '@/data';
import { LearningItem } from '@/types';
```

## Benefits

1. **Maintainability**: Easy to find and update data, types, and constants
2. **Reusability**: Components and utilities can be easily reused across the app
3. **Type Safety**: Strong TypeScript typing throughout the application
4. **Scalability**: Structure supports growth and new features
5. **Consistency**: Standardized patterns across the codebase
6. **Testing**: Easier to test isolated components and utilities
7. **Performance**: Better tree-shaking and bundle optimization

## Best Practices

1. **Always use TypeScript interfaces** for data structures
2. **Import from index files** for cleaner imports
3. **Keep components focused** on a single responsibility
4. **Extract utility functions** for reusable logic
5. **Use constants** instead of magic numbers and strings
6. **Follow naming conventions** consistently
7. **Document complex logic** with comments 