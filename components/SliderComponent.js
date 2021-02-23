import React from 'react'
import { View , Animated } from 'react-native'
import { Text , Slider , Card } from 'react-native-elements'

function SliderComponent(props){

	return(
        <Card containerStyle={{borderRadius:10 , marginBottom:20}}>
            <Card.Title>Location Radius Search</Card.Title>
            <Card.Divider/>
            <View style={{ width:"90%" , marginLeft:"auto" , marginRight:"auto" }}>
        		<Slider
                    value={props.value}
                    onValueChange={props.onSliderChange}
                    maximumValue={props.max}
                    minimumValue={props.min}
                    step={props.step}
                    thumbStyle={{ height: 20, width: 20, backgroundColor: 'blue' }}
                    animateTransitions={true}
                />
                <Text h5 style={{textAlign:"center"}}>{props.value} Kms</Text>
            </View>
        </Card>
	)
}

export default SliderComponent