import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
  ScrollView,
} from 'react-native';

import { baseApi } from '../Services/BaseApi';
import { AuthContext } from '../Context/AuthContext';
import { COLOR } from '../Constants';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const showSafeAlert = (title, message) => {
    if (Platform.OS === 'web') {
      Alert.alert(title, message);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async () => {
    setError('');
    try {
      if (!email) {
        setError('Please enter a valid email');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      setLoading(true);
      console.log(email, password);
      const response = await login(email, password);
      console.log(response);

      // 🟢 రన్‌టైమ్ ఎర్రర్ రాకుండా ఉండటానికి క్రాష్ ప్రూఫ్ రెస్పాన్స్ హ్యాండ్లింగ్
      let result = response;
      if (response && typeof response.json === 'function') {
        result = await response.json();
      }

      if (result?.success) {
        showSafeAlert('Success', result.message || 'Login successful!');
        setError(result.message || '');
      } else {
        showSafeAlert(
          'Login Failure',
          result?.message || 'Invalid credentials',
        );
        setError(result?.message || 'Invalid credentials');
      }
    } catch (e) {
      showSafeAlert('Login Failure', e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  // 🟢 వెబ్ మరియు ఆండ్రాయిడ్ రెండింటికీ విడివిడిగా కంటైనర్లను డిఫైన్ చేసాం
  const ContainerWrapper = Platform.OS === 'web' ? View : ScrollView;
  const containerProps =
    Platform.OS === 'web'
      ? {}
      : { contentContainerStyle: styles.scrollContainer, bounces: false };

  return (
    <ContainerWrapper
      {...containerProps}
      style={Platform.OS === 'web' ? styles.webContainer : {}}
    >
      <View style={styles.container}>
        <View style={styles.cardShell}>
          {/* ప్రొఫైల్ సర్కిల్ */}
          <View style={styles.logoFrame}>
            <Image
              source={{ uri: 'https://unsplash.com' }}
              style={styles.logo}
            />
          </View>

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to manage your dashboard</Text>

          <TextInput
            style={styles.input}
            placeholder="Username / Email"
            placeholderTextColor="#A4938A"
            value={email}
            onChangeText={text => {
              setEmail(text);
              if (error) setError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A4938A"
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (error) setError('');
            }}
            secureTextEntry
          />

          {error ? <Text style={styles.errorText}>⚠️ {error}</Text> : null}

          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.opacity]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('register')}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.footerLinkText}>Ask Your Manager</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ContainerWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLOR.mutedCoralPink,
    height: Platform.OS === 'web' ? '100%' : undefined,
  },
  webContainer: {
    backgroundColor: COLOR.mutedCoralPink,
    height: '100vh',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    ...Platform.select({
      web: {
        height: '100vh',
      },
    }),
  },
  cardShell: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: COLOR.creamWhite,
    borderRadius: 35,
    padding: 35,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#4E3629',
        shadowOffset: { width: 4, height: 12 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow:
          'inset 4px 4px 10px rgba(255,255,255,0.8), 8px 16px 30px rgba(78,54,41,0.12)',
      },
    }),
  },
  logoFrame: {
    padding: 6,
    backgroundColor: COLOR.creamWhite,
    borderRadius: 60,
    marginBottom: 15,
    ...Platform.select({
      web: {
        boxShadow:
          'inset 2px 2px 5px rgba(0,0,0,0.08), 2px 4px 10px rgba(255,255,255,0.9)',
      },
      android: {
        borderWidth: 1,
        elevation: 4,
      },
    }),
  },
  logo: { width: 90, height: 90, borderRadius: 45 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLOR.darkCharcoalBrown,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#8C776E',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#F3EDE4',
    borderRadius: 16,
    paddingHorizontal: 20,
    marginBottom: 18,
    fontSize: 15,
    color: COLOR.darkCharcoalBrown,
    ...Platform.select({
      web: {
        boxShadow: 'inset 2px 2px 5px rgba(78,54,41,0.06)',
        // 🟢 క్రేష్ అయ్యే 'outlineStyle' లైన్ ఇక్కడి నుండి పూర్తిగా తీసేసాను
      },
    }),
  },
  button: {
    width: '100%',
    height: 54,
    backgroundColor: COLOR.vibrantCoralOrange,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    ...Platform.select({
      web: {
        boxShadow: '0px 6px 15px rgba(231,131,103,0.35)',
      },
    }),
  },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  errorText: {
    color: '#D9534F',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  forgotPasswordContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  linkText: {
    color: '#8C776E',
    fontSize: 14,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 25,
    color: '#8C776E',
    fontSize: 14,
    textAlign: 'center',
  },
  footerLinkText: {
    color: COLOR.vibrantCoralOrange,
    fontWeight: '700',
  },
  opacity: { opacity: 0.7 },
});

export default LoginScreen;
