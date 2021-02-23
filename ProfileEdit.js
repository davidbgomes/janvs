import React from 'react'
import {
	StyleSheet,
	ScrollView,
	View,
	KeyboardAvoidingView,
	Image,
	Button,
	StatusBar,
	Keyboard,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from 'react-native'
import { Text , Slider , Card } from 'react-native-elements'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import BioComponent from "./components/BioComponent"

import { utils } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';

const styles= StyleSheet.create({
	imagesView:{
		flexDirection:"row",
		flexWrap:"wrap",
		justifyContent:"space-around",
	},
	cardContainer:{
		width:120,
		height:120,
		elevation: 0,
		borderStyle:"dashed",
		borderColor: 'grey',
	    borderStyle: 'dashed',
	    borderWidth: 2,
	    borderRadius: 1,
	    position: 'relative',
	    alignItems:'center',
	    margin:2,
	    marginTop:10
	},
	inner:{
		paddingBottom: 40,
		marginBottom:40,
        flex: 1,
        justifyContent: "space-between",
	}
})


class ProfileEdit extends React.Component{
	constructor(){
		super()
		this.state={
			images:['','','','','',''],
			bio:"",
		}
	}

	async componentDidMount(){
		const reference = storage().ref(this.props.user.uid)

		this.getCurrentPhotos(reference)
		.then(value => {
			console.log("value", value)
		})

		this.setState({
			bio:this.props.route.params.user.bio
		})
	}

	addPhoto = (i) =>{
		console.log("hi")
		launchImageLibrary({mediaType:'photo'}, response =>{
			console.log('Response = ', response)

			if(response.uri !== undefined){
				let imagesCopy = this.state.images

				imagesCopy[i] = response.uri

				this.setState({
					images: imagesCopy
				})
			}

			if (response.didCancel) {
        		console.log('User cancelled image picker')
      		}
      		else if (response.error) {
        		console.log('ImagePicker Error: ', response.error)
      		} 
		})
	}

	getCurrentPhotos = (reference, pageToken) =>{
		return reference.list({ pageToken })
		.then(result => {
		    // Loop over each item
		    let imagesURL = []
		    result.items.forEach(async ref => {
		    	ref.getDownloadURL()
		    	.then(url =>{
		    		imagesURL.push(url)
		    		console.log(imagesURL)
		    	})
		    	.catch(error => {
		    		console.log(error)
		    	})
		    })

		    if (result.nextPageToken) {
		      return listFilesAndDirectories(reference, result.nextPageToken)
		    }

		    return Promise.resolve(imagesURL)
	  	})
	}

	onChangeBio = (bio) =>{
		console.log("onChange")
		this.setState({
			bio:bio
		})
	}

	async componentWillUnmount(){
		//BIO SAVE
		// IF THE USER FROM THE BD IS DIFFERENT FROM THE ONE IN THE STATE, IT WAS CHANGED SO WE WILL SAVE IT
		if(this.props.route.params.user.bio !== this.state.bio){
			firestore().collection('users').doc(this.props.route.params.user.uid).update({
	            bio:this.state.bio
	        })
	        .then(() => {
	        	this.props.saveBio(this.state.bio)
	            console.log("user updated successfully")
	        })
	        .catch(error =>{
	            console.log(error)
	        })
		}

		//PHOTOS SAVE
		const reference = storage().ref(`${this.props.user.uid}/1`);
		for (let i = 0, y = 0; i<this.state.images.length; i++){
			if(this.state.images[i] !== ''){
				const pathToFile = this.state.images[i]
				await storage().ref(`${this.props.user.uid}/${y+1}`).putFile(pathToFile)
				y=y+1
			}
		}

	}


	render(){

		console.log("this.state.images", this.state.images)

		return(
			<ScrollView>
				<KeyboardAvoidingView style={{flex:1, marginBottom:60}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.inner}>
							<View style={styles.imagesView}>
								{
									this.state.images.map((item,i) =>{
										return(
											<TouchableOpacity key={i} onPress={() => this.addPhoto(i)}>
												<Card
													containerStyle={styles.cardContainer}
												>
													{item === "" ?
														<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>										
															<Text h3>{i+1}</Text>
														</View>
													:
														<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
															<Image
																style={{width:117, height:117, resizeMode:'cover'}}
																source={{uri: item}}
															/>
														</View>
													}
												</Card>
											</TouchableOpacity>
										)
									})
								}
							</View>
							<View>
								<BioComponent bio={this.props.route.params.user.bio} onChangeBio={this.onChangeBio}/>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
			</ScrollView>
		)
	}
}

export default ProfileEdit