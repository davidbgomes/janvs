import React from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  StatusBar,
  Animated,
} from 'react-native'
import { Avatar , Text , Icon , Slider } from 'react-native-elements'
import SliderComponent from "./components/SliderComponent"
import GenderToMeetComponent from "./components/GenderToMeetComponent"
import _ from "lodash"

import firestore from '@react-native-firebase/firestore'

class Settings extends React.Component{

    constructor(){
        super()
        this.state={
            user:{},
            locationRadius:0,
            genderSelectedIndex:0
        }
    }

    componentDidMount(){
        this.setState({
            user:this.props.user,
            locationRadius:this.props.user.locationRadius,
            genderSelectedIndex: this.props.user.lookingFor === "Male" ? 0 :
                                  this.props.user.lookingFor === "Female" ? 1 :
                                  this.props.user.lookingFor === "Both" && 2
        })
    }

    onSliderChange = (value) => {
        this.setState({
            locationRadius: value
        })
    }

    indexToGender = (index) =>{
        switch(index){
            case(0):
                return "Male"
                break
            case(1):
                return "Female"
                break
            case(2):
                return "Both"
                break
        }
    }

    updateGenderSelectedIndex = (selectedIndex) =>{
        this.setState({
            genderSelectedIndex:selectedIndex
        })
    }

    componentWillUnmount(){
        //SAVE THE USER ON UNMOUNT WHEN THE USER WAS CHANGED
        if(_.isEmpty(_.find([this.state.user], {'locationRadius':this.state.locationRadius, 'lookingFor': this.indexToGender(this.state.genderSelectedIndex)}))){
            this.state.user.lookingFor = this.indexToGender(this.state.genderSelectedIndex)
            this.state.user.locationRadius = this.state.locationRadius
            console.log("inside if")
            
            firestore().collection('users').doc(this.state.user.uid).update({
                lookingFor:this.state.user.lookingFor,
                locationRadius:this.state.user.locationRadius
            })
            .then(() => {
                console.log("user updated successfully")
            })
            .catch(error =>{
                console.log(error)
            })

        }
    }

    render(){

        return(
            <ScrollView>
                <View>
                    <Avatar
                        rounded
                        size="xlarge"
                        containerStyle={{marginLeft:"auto", marginRight:"auto"}}
                        title="D"
                        source={{
                          uri:
                            'https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg',
                        }}
                        onPress={() => this.props.navigation.navigate('ProfileEdit',{user:this.state.user})}
                    >
                        <Avatar.Accessory size={30}>
                            <Icon
                                raised
                                name="edit"
                                type='antdesign'
                                style={{flex:1}}
                            />
                        </Avatar.Accessory>
                    </Avatar>
                    <Text h4 style={{textAlign:"center"}}>{this.props.user.name}</Text>
                </View>

                <GenderToMeetComponent
                    genderSelectedIndex={this.state.genderSelectedIndex}
                    updateGenderSelectedIndex={this.updateGenderSelectedIndex}
                />
                
                <SliderComponent
                    value={this.state.locationRadius}
                    onSliderChange={this.onSliderChange}
                    min={1}
                    max={150}
                    step={1}
                />
                <View style={{width:"80%" , marginLeft:"auto" , marginRight:"auto" , paddingBottom:20}}>
                    <Button title="Logout" onPress={() => this.props.logout()} />
                </View>
            </ScrollView>
        )
    }
}

export default Settings