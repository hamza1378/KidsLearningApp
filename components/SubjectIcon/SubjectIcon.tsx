import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';

interface SubjectIconProps {
  subject: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export default function SubjectIcon({ 
  subject, 
  size = 48, 
  color = '#3b82f6',
  backgroundColor = '#dbeafe'
}: SubjectIconProps) {
  const getSubjectIcon = (subjectName: string) => {
    const lowerSubject = subjectName.toLowerCase();
    
    if (lowerSubject.includes('math') || lowerSubject.includes('algebra') || lowerSubject.includes('geometry')) {
      return 'calculator';
    }
    if (lowerSubject.includes('science') || lowerSubject.includes('physics') || lowerSubject.includes('chemistry')) {
      return 'flask';
    }
    if (lowerSubject.includes('english') || lowerSubject.includes('language') || lowerSubject.includes('grammar')) {
      return 'book';
    }
    if (lowerSubject.includes('history') || lowerSubject.includes('social')) {
      return 'library';
    }
    if (lowerSubject.includes('geography')) {
      return 'earth';
    }
    if (lowerSubject.includes('art') || lowerSubject.includes('drawing')) {
      return 'color-palette';
    }
    if (lowerSubject.includes('music')) {
      return 'musical-notes';
    }
    if (lowerSubject.includes('computer') || lowerSubject.includes('coding') || lowerSubject.includes('programming')) {
      return 'laptop';
    }
    if (lowerSubject.includes('biology')) {
      return 'leaf';
    }
    if (lowerSubject.includes('economics') || lowerSubject.includes('business')) {
      return 'trending-up';
    }
    
    // Default icon
    return 'school';
  };

  return (
    <View style={[
      tw`rounded-2xl items-center justify-center`,
      {
        width: size,
        height: size,
        backgroundColor: backgroundColor,
      }
    ]}>
      <Ionicons 
        name={getSubjectIcon(subject) as any} 
        size={size * 0.5} 
        color={color} 
      />
    </View>
  );
}
