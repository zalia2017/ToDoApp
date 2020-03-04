import React, { Component } from 'react'
import { StyleSheet, View, FlatList, Image } from 'react-native'
import { Form, Button, Text, List, ListItem, Fab, Icon } from 'native-base'

import TextInput from './../components/TextInput'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: true
        }
    }
    handleVisibility = () => {
        this.setState({ visibility: !this.state.visibility })
    }
    render() {
        const listOfThing = [
            {
                id: '1',
                list: 'TV Rumah Ruang Tamu',
            },
            {
                id: '2',
                list: 'Motor Vario',
            },
            {
                id: '3',
                list: 'Motor Revo',
            },
            {
                id: '4',
                list: 'AC Rumah Kamar Tidur',
            },
            {
                id: '5',
                list: 'Mesin Cuci Rumah Sanken',
            },
            {
                id: '6',
                list: 'Sepeda',
            },
            {
                id: '7',
                list: 'Sofa Merah Rumah',
            },
            {
                id: '8',
                list: 'Bangku Kayu Panjang di Rumah',
            },
            {
                id: '9',
                list: 'Lemari Kayu Kamar',
            },
            {
                id: '10',
                list: 'Kipas Angin Standing Ruang Tamu',
            },
            {
                id: '11',
                list: 'Kompor Gas 2 Tungku Rumah',
            },
            {
                id: '12',
                list: 'Magic Com Myako di Rumah',
            }
        ]
        const listOfThing2 = [
        ]
        var lengthOfArray = listOfThing.length

        this.props.navigation.setOptions({
            headerShown: true,
            keyboardHandlingEnabled: false,
            headerTitle: 'Dashboard',
            headerStyle: { backgroundColor: '#505154' },
            headerTintColor: '#FD9644'
        });
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    {lengthOfArray == 0 ?
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
                            <Image source={require('./../assets/img/no_thing.png')} />
                            <Text style={{ color: '#7d7f85' }}>No things were added</Text>
                        </View>

                        :
                        <FlatList
                            data={listOfThing}
                            renderItem={({ item }) =>
                                <List>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('DetailItem', { id: item.id, item: item.list })}
                                    >
                                        <ListItem>
                                            <Text>{item.id}. </Text>
                                            <Text>{item.list}</Text>
                                        </ListItem>
                                    </TouchableOpacity>


                                </List>
                            }
                            keyExtractor={item => item.id}
                        />
                    }

                    <Fab
                        onPress={() => this.props.navigation.navigate('AddItem')}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: 'green' }}
                        position="bottomRight"
                    >
                        <Icon name="add" type="MaterialIcons" />

                    </Fab>


                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ScanQR')}
                 style={{ backgroundColor: '#FD9644', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{color:'white'}}>Scan QR Code</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16
    }
})
