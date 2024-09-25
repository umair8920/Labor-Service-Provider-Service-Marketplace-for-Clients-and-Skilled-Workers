
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const HomeScreen = ({ navigation }) => {


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Labour Service Provider </Text>
      <Text style={styles.subtitle}>This is a platfrom to connect service Providers with clients in need in nearest area.</Text>
      
      <View style={styles.infoBox}>
          <Image source={require('./assets/123.png')} style={styles.boxImage} />
          <Text style={styles.boxTitle}>General Information</Text>
          <Text style={styles.boxText}>
            {'\u2022'}&nbsp;&nbsp;The app helps people find trustworthy service providers nearby. {"\n"}

           
          </Text>
          <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>This means more visibility, job opportunities, and money for skilled workers.</Text>
       </View>
       <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>It links clients with skilled workers close by, making it simple for both sides to connect and get work done.  while skilled workers can grow their client base and get repeat business.</Text>
       </View>
         
        </View>

      <View style={styles.infoBox}>
        <Image source={require('./assets/provider.png')} style={styles.boxImage} />
        <Text style={styles.boxTitle}>Service Provider</Text>
        <Text style={styles.boxText}> Service Providers can connect to clients through this app by creating their own profile.

</Text>

        <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>Service providers can easily create secure accounts using email verification.</Text>
       </View>
       
       <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>They complete their profiles with key information about their skills and experience. </Text>
       </View>
       
       <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>. By listing their skills and specialties, service providers make it simple for clients to find them based on their unique abilities. </Text>
       </View>
       
       <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>They can also showcase their previous work in portfolios on their profiles. </Text>
       </View>


        <TouchableOpacity
          style={styles.learnMoreButton}
          onPress={() => navigation.navigate('LabourProfile')}
        >
          <Text style={styles.buttonText}>Create Service Provider Profile</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoBox}>
        <Image source={require('./assets/client.png')} style={styles.boxImage} />
        <Text style={styles.boxTitle}>Client's Profile</Text>
        <Text style={styles.boxText}>
        When clients sign up, they fill out their profiles with important details like their preferences, location, and specific needs. 

</Text>
<View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>This helps them personalize their profiles to accurately reflect their unique requirements.</Text>
       </View>
<TouchableOpacity
          style={styles.learnMoreButton}
          onPress={() => navigation.navigate('LabourProfile')}
        >

          
          <Text style={styles.buttonText}>Create Client Profile</Text>
        </TouchableOpacity>
        
      </View>
      
    
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 40, // Add padding to the top and bottom to avoid content being cut off
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  boxImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  boxText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  learnMoreButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the start
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 3, // Adjusted margin top
  },
  instructionText: {
    flex: 1, // Allow text to wrap
    fontSize: 16,
    color: '#555',
  },
});

export default HomeScreen;
