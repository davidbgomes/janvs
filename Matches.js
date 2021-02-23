import React , {useEffect , useState} from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

function Matches(props){

    const [matches, setMatches] = useState([])
    const [hasFetchedMatches, setHasFetchedMatches] = useState(false)

    useEffect(() => {
        async function fetch(){
            const matchList = await props.getMatches()
            setMatches(matchList)
            setHasFetchedMatches(true)
        }
        fetch()
    },[])

    return(
        <ScrollView>
            {hasFetchedMatches &&
                <>
                {matches.length ?
                    matches.map((item, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar source={{uri: item.avatar_url}} />
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                                <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                :
                    <Text>Keep swiping to get new matches!</Text>
                }
                </>
            }
        </ScrollView>
    )
}

export default Matches