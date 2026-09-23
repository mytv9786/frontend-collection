import React, { useState } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// నేవిగేషన్ మరియు స్క్రీన్స్ ఇంపోర్ట్స్
import StackNavigationss from './src/Navigations/StackNavigationss';
import LoginScreen from './src/Screens/LoginScreen';
import Dashboard from './src/Screens/Dashboard';

const App = () => {
  // 🟢 కేవలం వెబ్ కోసం స్క్రీన్ మార్చడానికి ఒక సింపుల్ స్టేట్
  const [currentWebScreen, setCurrentWebScreen] = useState('LoginScreen');

  // వెబ్ కోసం మాన్యువల్ నావిగేషన్ ఆబ్జెక్ట్ (మొబైల్ ప్రాప్స్ లాగే పనిచేస్తుంది)
  const webNavigation = {
    navigate: screenName => setCurrentWebScreen(screenName),
  };

  // 1. 🌐 వెబ్ ప్లాట్‌ఫారమ్ అయితే నేరుగా ఈ సింపుల్ రూటింగ్ రన్ అవుతుంది (ఎర్రర్ రాదు!)
  if (Platform.OS === 'web') {
    return (
      <>
        {currentWebScreen === 'LoginScreen' ? (
          <LoginScreen navigation={webNavigation} />
        ) : (
          <Dashboard navigation={webNavigation} />
        )}
      </>
    );
  }

  // 2. 📱 ఆండ్రాయిడ్ / ఐఓఎస్ మొబైల్ అయితే ఎప్పటిలాగే మీ పాత నేవిగేషన్ రన్ అవుతుంది
  return (
    <NavigationContainer>
      <StackNavigationss />
    </NavigationContainer>
  );
};

export default App;
