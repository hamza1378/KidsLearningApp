import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { LearningItem } from '@/types/LearningItem';

const { width } = Dimensions.get('window');

interface LearningCardProps {
  item: LearningItem;
  index: number;
  isActive: boolean;
}

const LearningCard: React.FC<LearningCardProps> = ({ item, index, isActive }) => {
  return (
    <Link href="/courses/course" style={{ marginHorizontal: 8 }}>
      <View
        style={{
          width: width * 0.7,
          marginVertical: 16,
          backgroundColor: "#fffbe7",
          borderRadius: 32,
          borderWidth: 3,
          borderColor: isActive ? "#FFD700" : "#a7f3d0",
          shadowColor: "#FFD700",
          shadowOpacity: 0.15,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
          alignItems: "center",
          paddingBottom: 16,
          overflow: 'hidden',
        }}
      >
        {/* Fun background shape */}
        <View style={{
          position: "absolute",
          top: -20,
          left: -20,
          width: 60,
          height: 60,
          backgroundColor: "#bae6fd",
          borderRadius: 30,
          opacity: 0.3,
          zIndex: 0,
        }} />
        
        {/* Image in a circle */}
        <View style={{
          width: 90,
          height: 90,
          borderRadius: 45,
          borderWidth: 4,
          borderColor: "#fbbf24",
          backgroundColor: "#fff",
          marginTop: 20,
          marginBottom: 8,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 1,
        }}>
          <Image 
            source={{ uri: item.image }} 
            style={{ width: 80, height: 80, borderRadius: 40 }} 
            resizeMode="cover" 
          />
        </View>
        
        {/* Animated New badge */}
        {item.isNew && (
          <View style={{
            position: "absolute",
            top: 12,
            right: 18,
            backgroundColor: "#fbbf24",
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 2,
            zIndex: 2,
          }}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>New!</Text>
          </View>
        )}
        
        {/* Title and Level */}
        <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#f59e42",
          marginTop: 8,
          marginBottom: 2,
          textAlign: "center",
          fontFamily: "System",
        }} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>
        
        <Text style={{
          fontSize: 14,
          color: "#38bdf8",
          fontWeight: "600",
          marginBottom: 8,
          textAlign: "center",
        }}>
          {item.level}
        </Text>
        
        {/* Progress bar */}
        <View style={{
          width: "80%",
          height: 8,
          backgroundColor: "#e0e7ff",
          borderRadius: 4,
          overflow: "hidden",
          marginBottom: 4,
        }}>
          <View
            style={{
              width: `${item.progress || 0}%`,
              height: "100%",
              borderRadius: 4,
              backgroundColor: '#38bdf8',
            }}
          />
        </View>
        
        {/* Fun sticker */}
        <Text style={{
          position: "absolute",
          left: 12,
          bottom: 12,
          fontSize: 18,
        }}>⭐</Text>
      </View>
    </Link>
  );
};

export default LearningCard; 