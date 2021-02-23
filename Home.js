import React, { Component } from 'react'
import { StyleSheet, View, Modal, Image, ImageBackground } from 'react-native'
 
import Swiper from 'react-native-deck-swiper'
import { Card, ListItem, Button, Icon, Text } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel'
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF",
        alignItems:'center',
        position:'relative'
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white",
        marginTop:-40,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
})
 
class Home extends Component {

    constructor(){
        super()
        this.state={
            cards:[],
            images:['https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg', 'https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg'],
            modalVisible:false,
        }
    }

    getMoviesFromApi = () =>{
        console.log("Fuck you")
    }

    renderCarouselItem = ({item, index}) => {
        return (
            <View>
                <Image style={{height:350 , width:350}} source={{uri: 'https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg'}}/>
                <Text>Hi</Text>
            </View>
        );
    }

    toggleModalVisible = () =>{
        console.log("toggle")
        this.setState(prevState =>{
            return{
                modalVisible: !prevState.modalVisible
            }
        })
    }



    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                data={this.state.images}
                                renderItem={this.renderCarouselItem}
                                sliderWidth={300}
                                itemWidth={300}
                            />
                        </View>
                    </View>
                </Modal>
                <Swiper
                    ref={swiper => {
                        this.swiper = swiper;
                    }}
                    cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
                    cardStyle={{height:'85%'}}
                    cardHorizontalMargin={-10}
                    infinite={true}
                    cardVerticalMargin={50}
                    renderCard={(card) => {
                        return (
                            <Card containerStyle={styles.card}>
                                <Card.Image style={{height:350 , width:350}} source={{uri: 'https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg',}} />
                                <View style={{flexDirection: 'row', justifyContent:"space-between"}}>
                                    <Text h3>Bitch Name</Text>
                                    <Text h3 style={{}}>24</Text>
                                </View>
                                <View>
                                    <Text> Hello, I wanna get fukd </Text>
                                </View>
                                <View style={{flexDirection:"row", justifyContent:"space-around", marginTop:40}}>
                                    <Icon
                                        raised
                                        name='close'
                                        type='antdesign'
                                        style={{flex:1}}
                                        onPress={() => this.swiper.swipeLeft()}
                                    />
                                    <Icon
                                        raised
                                        name='videocamera'
                                        type='antdesign'
                                        style={{flex:1}}
                                        onPress={this.getMoviesFromApi}
                                    />
                                </View>
                            </Card>
                        )
                    }}
                    onSwiped={(cardIndex) => {console.log(cardIndex)}}
                    onSwipedAll={() => {console.log('onSwipedAll')}}
                    onTapCard={this.toggleModalVisible}
                    cardIndex={0}
                    backgroundColor={'#4FD0E9'}
                    stackSize= {3}
                >
                </Swiper>
            </View>
        )
    }
}

export default Home