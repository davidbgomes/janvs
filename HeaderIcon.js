import React from 'react'
import { Icon } from 'react-native-elements'
import {
  View
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

function HeaderIcon(props){
	const navigation = useNavigation()
	
	return(
		<Icon
            raised
            name={props.iconName}
            type='antdesign'
            style={{flex:1}}
            onPress={() => navigation.navigate(props.route)}
        />
	)
}

export default HeaderIcon