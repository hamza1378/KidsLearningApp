import React from 'react';
import { View, Text, Image } from 'react-native';
import { AchievementItem } from '@/types/AchievementItem';

interface AchievementCardProps {
  item: AchievementItem;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ item }) => {
  return (
    <View style={{ width: '48%', marginBottom: 16 }}>
      <View style={{
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f3f4f6',
      }}>
        <View style={{ position: 'relative', marginBottom: 12 }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 80, height: 80, borderRadius: 12 }}
          />
          {/* Achievement badge */}
          <View style={{
            position: 'absolute',
            top: -4,
            right: -4,
            backgroundColor: '#fbbf24',
            width: 24,
            height: 24,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#92400e' }}>★</Text>
          </View>
        </View>
        <Text style={{
          color: '#101519',
          fontSize: 14,
          fontWeight: '600',
          textAlign: 'center',
        }}>
          {item.title}
        </Text>
        <Text style={{
          color: '#5a748c',
          fontSize: 12,
          textAlign: 'center',
          marginTop: 4,
        }}>
          {item.unlocked ? 'Completed' : 'In Progress'}
        </Text>
      </View>
    </View>
  );
};

export default AchievementCard; 