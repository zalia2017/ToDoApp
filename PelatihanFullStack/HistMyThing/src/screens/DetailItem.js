import React, { Component } from 'react'
import { StyleSheet, View, FlatList, Image } from 'react-native'
import { Form, Button, Text, List, ListItem, Fab, Icon } from 'native-base'

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
export default class DetailItem extends Component {
    constructor(props) {
        super(props)
        //get passing id from Dashboard
        this.id = this.props.route.params.id
        this.item = this.props.route.params.item
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

        const histOfThing = [
            {
                id: '1',
                date: '20 Januari 2020',
                value: 'Pembelian Baru'
            },
            {
                id: '2',
                date: '20 Februari 2020',
                value: 'Perbaikan Pertama'
            },
            {
                id: '3',
                date: '20 Maret 2020',
                value: 'Perbaikan Kedua'
            }
        ]
        const histOfThing2 =[]
        const lengthOfArray = histOfThing.length
        return (
            <View style={styles.container}>
                <Text>{id}.{item}</Text>
                <View style={styles.container}>
                    {lengthOfArray == 0 ?
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
                            <Image source={require('./../assets/img/no_thing.png')} />
                            <Text style={{ color: '#7d7f85' }}>No list were added</Text>
                        </View>

                        :
                        <FlatList style={{padding:0}}
                            data={histOfThing}
                            renderItem={({ item }) =>
                                <List>
                                    <ListItem style={{marginLeft:0}}>
                                        <Text>{item.id}. {item.date} ({item.value}) </Text>
                                    </ListItem>
                                </List>
                            }
                            keyExtractor={item => item.id}
                        />
                    }

                    <Fab
                        onPress={() => this.props.navigation.navigate('AddHistory')}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: 'green' }}
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
