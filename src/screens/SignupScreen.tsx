import React, {useState} from 'react';
import {View, TextInput, Button, Text, StyleSheet, Alert} from 'react-native';
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
          navigation.navigate('Tab'); // Assume navigating to the main tab
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
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Button
        title="Already have an account? Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#3E2723', // Coffee brown background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#FFFFFF', // White text for contrast
  },
  input: {
    height: 50,
    borderColor: '#FFFFFF', // White borders
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: '#FFFFFF', // White text input
    backgroundColor: '#4E342E', // Slightly lighter brown for input background
  },
  button: {
    marginVertical: 10, // Spacing between buttons
    color: '#FFFFFF', // Text color for the button
    backgroundColor: '#795548', // Coffee themed button color
    padding: 10,
  },
  buttonText: {
    color: '#FFFFFF', // White button text for readability
    textAlign: 'center',
  },
});

export default SignupScreen;
