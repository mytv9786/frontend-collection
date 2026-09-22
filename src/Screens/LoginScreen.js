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
} from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context';
//import { AuthContext } from '../Context/AuthContext';
import { baseApi } from '../../services/baseApi';

const LoginScreen = ({ navigation }) => {
  //const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    // Basic Validation
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
      //const result = await login(email, password);

      const response = await fetch(`${baseApi}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', result.message);
        setError(result.message);
      } else {
        Alert.alert('Login Failure', result.message);
        setError(result.message);
      }
    } catch (e) {
      Alert.alert('Login Failure', e);
    } finally {
      setLoading(false); // Stop spinner regardless of outcome
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://via.placeholder.com' }}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (error) setError(''); // Clear error while typing
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (error) setError('');
          }}
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
          disabled={loading} // Prevent double-clicking
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
            <Text style={styles.linkText}>Ask Your Manager</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    flex: 1,
    padding: 25,
    maxWidth: 450,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: { width: 100, height: 100, marginBottom: 20, borderRadius: 50 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  errorText: { color: 'red', marginBottom: 10 },
  forgotPasswordContainer: {
    width: '100%',
    marginTop: 6,
    marginBottom: 25,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  linkText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  footerText: { marginTop: 20, color: '#666' },
  opacity: { opacity: 0.7 },
});

export default LoginScreen;
