
//This is an example code to get Geolocation//  
import React, { useState, useEffect } from 'react';
//import react in our code. 
import {View, Text,  StyleSheet, Image ,PermissionsAndroid,Platform, TextInput, SegmentedControlIOSComponent} from 'react-native';
//import all the components we are going to use.
import Geolocation from '@react-native-community/geolocation';
import _ from 'lodash'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
export default  App = () => {
  const [position, setPostion] = useState({latitude: 36.828896, longitude: 10.05052,})
  const [destination, setDestination] = useState('');
  const [predictions, setPredictions] = useState([])
useEffect(()=>{
  Geolocation.getCurrentPosition(
    (pos) => {
       console.log(pos)
       const longitude = pos.coords.longitude
       const latitude = pos.coords.latitude
       setPostion({ ...position ,longitude, latitude });
    },
    (error) => alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
 );
}, [])
    onChangeDestination = async destination => {
    setDestination(destination)
    const api = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyAsTCaB8kzKs2P1zn4fj803WQznkVprjFE&input=${destination}&location= ${position.latitude},${position.longitude}`
    const res = await fetch(api)
    const resJson = await res.json()
    try {
       setPredictions(resJson.predictions)
       console.log(predictions);
    } catch (err) {
       console.error(error)
    }
}

  withDebounce = _.debounce(onChangeDestination, 1000)
    return (
       <View style={{ flex: 2}}> 
          <TextInput
             style={styles.serachInput}
             placeholder= "Enter Destination"
             value={destination}
             onChangeText = {destination=> withDebounce(destination)}
    />
		<MapView
		style={{ flex: 1 }}
		provider={PROVIDER_GOOGLE}
		initialRegion={{
		latitude: position.latitude,
		longitude: position.longitude,
		latitudeDelta: 0.0922,
      longitudeDelta: 0.0421}}
      showsUserLocation={true}/>
     {predictions&& predictions
     .map(prediction=>
     <Text style={styles.suggestions}key = {prediction.id}>
        {prediction.description}
     </Text>)}
    </View>
    )
 }

const styles = StyleSheet.create ({
    serachInput: {
     height: 40,
     borderWidth: 2,
     marginTop: 50,
     marginLeft: 5,
     marginRight: 5,
     backgroundColor: 'white',
     padding: 5
    },
    suggestions: {
      backgroundColor: 'white',
      padding:5,
      fontSize:18,
      borderWidth:0.5,
      marginLeft:5,
      marginRight:5
    }
}) 