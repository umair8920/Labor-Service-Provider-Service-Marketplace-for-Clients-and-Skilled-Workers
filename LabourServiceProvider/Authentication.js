import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet , ScrollView, Image, ImageBackground} from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';



const firebaseConfig = {
  apiKey: "AIzaSyDdcJPn4KUdRX-VHs8IE2jfM97Oq47kaag",
  authDomain: "labourserviceprovider-6ab86.firebaseapp.com",
  projectId: "labourserviceprovider-6ab86",
  storageBucket: "labourserviceprovider-6ab86.appspot.com",
  messagingSenderId: "67115364049",
  appId: "1:67115364049:web:bafabb7bcac2f9fcbf9ff0",
  measurementId: "G-66FGJZRVW4"
};

const app = initializeApp(firebaseConfig);

const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (value) => {
    const letterRegex = /[a-zA-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    const hasLetter = letterRegex.test(value);
    const hasNumber = numberRegex.test(value);
    const hasSpecialChar = specialCharRegex.test(value);

    if (!hasLetter || !hasNumber || !hasSpecialChar) {
      setPasswordError('Password must include at least one letter, one number, and one special character.');
    } else {
      setPasswordError('');
    }
  };

  return (
    <ImageBackground 
    source={require('./assets/12345.jpg')} 
    style={styles.background}
  >
    <View style={styles.container}>
      <Image source={require('./assets/serlogo.png')} style={styles.icon} />
      <Text style={styles.title}   >{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      <View style={styles.authContainer}>
      
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(value) => {
            validatePassword(value);
            setPassword(value);
          }}
          placeholder="Password"
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <View style={styles.buttonContainer}>
          <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#6D59EA" />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </Text>
        </View>
      </View>
    </View>
    </ImageBackground>
  );
};

const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.Container3}>
      <Text style={styles.title2}>Welcome!</Text>
      <View style={styles.profileContainer}>
        <MaterialIcons name="person" size={70} color="#3498db" style={styles.profileIcon} />
      </View>
      <Text style={styles.title2}>You have been signed in as:</Text>
      <Text style={styles.emailText2}>{user.email}</Text>
      <View style={styles.buttonGap}>
        <Button title="Continue to app" onPress={() => navigation.navigate('SidebarNavigator')} color="#3498db" />
      </View>
      <View style={styles.buttonGap}>
        <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
      </View>
    </View>
  );
};

const Authentication = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);

  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
          // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          // Sign up
          const letterRegex = /[a-zA-Z]/;
          const numberRegex = /[0-9]/;
          const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

          const hasLetter = letterRegex.test(password);
          const hasNumber = numberRegex.test(password);
          const hasSpecialChar = specialCharRegex.test(password);

          if (!hasLetter || !hasNumber || !hasSpecialChar) {
            console.error('Password must include at least one letter, one number, and one special character.');
            return;
          }

          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        // Show user's email if user is authenticated
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          handleAuthentication={handleAuthentication}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' to stretch the image
    width: 400,
 
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'transparent', // 100% transparent
  },
  authContainer: {
    width: 300,
    height: 330,
    backgroundColor: 'transparent', // 100% transparent
  
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    
    
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
    color: '#333333',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#F8F9F9',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 30,
    color: '#333333',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#6D59EA',
  
    
  },
  buttonContainer: {
    borderRadius: 30,
    width: '70%',
    
  
  
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#F56F18',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#6D59EA',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
    textDecorationLine: 'underline',
   
  },
  bottomContainer: {
    marginTop: 20,
  
    
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#F56F18',
    fontWeight: 'bold',
  },
  icon: {
    width: 150,
    height: 150,
    resizeMode: 'contain', // This ensures the image scales properly
    marginBottom: 20, // Adjust as needed for spacing
    marginTop: 30,
  },


  Container3: {
    width: 300,
    height: 410,
    backgroundColor: 'rgb(93, 150, 166)', 
  
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  profileContainer: {
    marginBottom: 20,

  },
  buttonGap: {
    marginVertical: 10,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: "center",

  },
  profileIcon: {
    // Style as needed
    alignSelf:"center",
    color:"#fff",
  },
  emailText2: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Authentication;
