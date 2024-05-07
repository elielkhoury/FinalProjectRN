import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '/Users/elieelkhoury/Desktop/Eurisko/FinalProject/App';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    const endpoint = 'https://backend-practice.euriskomobility.me/login';
    const payload = {email, password, token_expires_in: '30m'};

    fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        if (data.accessToken) {
          Alert.alert('Success', 'Login successful');
          navigation.navigate('Tab'); // Assume navigating to Tab after login
        } else {
          Alert.alert('Error', data.message || 'Login failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred during login');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#BDBDBD" // Light gray for placeholder
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#BDBDBD" // Light gray for placeholder
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={{height: 10}} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>DON'T HAVE AN ACCOUNT? SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#3E2723',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  input: {
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    backgroundColor: '#4E342E',
  },
  button: {
    marginVertical: 10,
    backgroundColor: '#6D4C41', // Adjusted to a softer brown
    padding: 12,
    borderRadius: 5, // Rounded corners for a better look
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16, // Make the text slightly larger
  },
});

export default LoginScreen;
