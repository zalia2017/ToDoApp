import React, { Component } from 'react'
import { StyleSheet, View, FlatList, Image, AsyncStorage } from 'react-native'
import { Form, Button, Text, List, ListItem, Fab, Icon } from 'native-base'
import axios from 'axios'
import Moment from 'moment'

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
export default class DetailItem extends Component {
    constructor(props) {
        super(props)
        //get passing id from Dashboard
        this.id = this.props.route.params.id
        this.item = this.props.route.params.item
        this.state = {
            histories: [],
            name: ''
        }
    }

    getData = async () => {
        const idUser = await AsyncStorage.getItem('@HistMyThings.idUser')
        const idItem = this.id
        axios({
            url: "https://histmythings1583381336810.mejik.id/graphql",
            method: "POST",
            data: {
                variables: {
                    idItem: `${idItem}`
                },
                query: `
                    query($idItem: String!){
                        histories(where: {
                            idItem: $idItem
                        }, orderBy: date_ASC){
                            id
                            name
                            date
                        }
                    }
                    `
            }
        }).then(res => {
            console.log(res.data.data.histories)
            this.setState({
                histories: res.data.data.histories,
                name: res.data.data.histories.name
            })
        }).catch(err => {
            // alert(err.toString())
        })
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        const id = this.id
        const item = this.item
        this.props.navigation.setOptions({
            headerShown: true,
            keyboardHandlingEnabled: false,
            headerTitle: 'Items Detail',
            headerStyle: { backgroundColor: '#505154' },
            headerTintColor: '#FD9644'
        });

        const lengthOfArray = this.state.histories.length
        return (
            <View style={styles.container}>
                <View style={{borderWidth: 1, borderColor: '#FD9644', height: 50, alignItems: 'center', justifyContent: 'center'
            , borderRadius: 10, width: '100%'}}>
                    <Text style={{ color: '#505154', fontFamily: 'Poppins-Bold', fontSize: 18  }}>{item}</Text>
                </View>

                <View style={styles.container}>
                
                    {lengthOfArray == 0 ?
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
                            <Image source={require('./../assets/img/no_thing.png')} />
                            <Text style={{ color: '#7d7f85' }}>No list were added</Text>
                        </View>

                        :
                        <View style={{marginTop: -20}}>
                        <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14, color: '#FD9644'}}>Your Item's repair history will shown here</Text>
                        
                        <FlatList style={{ padding: 0, marginTop: 20 }}
                            data={this.state.histories}
                            renderItem={({ item, index }) =>
                                <List>
                                    <ListItem style={{ marginLeft: 0 }}>
                                        <Text style={{fontFamily: 'Poppins-Regular', fontSize: 16}}>{index + 1}. {item.name}   ({`${Moment(item.date).format('DD MMM Y')}`})</Text>
                                    </ListItem>
                                </List>
                            }
                            keyExtractor={item => item.id}
                        />
                        </View>
                    }

                    <Fab
                        onPress={() => this.props.navigation.navigate('AddHistory', { handleRefresh: this.getData, id: this.id })}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#174691' }}
                        position="bottomRight"
                    >
                        <Icon name="add" type="MaterialIcons" />

                    </Fab>


                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingTop: 30
    }
})
