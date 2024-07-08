import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { auth, db } from '../firebaseConfig';


const Profile = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState({
    username: '',
    email: '',
    profileImage: require('../assets/profile.jpg'),
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const q = query(collection(db, 'users'), where('email', '==', auth.currentUser.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setUserProfile({
            username: userData.username || '',
            email: userData.email || '',
            profileImage: userData.profileImage || require('../assets/profile.jpg'),
          });
        });
      } catch (error) {
        console.error("Kullanıcı verileri getirilirken hata oluştu: ", error);
      }
    };

    if (auth.currentUser) {
      fetchUserData();
    }

    return () => {
    };
  }, []);

  const handleLogout = () => {
    console.log('Çıkış yap butonuna basıldı');
    navigation.navigate('Login');
  };

  return (
    
      <View style={styles.container}>
        <Image source={userProfile.profileImage} style={styles.profileImage} />
        <Text style={styles.username}>{userProfile.username}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3D7FF',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  logoutButtonText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
