import React from 'react';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from '@/lib/tailwind';
import PendingItemCard from '@/components/PendingItemCard';
import * as Animatable from 'react-native-animatable';

interface HistorySectionListProps {
  sections: any[];
  tab?: string;
  onLoadMore: () => void;
  isLoadingMore: boolean;
  listRef: React.RefObject<SectionList>;
}

export default function HistorySectionList({ 
  sections, 
  tab, 
  onLoadMore, 
  isLoadingMore, 
  listRef 
}: HistorySectionListProps) {
  const renderEmptyState = (section: any) => (
    <Animatable.View animation="fadeIn" duration={600} style={tw`${section.bgColor} rounded-2xl p-8 border ${section.borderColor} items-center`}>
      <View style={tw`w-16 h-16 ${section.bgColor} rounded-full items-center justify-center mb-4 border-2 ${section.borderColor}`}>
        <Ionicons name={section.icon as any} size={32} color={section.color} />
      </View>
      <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>No {section.title.toLowerCase()} yet</Text>
      <Text style={tw`text-sm text-gray-600 text-center`}>
        {section.id.includes('completed') 
          ? "Complete some activities to see them here! 🎯" 
          : "Great job! You're all caught up! 🎉"
        }
      </Text>
    </Animatable.View>
  );

  const renderSectionHeader = ({ section }: { section: any }) => (
    <Animatable.View animation="fadeInUp" duration={600}>
      <View style={tw`${section.bgColor} rounded-2xl p-4 border ${section.borderColor} shadow-sm`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center flex-1`}>
            <View style={tw`w-10 h-10 bg-white rounded-full items-center justify-center mr-3 shadow-sm`}>
              <Ionicons name={section.icon as any} size={20} color={section.color} />
            </View>
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-bold text-gray-800`}>{section.title}</Text>
              <Text style={tw`text-sm text-gray-600`}>
                {section.count} {section.count === 1 ? 'item' : 'items'}
              </Text>
            </View>
          </View>
          <View style={tw`bg-white rounded-full px-3 py-1 shadow-sm`}>
            <Text style={[tw`text-sm font-bold`, { color: section.color }]}>
              {section.count}
            </Text>
          </View>
        </View>
      </View>
    </Animatable.View>
  );

  const renderItem = ({ item }: { item: any }) => {
    // Check if this is a completed quiz (different data structure)
    if (tab === 'completed-quizzes' && item.score !== undefined) {
      return (
        <Animatable.View animation="fadeInUp" duration={600} style={tw`mb-2`}>
          <TouchableOpacity
            onPress={() => {
              /* navigate to quiz result */
            }}
            style={tw`bg-white rounded-xl p-4 shadow-sm border border-gray-100`}
          >
            <View style={tw`flex-row items-center justify-between`}>
              <View style={tw`flex-1`}>
                <Text style={tw`text-lg font-bold text-gray-800 mb-1`}>{item.title}</Text>
                <View style={tw`flex-row items-center mb-2`}>
                  <View style={tw`flex-row items-center mr-4`}>
                    <Ionicons 
                      name={item.passed ? "trophy" : "close-circle"} 
                      size={16} 
                      color={item.passed ? "#22c55e" : "#ef4444"} 
                    />
                    <Text style={[tw`text-sm font-semibold ml-1`, { color: item.passed ? "#22c55e" : "#ef4444" }]}>
                      {item.passed ? "Passed" : "Failed"}
                    </Text>
                  </View>
                  <Text style={tw`text-sm text-gray-500`}>{item.date}</Text>
                </View>
                <View style={tw`flex-row items-center`}>
                  <Text style={tw`text-sm text-gray-600`}>
                    Score: {item.score}/{item.totalQuestions}
                  </Text>
                  <View style={tw`ml-4 bg-gray-100 rounded-full px-2 py-1`}>
                    <Text style={tw`text-xs font-semibold text-gray-700`}>
                      {Math.round((item.score / item.totalQuestions) * 100)}%
                    </Text>
                  </View>
                </View>
              </View>
              <View style={tw`ml-3`}>
                <Ionicons 
                  name="chevron-forward" 
                  size={20} 
                  color="#9ca3af" 
                />
              </View>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      );
    }

    // Default pending item card
    return (
      <Animatable.View animation="fadeInUp" duration={600} style={tw`mb-2`}>
        <PendingItemCard
          {...item}
          subtitleLeft={(item as any).watchedAt || (item as any).scannedAt}
          subtitleRight={(item as any).duration}
          progress={(item as any).watchedPercentage}
          onPress={() => {
            /* navigate to actual item */
          }}
        />
      </Animatable.View>
    );
  };

  // Loading footer component
  const renderLoadingFooter = () => {
    if (!isLoadingMore) return null;
    
    return (
      <View style={tw`py-4 items-center`}>
        <View style={tw`flex-row items-center`}>
          <View style={tw`w-4 h-4 bg-blue-500 rounded-full mr-2 animate-pulse`} />
          <Text style={tw`text-gray-600 font-medium`}>Loading more...</Text>
        </View>
      </View>
    );
  };

  return (
    <SectionList
      ref={listRef}
      sections={sections}
      keyExtractor={(item) => item.id}
      contentContainerStyle={tw`pb-8`}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListEmptyComponent={() => (
        <View style={tw`items-center py-8`}>
          <Text style={tw`text-gray-500 text-center`}>No items found</Text>
        </View>
      )}
      renderSectionFooter={({ section }) => 
        section.data.length === 0 ? renderEmptyState(section) : null
      }
      ListFooterComponent={null}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
      SectionSeparatorComponent={() => <View style={tw`h-2`} />}
      scrollEnabled={false}
      // Performance optimizations
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={20}
      getItemLayout={(data, index) => ({
        length: 80, // Approximate item height
        offset: 80 * index,
        index,
      })}
    />
  );
}
