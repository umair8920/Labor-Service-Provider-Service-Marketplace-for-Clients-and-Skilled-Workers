import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import { getAuth } from '@firebase/auth';
import { getDatabase, ref, set } from '@firebase/database';

const ClientProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const auth = getAuth();
  const database = getDatabase();

  const handleSaveProfile = async () => {
    try {
      // Validate if user is authenticated
      if (!auth.currentUser) {
        setError('User not authenticated');
        return;
      }

      // Validate input fields
      if (!name || !email || !company) {
        setError('Please fill all fields');
        return;
      }

      // Save profile data to Firebase Realtime Database
      const userId = auth.currentUser.uid;
      await set(ref(database, `ClientProfiles/${userId}`), {
        name,
        email,
        company,
      });

      // Show success message
      setSuccessMessage('Profile saved successfully!');

      // Clear input fields
      setName('');
      setEmail('');
      setCompany('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
      <Button title="Save Profile" onPress={handleSaveProfile} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  success: {
    color: 'green',
    marginBottom: 10,
  },
});

export default ClientProfile;
