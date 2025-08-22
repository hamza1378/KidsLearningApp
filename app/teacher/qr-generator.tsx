import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import tw from 'twrnc';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { playClickSound } from '@/hooks/buttonPopSound';
import { SoundManager } from '@/hooks/SoundManager';
import { VOICE_STYLES } from '@/constants/voicePresets';
import * as Animatable from 'react-native-animatable';
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';

const { width } = Dimensions.get('window');

interface Question {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
}

interface QuizData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  questions: Question[];
  totalQuestions: number;
  passingScore: number;
}

export default function QRGeneratorScreen() {
  const [topicName, setTopicName] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [generatedQRData, setGeneratedQRData] = useState<QuizData | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'questions'>('basic');
  
  const qrRef = useRef<any>(null);

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: (questions.length + 1).toString(),
      question: '',
      options: [
        { id: 'A', text: '', isCorrect: false },
        { id: 'B', text: '', isCorrect: false },
        { id: 'C', text: '', isCorrect: false },
        { id: 'D', text: '', isCorrect: false },
      ],
      explanation: '',
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleUpdateQuestion = (index: number, field: keyof Question, value: any) => {
    const updatedQuestions = [...questions];
    if (field === 'options') {
      updatedQuestions[index].options = value;
    } else {
      (updatedQuestions[index] as any)[field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleUpdateOption = (questionIndex: number, optionIndex: number, field: 'text' | 'isCorrect', value: any) => {
    const updatedQuestions = [...questions];
    (updatedQuestions[questionIndex].options[optionIndex] as any)[field] = value;
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleGenerateQR = async () => {
    if (!topicName.trim() || !description.trim() || !videoUrl.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    if (questions.length === 0) {
      Alert.alert('No Questions', 'Please add at least one question.');
      return;
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      if (!question.question.trim()) {
        Alert.alert('Invalid Question', `Question ${i + 1} is empty.`);
        return;
      }
      
      const hasCorrectAnswer = question.options.some(opt => opt.isCorrect);
      if (!hasCorrectAnswer) {
        Alert.alert('Invalid Question', `Question ${i + 1} must have one correct answer.`);
        return;
      }
      
      for (let j = 0; j < question.options.length; j++) {
        if (!question.options[j].text.trim()) {
          Alert.alert('Invalid Question', `Question ${i + 1}, Option ${question.options[j].id} is empty.`);
          return;
        }
      }
    }

    await playClickSound();

    const quizData: QuizData = {
      id: `quiz-${Date.now()}`,
      title: topicName,
      description,
      videoUrl,
      questions,
      totalQuestions: questions.length,
      passingScore: Math.ceil(questions.length * 0.6), // 60% passing score
    };

    setGeneratedQRData(quizData);
    setShowQRModal(true);

    SoundManager.speak({
      text: "QR code generated successfully!",
      style: VOICE_STYLES.funKid,
    });
  };

  const handleSaveAsImage = async () => {
    try {
      if (qrRef.current) {
        const qrDataURL = await qrRef.current.toDataURL();
        const fileName = `qr-${topicName.replace(/\s+/g, '-')}-${Date.now()}.png`;
        const filePath = `${FileSystem.documentDirectory}${fileName}`;
        
        await FileSystem.writeAsStringAsync(filePath, qrDataURL, {
          encoding: FileSystem.EncodingType.Base64,
        });

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(filePath);
        } else {
          Alert.alert('Success', 'QR code saved as image!');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save QR code as image.');
    }
  };

  const handleSaveAsPDF = async () => {
    try {
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .qr-section { text-align: center; margin: 30px 0; }
              .info-section { margin: 20px 0; }
              .question { margin: 15px 0; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${topicName}</h1>
              <p>${description}</p>
            </div>
            <div class="qr-section">
              <h2>QR Code for Video</h2>
              <p>Scan this QR code to access the educational video and quiz.</p>
            </div>
            <div class="info-section">
              <h3>Video URL:</h3>
              <p>${videoUrl}</p>
              <h3>Questions (${questions.length}):</h3>
              ${questions.map((q, i) => `
                <div class="question">
                  <strong>Question ${i + 1}:</strong> ${q.question}<br>
                  <strong>Options:</strong><br>
                  ${q.options.map(opt => `- ${opt.id}. ${opt.text}${opt.isCorrect ? ' (Correct)' : ''}`).join('<br>')}
                  ${q.explanation ? `<br><strong>Explanation:</strong> ${q.explanation}` : ''}
                </div>
              `).join('')}
            </div>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Success', 'PDF generated successfully!');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF.');
    }
  };

  const renderBasicInfoTab = () => (
    <View style={tw`space-y-6`}>
      {/* Topic Name */}
      <View style={tw`bg-white rounded-2xl p-6 shadow-lg border border-blue-100`}>
        <View style={tw`flex-row items-center mb-4`}>
          <Ionicons name="book" size={24} color="#3b82f6" />
          <Text style={tw`text-xl font-bold text-gray-800 ml-2`}>Topic Information</Text>
        </View>
        
        <View style={tw`space-y-4`}>
          <View>
            <Text style={tw`text-gray-700 font-semibold mb-2`}>Topic Name *</Text>
            <TextInput
              value={topicName}
              onChangeText={setTopicName}
              placeholder="Enter topic name (e.g., Math Basics)"
              style={tw`border-2 border-gray-200 rounded-xl p-4 text-lg bg-gray-50`}
            />
          </View>
          
          <View>
            <Text style={tw`text-gray-700 font-semibold mb-2`}>Description *</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Enter topic description"
              multiline
              numberOfLines={3}
              style={tw`border-2 border-gray-200 rounded-xl p-4 text-lg bg-gray-50`}
            />
          </View>
          
          <View>
            <Text style={tw`text-gray-700 font-semibold mb-2`}>Video URL (YouTube) *</Text>
            <TextInput
              value={videoUrl}
              onChangeText={setVideoUrl}
              placeholder="https://www.youtube.com/watch?v=..."
              style={tw`border-2 border-gray-200 rounded-xl p-4 text-lg bg-gray-50`}
            />
          </View>
        </View>
      </View>

      {/* Navigation to Questions */}
      <TouchableOpacity
        onPress={() => setActiveTab('questions')}
        style={tw`bg-gradient-to-r from-green-500 to-teal-600 py-4 rounded-2xl items-center`}
      >
        <View style={tw`flex-row items-center`}>
          <Ionicons name="arrow-forward" size={20} color="white" />
          <Text style={tw`text-white font-bold text-lg ml-2`}>
            Add Questions ({questions.length})
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderQuestionsTab = () => (
    <View style={tw`space-y-6`}>
      {/* Questions List */}
      <View style={tw`space-y-4`}>
        {questions.map((question, index) => (
          <Animatable.View
            key={question.id}
            animation="fadeInUp"
            delay={index * 100}
            style={tw`bg-white rounded-2xl p-6 shadow-lg border border-green-100`}
          >
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-lg font-bold text-gray-800`}>
                Question {index + 1}
              </Text>
              <TouchableOpacity
                onPress={() => handleRemoveQuestion(index)}
                style={tw`bg-red-100 p-2 rounded-full`}
              >
                <Ionicons name="trash" size={16} color="#ef4444" />
              </TouchableOpacity>
            </View>

            <View style={tw`space-y-4`}>
              <View>
                <Text style={tw`text-gray-700 font-semibold mb-2`}>Question *</Text>
                <TextInput
                  value={question.question}
                  onChangeText={(value) => handleUpdateQuestion(index, 'question', value)}
                  placeholder="Enter your question"
                  multiline
                  numberOfLines={2}
                  style={tw`border-2 border-gray-200 rounded-xl p-4 text-lg bg-gray-50`}
                />
              </View>

              <View>
                <Text style={tw`text-gray-700 font-semibold mb-2`}>Options *</Text>
                {question.options.map((option, optionIndex) => (
                  <View key={option.id} style={tw`flex-row items-center mb-2`}>
                    <TouchableOpacity
                      onPress={() => {
                        const updatedOptions = question.options.map((opt, i) => ({
                          ...opt,
                          isCorrect: i === optionIndex,
                        }));
                        handleUpdateQuestion(index, 'options', updatedOptions);
                      }}
                      style={tw.style('w-6 h-6 rounded-full border-2 mr-3 items-center justify-center', {
                        borderColor: option.isCorrect ? '#22c55e' : '#d1d5db',
                        backgroundColor: option.isCorrect ? '#22c55e' : 'transparent',
                      })}
                    >
                      {option.isCorrect && (
                        <Ionicons name="checkmark" size={12} color="white" />
                      )}
                    </TouchableOpacity>
                    <Text style={tw`w-8 text-lg font-bold text-gray-600`}>
                      {option.id}.
                    </Text>
                    <TextInput
                      value={option.text}
                      onChangeText={(value) => handleUpdateOption(index, optionIndex, 'text', value)}
                      placeholder={`Option ${option.id}`}
                      style={tw`flex-1 border-2 border-gray-200 rounded-xl p-3 text-lg bg-gray-50`}
                    />
                  </View>
                ))}
              </View>

              <View>
                <Text style={tw`text-gray-700 font-semibold mb-2`}>Explanation (Optional)</Text>
                <TextInput
                  value={question.explanation || ''}
                  onChangeText={(value) => handleUpdateQuestion(index, 'explanation', value)}
                  placeholder="Explain the correct answer"
                  multiline
                  numberOfLines={2}
                  style={tw`border-2 border-gray-200 rounded-xl p-4 text-lg bg-gray-50`}
                />
              </View>
            </View>
          </Animatable.View>
        ))}
      </View>

      {/* Add Question Button */}
      <TouchableOpacity
        onPress={handleAddQuestion}
        style={tw`bg-gradient-to-r from-blue-500 to-purple-600 py-4 rounded-2xl items-center`}
      >
        <View style={tw`flex-row items-center`}>
          <Ionicons name="add" size={20} color="white" />
          <Text style={tw`text-white font-bold text-lg ml-2`}>
            Add Question
          </Text>
        </View>
      </TouchableOpacity>

      {/* Generate QR Button */}
      <TouchableOpacity
        onPress={handleGenerateQR}
        style={tw`bg-gradient-to-r from-yellow-500 to-orange-500 py-4 rounded-2xl items-center`}
      >
        <View style={tw`flex-row items-center`}>
          <Ionicons name="qr-code" size={20} color="white" />
          <Text style={tw`text-white font-bold text-lg ml-2`}>
            Generate QR Code
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <BackgroundWrapper>
      <SafeAreaView style={tw`flex-1`}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between p-4`}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`bg-white bg-opacity-20 p-3 rounded-full`}
          >
            <Ionicons name="arrow-back" size={24} color="#101519" />
          </TouchableOpacity>
          <Text style={tw`text-xl font-bold text-yellow-600`}>
            QR Code Generator 🎯
          </Text>
          <View style={tw`w-12`} />
        </View>

        {/* Tab Navigation */}
        <View style={tw`flex-row mx-4 mb-6 bg-white rounded-2xl p-1 shadow-lg`}>
          {[
            { key: 'basic', label: 'Basic Info', icon: 'information-circle' },
            { key: 'questions', label: 'Questions', icon: 'help-circle' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => setActiveTab(tab.key as any)}
              style={[
                tw`flex-1 flex-row items-center justify-center py-3 rounded-xl`,
                activeTab === tab.key ? tw`bg-gradient-to-r from-blue-500 to-purple-600` : tw`bg-transparent`,
              ]}
            >
              <Ionicons
                name={tab.icon as any}
                size={16}
                color={activeTab === tab.key ? 'white' : '#6b7280'}
              />
              <Text
                style={[
                  tw`ml-2 font-semibold`,
                  { color: activeTab === tab.key ? 'white' : '#6b7280' },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <ScrollView
          style={tw`flex-1 px-4`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pb-6`}
        >
          {activeTab === 'basic' && renderBasicInfoTab()}
          {activeTab === 'questions' && renderQuestionsTab()}
        </ScrollView>

        {/* QR Code Modal */}
        <Modal
          visible={showQRModal}
          animationType="slide"
          transparent={true}
        >
          <View style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}>
            <View style={tw`bg-white rounded-3xl p-6 m-4 w-11/12 max-w-md`}>
              <View style={tw`items-center mb-6`}>
                <Text style={tw`text-2xl font-bold text-gray-800 mb-2`}>
                  QR Code Generated! 🎉
                </Text>
                <Text style={tw`text-gray-600 text-center`}>
                  {generatedQRData?.title}
                </Text>
              </View>

              <View style={tw`items-center mb-6`}>
                <View style={tw`bg-white p-4 rounded-2xl border-2 border-gray-200`}>
                  <QRCode
                    ref={qrRef}
                    value={JSON.stringify(generatedQRData)}
                    size={200}
                    color="black"
                    backgroundColor="white"
                  />
                </View>
              </View>

              <View style={tw`space-y-3`}>
                <TouchableOpacity
                  onPress={handleSaveAsImage}
                  style={tw`bg-gradient-to-r from-blue-500 to-purple-600 py-4 rounded-xl items-center`}
                >
                  <View style={tw`flex-row items-center`}>
                    <Ionicons name="image" size={20} color="white" />
                    <Text style={tw`text-white font-bold text-lg ml-2`}>
                      Save as Image
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSaveAsPDF}
                  style={tw`bg-gradient-to-r from-green-500 to-teal-600 py-4 rounded-xl items-center`}
                >
                  <View style={tw`flex-row items-center`}>
                    <Ionicons name="document" size={20} color="white" />
                    <Text style={tw`text-white font-bold text-lg ml-2`}>
                      Save as PDF
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setShowQRModal(false)}
                  style={tw`bg-gray-300 py-4 rounded-xl items-center`}
                >
                  <Text style={tw`text-gray-700 font-bold text-lg`}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </BackgroundWrapper>
  );
} 