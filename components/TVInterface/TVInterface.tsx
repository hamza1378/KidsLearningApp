import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

interface TVInterfaceProps {
  mode: 'video' | 'quiz' | 'app';
  title: string;
  content?: string;
  onAction?: () => void;
  isConnected: boolean;
  isAppMirroring?: boolean;
}

export default function TVInterface({ 
  mode, 
  title, 
  content, 
  onAction, 
  isConnected,
  isAppMirroring = false
}: TVInterfaceProps) {
  const getModeIcon = () => {
    if (mode === 'app') return 'phone-portrait';
    return mode === 'video' ? 'play-circle' : 'help-circle';
  };

  const getModeColor = () => {
    if (mode === 'app') return '#8b5cf6';
    return mode === 'video' ? '#3b82f6' : '#22c55e';
  };

  const getModeText = () => {
    if (mode === 'app') return 'App Mirroring';
    return mode === 'video' ? 'Video Mode' : 'Quiz Mode';
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <View style={[styles.backgroundGradient, { backgroundColor: getModeColor() }]} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="school" size={60} color="white" />
          <Text style={styles.logoText}>Kids Learning</Text>
        </View>
        
        <View style={styles.connectionStatus}>
          <View style={[styles.statusDot, { backgroundColor: isConnected ? '#22c55e' : '#ef4444' }]} />
          <Text style={styles.statusText}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Animatable.View 
          animation="zoomIn" 
          duration={1000}
          style={styles.contentCard}
        >
          <View style={styles.modeIndicator}>
            <Ionicons name={getModeIcon()} size={80} color={getModeColor()} />
            <Text style={[styles.modeText, { color: getModeColor() }]}>
              {getModeText()}
            </Text>
          </View>

          <Text style={styles.title}>{title}</Text>
          
                     {content && (
             <Text style={styles.content}>{content}</Text>
           )}

           {mode === 'app' && (
             <View style={styles.appInterface}>
               <Text style={styles.appPrompt}>
                 Kids Learning App is running on TV!
               </Text>
               <View style={styles.appFeatures}>
                 <View style={styles.featureCard}>
                   <Ionicons name="qr-code" size={32} color="#8b5cf6" />
                   <Text style={styles.featureText}>QR Scanner</Text>
                 </View>
                 <View style={styles.featureCard}>
                   <Ionicons name="play-circle" size={32} color="#3b82f6" />
                   <Text style={styles.featureText}>Videos</Text>
                 </View>
                 <View style={styles.featureCard}>
                   <Ionicons name="help-circle" size={32} color="#22c55e" />
                   <Text style={styles.featureText}>Quizzes</Text>
                 </View>
                 <View style={styles.featureCard}>
                   <Ionicons name="trophy" size={32} color="#f59e0b" />
                   <Text style={styles.featureText}>Progress</Text>
                 </View>
               </View>
               <Text style={styles.remoteText}>
                 Use your phone as a remote control
               </Text>
             </View>
           )}

           {mode === 'video' && (
             <View style={styles.videoControls}>
               <TouchableOpacity style={styles.controlButton}>
                 <Ionicons name="play" size={40} color="white" />
               </TouchableOpacity>
               <TouchableOpacity style={styles.controlButton}>
                 <Ionicons name="pause" size={40} color="white" />
               </TouchableOpacity>
               <TouchableOpacity style={styles.controlButton}>
                 <Ionicons name="volume-high" size={40} color="white" />
               </TouchableOpacity>
             </View>
           )}

           {mode === 'quiz' && (
             <View style={styles.quizInterface}>
               <Text style={styles.quizPrompt}>
                 Use your phone to answer questions!
               </Text>
               <View style={styles.quizOptions}>
                 <View style={styles.optionCard}>
                   <Text style={styles.optionLetter}>A</Text>
                   <Text style={styles.optionText}>First Option</Text>
                 </View>
                 <View style={styles.optionCard}>
                   <Text style={styles.optionLetter}>B</Text>
                   <Text style={styles.optionText}>Second Option</Text>
                 </View>
                 <View style={styles.optionCard}>
                   <Text style={styles.optionLetter}>C</Text>
                   <Text style={styles.optionText}>Third Option</Text>
                 </View>
                 <View style={styles.optionCard}>
                   <Text style={styles.optionLetter}>D</Text>
                   <Text style={styles.optionText}>Fourth Option</Text>
                 </View>
               </View>
             </View>
           )}
        </Animatable.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Cast from Kids Learning App
        </Text>
        <Text style={styles.footerSubtext}>
          Use your phone as a remote control
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 16,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  contentCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 30,
    padding: 40,
    alignItems: 'center',
    minWidth: width * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modeIndicator: {
    alignItems: 'center',
    marginBottom: 30,
  },
  modeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    fontSize: 24,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  videoControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  controlButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  appInterface: {
    width: '100%',
    alignItems: 'center',
  },
  appPrompt: {
    fontSize: 28,
    color: '#8b5cf6',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  appFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 30,
  },
  featureCard: {
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    minWidth: 100,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    marginTop: 8,
    fontWeight: '600',
  },
  remoteText: {
    fontSize: 20,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  quizInterface: {
    width: '100%',
    alignItems: 'center',
  },
  quizPrompt: {
    fontSize: 24,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  quizOptions: {
    width: '100%',
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  optionLetter: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginRight: 16,
    width: 40,
    textAlign: 'center',
  },
  optionText: {
    fontSize: 20,
    color: '#374151',
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  footerSubtext: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
});
