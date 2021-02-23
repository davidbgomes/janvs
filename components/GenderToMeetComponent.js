import React from 'react'
import { View , Animated } from 'react-native'
import { Text , Icon , Card , ButtonGroup} from 'react-native-elements'

function GenderToMeetComponent(props){

    const male = () =>
        <Icon
            raised
            name='male'
            type='font-awesome'
            size={40}
        />

    const female = () =>
        <Icon
            raised
            name='female'
            type='font-awesome'
            size={40}
        />
    const both = () =>
        <Icon
            raised
            name='venus-mars'
            type='font-awesome'
            size={40}
        />

    const buttons = [{ element: male }, { element: female }, { element: both }]

	return(
        <Card containerStyle={{borderRadius:10 , marginBottom:20}}>
            <Card.Title>I want to meet</Card.Title>
            <Card.Divider/>
            <ButtonGroup
                onPress={props.updateGenderSelectedIndex}
                selectedIndex={props.genderSelectedIndex}
                buttons={buttons}
                containerStyle={{height: 90}}
            />
        </Card>
	)
}

export default GenderToMeetComponent