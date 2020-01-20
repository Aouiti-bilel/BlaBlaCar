
//This is an example code to get Geolocation//  
import PolyLine from '@mapbox/polyline'
import React, { useState, useEffect } from 'react';
//import react in our code. 
import {View, Text,  StyleSheet, Image ,PermissionsAndroid,Platform, TextInput, SegmentedControlIOSComponent} from 'react-native';
//import all the components we are going to use.
import Geolocation from '@react-native-community/geolocation';
import _ from 'lodash'
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
export default  App = () => {
  const [position, setPostion] = useState({latitude: 36.828896, longitude: 10.05052,})
  const [destination, setDestination] = useState('');
  const [predictions, setPredictions] = useState([])
  const[pointCoords, setPointCoords] = useState([])
useEffect(()=>{
   getRouteDirections()
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
    const api = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDLtYa1WFQlzo-jjljI1pboX_pnnVWh1F8&input=${destination}&location= ${position.latitude},${position.longitude}`
    const res = await fetch(api)
    const resJson = await res.json()
    try {
       setPredictions(resJson.predictions)
       console.log(predictions);
    } catch (err) {
       console.error(error)
    }
}
      getRouteDirections = async()=> {
       //  const api = 'https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyDLtYa1WFQlzo-jjljI1pboX_pnnVWh1F8'
       //Because i can't Create An accout In Google Cloud I try this way Only For testing ...
       const  pointss = "knjmEnjunUbKCfEA?_@]@kMBeE@qIIoF@wH@eFFk@WOUI_@?u@j@k@`@EXLTZHh@Y`AgApAaCrCUd@cDpDuAtAoApA{YlZiBdBaIhGkFrDeCtBuFxFmIdJmOjPaChDeBlDiAdD}ApGcDxU}@hEmAxD}[tt@yNb\\yBdEqFnJqB~DeFxMgK~VsMr[uKzVoCxEsEtG}BzCkHhKWh@]t@{AxEcClLkCjLi@`CwBfHaEzJuBdEyEhIaBnCiF|K_Oz\\ {MdZwAbDaKbUiB|CgCnDkDbEiE|FqBlDsLdXqQra@kX|m@aF|KcHtLm@pAaE~JcTxh@w\\`v@gQv`@}F`MqK`PeGzIyGfJiG~GeLhLgIpIcE~FsDrHcFfLqDzH{CxEwAbBgC|B}F|DiQzKsbBdeA{k@~\\oc@bWoKjGaEzCoEzEwDxFsUh^wJfOySx[uBnCgCbCoFlDmDvAiCr@eRzDuNxC_EvAiFpCaC|AqGpEwHzFoQnQoTrTqBlCyDnGmCfEmDpDyGzGsIzHuZzYwBpBsC`CqBlAsBbAqCxAoBrAqDdDcNfMgHbHiPtReBtCkD|GqAhBwBzBsG~FoAhAaCbDeBvD_BlEyM``@uBvKiA~DmAlCkA|B}@lBcChHoJnXcB`GoAnIS~CIjFDd]A|QMlD{@jH[vAk@`CoGxRgPzf@aBbHoB~HeMx^eDtJ}BnG{DhJU`@mBzCoCjDaAx@mAnAgCnBmAp@uAj@{Cr@wBPkB@kBSsEW{GV}BEeCWyAWwHs@qH?cIHkDXuDn@mCt@mE`BsH|CyAp@}AdAaAtAy@lBg@pCa@jE]fEcBhRq@pJKlCk@hLFrB@lD_@xCeA`DoBxDaHvM_FzImDzFeCpDeC|CkExDiJrHcBtAkDpDwObVuCpFeCdHoIl\\uBjIuClJsEvMyDbMqAhEoDlJ{C|J}FlZuBfLyDlXwB~QkArG_AnDiAxC{G|OgEdLaE`LkBbEwG~KgHnLoEjGgDxCaC`BuJdFkFtCgCnBuClD_HdMqEzHcBpB_C|BuEzCmPlIuE|B_EtDeBhCgAdCw@rCi@|DSfECrCAdCS~Di@jDYhA_AlC{AxCcL`U{GvM_DjFkBzBsB`BqDhBaEfAsTvEmEr@iCr@qDrAiFnCcEzCaE~D_@JmFdGQDwBvCeErEoD|BcFjC}DbEuD~D`@Zr@h@?d@Wr@}@vAgCbEaHfMqA`Cy@dAg@bAO`@gCi@w@W"
         const points = PolyLine.decode(pointss)
         console.log(points)
         const pointCoords = points.map(point =>
            {
             return  { latitude: point[0], longitude: point[1]}
            }) ;
            setPointCoords(pointCoords)
         try {
            
         } catch (error) {
           console.log('cateched')
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
         latitude: 33.80982,
         longitude: -117.91544,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
   }}
      showsUserLocation={false}
      > 
          <Polyline coordinates= {pointCoords} strokeWidth={2} strokeColor='blue' /> 
      </MapView>
     
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