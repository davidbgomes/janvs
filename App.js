import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Geolocation from 'react-native-geolocation-service'
import 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage'

import Home from "./Home"
import LandingPage from "./LandingPage"
import Settings from "./Settings"
import ProfileEdit from "./ProfileEdit"
import Matches from "./Matches"
import { GoogleSignin } from '@react-native-community/google-signin'
import HeaderIcon from "./HeaderIcon"

GoogleSignin.configure({
  webClientId: '15239251876-tq2cl21t197oehtegrn72i5ngj919kne.apps.googleusercontent.com',
});

const Stack = createStackNavigator()

class App extends React.Component{

    constructor(){
        super()
        this.state={
            googleUser:null,
            isInitializing:true,
            user:{},
            userImages:[]
        }
    }

    async componentDidMount(){


        //FETCH USER DB DATA
        await auth().onAuthStateChanged(this.onAuthStateChanged)

        firestore().collection('users').where("uid","==",this.state.googleUser.uid).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                this.setState({
                    user: doc.data()
                })
            })
        })
        .catch(error =>{
            console.log(error)
        })

        //FETCH USER IMAGES FROM STORAGE
        const reference = storage().ref(this.state.user.uid)

        listFilesAndDirectories(reference).then(() => {
          console.log('Finished listing')
        })


        // GET CURRENT LOCATION
        Geolocation.getCurrentPosition(
            (position) => {
              console.log(position)
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }

    onGoogleButtonPress = async() => {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn()

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken)

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential)
    }

    logout = () => {
        auth().signOut()
        .then(() => 
            this.setState({
                googleUser: null
            }, () => console.log('User signed out!'))  
        )
    }

    onAuthStateChanged = async(user) =>{
        this.setState({
            googleUser:user
        })
        if (this.state.isInitializing){
            this.setState({
                isInitializing: false
            })
        }
    }

    listFilesAndDirectories = (reference, pageToken) => {
        return reference.list({ pageToken }).then(result => {
            // Loop over each item
            result.items.forEach(ref => {
              console.log(ref.fullPath)
            })

            if (result.nextPageToken) {
              return listFilesAndDirectories(reference, result.nextPageToken)
            }

            return Promise.resolve()
        })
    }

    getMatches = async() =>{
        let matches = []

        await firestore().collection('users').where("liked","array-contains",this.state.user.uid).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                matches.push({
                    name:doc.data().name,
                    avatar_url: 'https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg',
                    subtitle: 'New!'
                })
            })
        })
        .catch(error =>{
            console.log(error)
        })

        return matches
    }

    saveBio = (bio) =>{
        console.log("saveBio")
        this.state.user.bio = bio
    }

    render(){

        console.log("user", this.state.googleUser)

        return(
            <NavigationContainer>        
                <Stack.Navigator initialRouteName="Home" gestureEnabled={true}>
                    {this.state.googleUser === null ?
                        <Stack.Screen
                            name="LandingPage"
                            options={{
                                headerShown:false
                            }}
                        >
                            {props => <LandingPage {...props} onGoogleButtonPress={this.onGoogleButtonPress} />}
                        </Stack.Screen>
                    :
                        <Stack.Screen
                            name="Home"
                            options={{
                                headerTitle:"Janvs",
                                headerRight: () => (
                                    <HeaderIcon iconName="user" route="Settings"/>
                                ),
                                headerLeft: () => (
                                    <HeaderIcon iconName="heart" route="Matches"/>
                                ),
                                headerTitleAlign: "center",
                            }}
                        >
                            {props => <Home {...props} />}
                        </Stack.Screen>
                    }
                    {this.state.googleUser !== null &&
                        <>
                            <Stack.Screen name="Settings"
                                options={{
                                    headerTitle:"User Settings",
                                    headerTitleAlign: "center"
                                }}
                            >
                                {props => <Settings {...props} user={this.state.user} logout={this.logout}/>}
                            </Stack.Screen>
                            <Stack.Screen name="Matches"
                                options={{
                                    headerTitle:"Matches",
                                    headerTitleAlign: "center"
                                }}
                            >
                                {props => <Matches {...props} getMatches={this.getMatches} />}
                            </Stack.Screen>
                            <Stack.Screen name="ProfileEdit"
                                options={{
                                    headerTitle:"Profile Edit",
                                    headerTitleAlign: "center"
                                }}
                            >
                                {props => <ProfileEdit {...props} user={this.state.user} saveBio={this.saveBio} />}
                            </Stack.Screen>
                        </>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default App