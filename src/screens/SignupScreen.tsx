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

type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Signup'
>;

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleSignup = () => {
    const endpoint = 'https://backend-practice.euriskomobility.me/signup';
    const payload = {
      email: email,
      password: password,
      token_expires_in: '30m',
    };

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        if (data.accessToken) {
          Alert.alert('Success', 'Signup successful');
          navigation.navigate('Tab');
        } else {
          Alert.alert('Error', data.message || 'Signup failed');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred during signup');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#BDBDBD"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#BDBDBD"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#BDBDBD"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      <View style={{height: 10}} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>ALREADY HAVE AN ACCOUNT? LOGIN</Text>
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
    backgroundColor: '#6D4C41',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default SignupScreen;
