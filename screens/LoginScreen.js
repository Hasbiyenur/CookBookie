import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCxYIMz4P7ziY27gYuVkUmyUivOSsvkhg8",
  authDomain: "cookbookie-c5b8d.firebaseapp.com",
  projectId: "cookbookie-c5b8d",
  storageBucket: "cookbookie-c5b8d.appspot.com",
  messagingSenderId: "885684402345",
  appId: "1:885684402345:web:7a357495eb56146fff51b8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default function LoginScreen({ navigation }) {
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      let email = input;

      if (!input.includes('@')) {
        const q = query(collection(db, 'users'), where('username', '==', input));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          email = querySnapshot.docs[0].data().email;
        } else {
          throw new Error('Kullanıcı adı veya E-posta bulunamadı');
        }
      }

      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert('Giriş Hatası', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CookBookie</Text>

      <TextInput
        style={styles.input}
        placeholder="E-posta veya Kullanıcı Adı Giriniz"
        keyboardType="email-address"
        autoCapitalize="none"
        value={input}
        onChangeText={setInput}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre Giriniz"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotButtonText}>Şifrenizi mi unuttunuz?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={() => navigation.navigate('Main')}>
        <FontAwesome name="google" size={24} color="white" />
        <Text style={styles.googleButtonText}>Google ile Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3D7FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#4B0082"
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4B0082',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: '#db4437',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  forgotButton: {
    marginBottom: 20,
  },
  forgotButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
});

