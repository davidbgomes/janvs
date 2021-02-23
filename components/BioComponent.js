import React from 'react'
import { View , Animated, TextInput } from 'react-native'
import { Text , Slider , Card } from 'react-native-elements'

function BioComponent(props){

	return(
        <Card containerStyle={{borderRadius:10 , marginBottom:20}}>
            <Card.Title>Bio</Card.Title>
            <Card.Divider/>
            <View style={{ width:"90%" , marginLeft:"auto" , marginRight:"auto" }}>
                <TextInput
                    style={{height:90}}
                    onChangeText={props.onChangeBio}
                    defaultValue={props.bio}
                />
            </View>
        </Card>
	)
}

export default BioComponent