import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { getAuth } from '@firebase/auth';
import { getDatabase, ref, onValue, off } from '@firebase/database';
import { Ionicons } from '@expo/vector-icons';

const DisplayLabourProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const auth = getAuth();
  const database = getDatabase();

  useEffect(() => {
    if (!auth.currentUser) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const userId = auth.currentUser.uid;
    const profileRef = ref(database, `LabourProfiles/${userId}`);
    
    const unsubscribe = onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfile(data);
      } else {
        setError('Profile data not found');
      }
      setLoading(false);
    }, (error) => {
      setError(error.message);
      setLoading(false);
    });

    return () => off(profileRef, 'value', unsubscribe);
  }, [auth, database]);

  if (loading) {
    return (
      <ImageBackground
        source={{ uri: 'https://example.com/background.jpg' }} // Replace with your background image URL
        style={styles.background}
      >
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#1890ff" />
        </View>
      </ImageBackground>
    );
  }

  if (error) {
    return (
      <ImageBackground
        source={{ uri: 'https://example.com/background.jpg' }} // Replace with your background image URL
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.error}>{error}</Text>
        </View>
      </ImageBackground>
    );
  }

  if (!profile) {
    return (
      <ImageBackground
        source={{ uri: 'https://example.com/background.jpg' }} // Replace with your background image URL
        style={styles.background}
      >
        <View style={styles.container}>
          <Text>No profile data found.</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
    source={require('./assets/home3.jpeg')}  
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Labour Profile</Text>
          <View style={styles.profileItem}>
            <Ionicons name="person-outline" size={24} color="#1890ff" />
            <Text style={styles.profileText}>Name: {profile.name}</Text>
          </View>
          <View style={styles.profileItem}>
            <Ionicons name="calendar-outline" size={24} color="#1890ff" />
            <Text style={styles.profileText}>Age: {profile.age}</Text>
          </View>
          <View style={styles.profileItem}>
            <Ionicons name="briefcase-outline" size={24} color="#1890ff" />
            <Text style={styles.profileText}>Profession: {profile.profession}</Text>
          </View>
          <View style={styles.profileItem}>
            <Ionicons name="star-outline" size={24} color="#1890ff" />
            <Text style={styles.profileText}>Skills: {profile.skills}</Text>
          </View>
          <View style={styles.profileItem}>
            <Ionicons name="ribbon-outline" size={24} color="#1890ff" />
            <Text style={styles.profileText}>Specialties: {profile.specialties}</Text>
          </View>
          <View style={styles.profileItem}>
            <Ionicons name="link-outline" size={24} color="#1890ff" />
            <Text style={styles.profileText}>Portfolio: {profile.portfolio}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  error: {
    color: '#ff4d4f',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default DisplayLabourProfile;
