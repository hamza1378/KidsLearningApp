import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import tw from '@/lib/tailwind';
import { SUBJECTS } from '@/constants/subject';

interface SubjectFilterProps {
  selectedSubject: string | null;
  onSubjectChange: (subject: string | null) => void;
  style?: any;
}

const { height: screenHeight } = Dimensions.get('window');

const SubjectFilter: React.FC<SubjectFilterProps> = ({
  selectedSubject,
  onSubjectChange,
  style
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubjectSelect = (subject: string | null) => {
    onSubjectChange(subject);
    setIsOpen(false);
  };

  const getSubjectColor = (subjectName: string) => {
    const subject = SUBJECTS.find(s => s.name === subjectName);
    return subject?.color || 'blue';
  };

  const getSubjectIcon = (subjectName: string) => {
    const subjectIcons: { [key: string]: string } = {
      'Math': 'calculator',
      'Science': 'flask',
      'English': 'book',
      'History': 'library',
      'Geography': 'globe',
    };
    return subjectIcons[subjectName] || 'school';
  };

  return (
    <>
      {/* Filter Button */}
      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={[
          tw`rounded-2xl p-4 shadow-lg border border-yellow-200 flex-row items-center justify-between overflow-hidden`,
          style
        ]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#fef3c7', '#fde68a', '#fcd34d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={tw`absolute inset-0 rounded-2xl`}
        />
        <View style={tw`relative z-10 flex-row items-center`}>
          <View style={tw`w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full items-center justify-center mr-3`}>
            <LinearGradient
              colors={['#3b82f6', '#8b5cf6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={tw`w-10 h-10 rounded-full items-center justify-center`}
            >
              <Ionicons name="filter" size={20} color="white" />
            </LinearGradient>
          </View>
          <View>
            <Text style={tw`text-lg font-bold text-gray-800`}>Filter by Subject</Text>
            <Text style={[
              tw`text-sm font-semibold`,
              selectedSubject ? tw`text-blue-600` : tw`text-gray-500`
            ]}>
              {selectedSubject || 'All Subjects'}
            </Text>
          </View>
        </View>
        <View
          style={{
            transform: [{ rotate: isOpen ? '180deg' : '0deg' }]
          }}
        >
          <Ionicons name="chevron-down" size={22}  color="#6b7280" />
        </View>
      </TouchableOpacity>

      {/* Modal Dropdown */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={tw`flex-1 bg-black/50 justify-end`}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <Animatable.View
            animation="slideInUp"
            duration={300}
            style={tw`rounded-t-3xl max-h-${Math.floor(screenHeight * 0.6)} overflow-hidden`}
          >
            <LinearGradient
              colors={['#fef3c7', '#fde68a', '#fbbf24']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={tw`absolute inset-0 rounded-t-3xl`}
            />
            {/* Header */}
            <View style={tw`relative z-10 p-6 border-b border-yellow-200`}>
              <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-2xl font-bold text-gray-800`}>Select Subject</Text>
                <TouchableOpacity
                  onPress={() => setIsOpen(false)}
                  style={tw`w-8 h-8 bg-gray-100 rounded-full items-center justify-center`}
                >
                  <Ionicons name="close" size={18} color="#6b7280" />
                </TouchableOpacity>
              </View>
              <Text style={tw`text-gray-500 mt-1`}>Choose a subject to filter content</Text>
            </View>

            {/* Options */}
            <ScrollView style={tw`max-h-80 relative z-10 px-4 pb-4`} showsVerticalScrollIndicator={false}>
              {/* All Subjects Option */}
              <TouchableOpacity
                onPress={() => handleSubjectSelect(null)}
                style={tw`p-4 bg-white/70 rounded-xl mb-2 shadow-sm`}
                activeOpacity={0.7}
              >
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full items-center justify-center mr-4`}>
                    <LinearGradient
                      colors={['#9ca3af', '#4b5563']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={tw`w-12 h-12 rounded-full items-center justify-center`}
                    >
                      <Ionicons name="apps" size={24} color="white" />
                    </LinearGradient>
                  </View>
                   <View style={tw`flex-1`}>
                     <Text style={tw`text-lg font-semibold text-gray-800`}>All Subjects</Text>
                   </View>
                  {!selectedSubject && (
                    <View style={tw`w-6 h-6 bg-blue-500 rounded-full items-center justify-center`}>
                      <Ionicons name="checkmark" size={16} color="white" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>

              {/* Subject Options */}
              {SUBJECTS.map((subject, index) => (
                <Animatable.View
                  key={subject.id}
                  animation="fadeInUp"
                  delay={index * 100}
                  duration={300}
                >
                  <TouchableOpacity
                    onPress={() => handleSubjectSelect(subject.name)}
                    style={tw`p-4 bg-white/70 rounded-xl mb-2 shadow-sm`}
                    activeOpacity={0.7}
                  >
                    <View style={tw`flex-row items-center`}>
                      <View style={tw`w-12 h-12 rounded-full items-center justify-center mr-4`}>
                        <LinearGradient
                          colors={getSubjectColor(subject.name) === 'blue' ? ['#3b82f6', '#1d4ed8'] :
                                  getSubjectColor(subject.name) === 'green' ? ['#10b981', '#059669'] :
                                  getSubjectColor(subject.name) === 'purple' ? ['#8b5cf6', '#7c3aed'] :
                                  getSubjectColor(subject.name) === 'orange' ? ['#f59e0b', '#d97706'] :
                                  ['#14b8a6', '#0d9488']}
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          style={tw`w-12 h-12 rounded-full items-center justify-center`}
                        >
                          <Ionicons name={getSubjectIcon(subject.name) as any} size={24} color="white" />
                        </LinearGradient>
                      </View>
                       <View style={tw`flex-1`}>
                         <Text style={tw`text-lg font-semibold text-gray-800`}>{subject.name}</Text>
                       </View>
                      {selectedSubject === subject.name && (
                        <View style={tw`w-6 h-6 bg-blue-500 rounded-full items-center justify-center`}>
                          <Ionicons name="checkmark" size={16} color="white" />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </Animatable.View>
              ))}
            </ScrollView>
          </Animatable.View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default SubjectFilter;
