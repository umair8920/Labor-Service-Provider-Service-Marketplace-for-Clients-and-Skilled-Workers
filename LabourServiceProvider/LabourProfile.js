import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth } from '@firebase/auth';
import { getDatabase, ref, set } from '@firebase/database';
import { Ionicons } from '@expo/vector-icons';

const LabourProfile = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [profession, setProfession] = useState('');
  const [skills, setSkills] = useState('');
  const [specialties, setSpecialties] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const auth = getAuth();
  const database = getDatabase();

  const handleSaveProfile = async () => {
    try {
      if (!auth.currentUser) {
        setError('User not authenticated');
        return;
      }

      if (!name || !age || !profession || !skills || !specialties || !portfolio) {
        setError('Please fill all fields');
        return;
      }

      const userId = auth.currentUser.uid;
      await set(ref(database, `LabourProfiles/${userId}`), {
        name,
        age,
        profession,
        skills,
        specialties,
        portfolio,
      });

      setSuccessMessage('Profile saved successfully!');
      setName('');
      setAge('');
      setProfession('');
      setSkills('');
      setSpecialties('');
      setPortfolio('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ImageBackground
    source={require('./assets/home3.jpeg')} // Replace with your image URL
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>Create Your Profile</Text>
          
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="calendar-outline" size={24} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="briefcase-outline" size={24} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Profession"
              value={profession}
              onChangeText={setProfession}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="star-outline" size={24} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Skills"
              value={skills}
              onChangeText={setSkills}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="ribbon-outline" size={24} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Specialties"
              value={specialties}
              onChangeText={setSpecialties}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="link-outline" size={24} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Portfolio"
              value={portfolio}
              onChangeText={setPortfolio}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}
          {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
          
          <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
            <Text style={styles.buttonText}>Save Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  error: {
    color: '#ff4d4f',
    marginBottom: 10,
    textAlign: 'center',
  },
  success: {
    color: '#52c41a',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1890ff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LabourProfile;
