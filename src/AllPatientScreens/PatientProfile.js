import { StyleSheet, Text, View, Image, Button, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { FullWindowOverlay } from 'react-native-screens'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { launchCameraAsync, requestMediaLibraryPermissionsAsync, launchImageLibraryAsync } from 'expo-image-picker';




export default function PatientProfile({ navigation }) {
  const [image, setImage] = useState('https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-min-an-675920.jpg&fm=jpg')
  


  const handleChangeProfile = async () => {
    try {
      await requestMediaLibraryPermissionsAsync()
      const result = await launchImageLibraryAsync({
        aspect: [1, 1],
        quality: 1,
        allowsEditing: true,
        allowsMultipleSelection: true
      });
      if (!result.canceled) {
        setImage(result.assets);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = () => {
    AsyncStorage.removeItem('userToken');
    navigation.replace('SignIn'); 
  }


  return (
    <View>

      <Pressable onPress={handleChangeProfile} style={{ alignItems: 'center', borderRadius:99, width: 200, height: 200,alignSelf:'center',marginTop:25 }}>

        <Image source={{uri: image}} style={{ width:'100%',height:'100%', borderRadius: 99 }} />
<Feather name='edit' size={30} color="red" style={{backgroundColor:"black",position:'absolute', right:-5, top:130}}/>

      </Pressable>
      <View style={{ paddingHorizontal: 20, alignItems: 'center', paddingTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Mary Brown</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Patient</Text>
      </View>
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Edit')}>
          <Text style={{ paddingStart: 170, fontSize: 18, color: 'red' }}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 10, display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 40 }}>
        <MaterialIcons name="contact-page" size={30} color="#000" style={{ paddingStart: 100, }} />
        <Text style={{ fontSize: 18 }}>Female</Text>
      </View>
      <View style={{ paddingHorizontal: 20, paddingTop: 10, display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 30 }}>
        <AntDesign name="calendar" size={30} color="#000" style={{ paddingStart: 100, }} />
        <Text style={{ fontSize: 18 }}>June 16 1960</Text>
      </View>
      <View style={{ paddingHorizontal: 20, paddingTop: 10, display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 30 }}>
        <Fontisto name="toggle-off" size={30} color="#000" style={{ paddingStart: 100, }} />
        <Text style={{ fontSize: 18 }}>Dark Mode</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleLogout} >
          <Text style={styles.buttonText}>Press Me</Text>
        </TouchableOpacity>
      </View>




    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: verticalScale(20),
    alignItems: 'center',
    paddingTop: 40,
  },
  button: {
    backgroundColor: '#d8bfd8',
    padding: 10,
    borderRadius: 5,
    width: 180,
    padding: 20,
    height: 60,
    alignItems: 'center'
  },
  buttonText: {
    height: 30,
    textAlign: 'center',


    fontSize: 16,
  },
});