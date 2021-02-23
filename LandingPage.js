import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  StatusBar,
} from 'react-native'

import { Text } from 'react-native-elements';


function LandingPage(props){

    return(
        <View>
            <Text h1 style={{textAlign:"center"}}>Janvs</Text>
            <Text h5>Connect with the world</Text>
            

            <Button title="Login with Google" onPress={() => props.onGoogleButtonPress().then(() => console.log("logged in!")).catch(error => console.log(error))} />
        </View>
    )
    
}

export default LandingPage