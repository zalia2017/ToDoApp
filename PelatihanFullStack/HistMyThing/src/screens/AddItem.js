import React, { Component } from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native'
import { Form, Button, Text, Picker, Icon } from 'native-base'
import axios from 'axios'

import TextInput from './../components/TextInput'
import { ScrollView } from 'react-native-gesture-handler';

export default class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'key1',
            name: '',
            category: ''
        }
    }

    handleSave = async () => {
        const token = await AsyncStorage.getItem('@HistMyThings');
        const idUser = await AsyncStorage.getItem('@HistMyThings.idUser');
        if(this.state.name==''){
            alert('Masih ada data yang kosong')
            return false
        }
        axios({
            url: "https://histmythings1583381336810.mejik.id/graphql",
            method: "POST",
            headers: {
                "Authorization" : `Bearer ${token}`
            },
            data: {
                variables: {
                    name: this.state.name,
                    category: this.state.category,
                    idUser:   `${idUser}`
                },
                query: `
                    mutation($name: String!, $category: String!, $idUser: String!) {
                        createItem(input: {
                            name: $name,
                            category: $category
                            idUser: $idUser
                        },) {
                            id
                            name
                            category
                        }
                    }
                `
            }
        }).then(async res => {
            this.props.route.params.handleRefresh()
            this.props.navigation.goBack()
        }).catch(err => {
            console.log(err)
            alert(err.toString())
        })
    }
    onValueChange(value) {
        this.setState({
            selected: value,

        });
    }
   
    render() {
        this.props.navigation.setOptions({
            headerShown: true,
            keyboardHandlingEnabled: false,
            headerTitle: 'Add Item',
            headerStyle: { backgroundColor: '#505154' },
            headerTintColor: '#FD9644'
        });
        const listOfCategory = [
            {
                id: '1',
                // name: 'TV',
                value: 'TV'
            },
            {
                id: '2',
                // name: 'Motor',
                value: 'Motor'
            },
            {
                id: '3',
                // name: 'Mesin Cuci',
                value: 'Mesin Cuci'
            },
            {
                id: '4',
                // name: 'Mesin Cuci',
                value: 'Sepeda'
            },
            {
                id: '5',
                // name: 'Mesin Cuci',
                value: 'Mobil'
            },
            {
                id: '6',
                // name: 'Mesin Cuci',
                value: 'Tempat Tidur'
            },
            {
                id: '7',
                // name: 'Mesin Cuci',
                value: 'Lemari'
            },
            {
                id: '8',
                // name: 'Mesin Cuci',
                value: 'Komputer'
            },
            {
                id: '9',
                // name: 'Mesin Cuci',
                value: 'Laptop'
            }


        ]
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.sectionTop}>
                        <Text style={styles.titleLarge}>{"Add your new Item"}</Text>
                    </View>
                    <Form>
                        <TextInput
                            label="Item Name"
                            placeholder="e.g LG TV on Living Room"
                            onChangeText={(text)=>this.setState({'name': text})}
                        />
                        <Text style={styles.labelInput}>{"Category"}</Text>
                        <View style={styles.input}>
                            <Picker
                                mode="dropdown"
                                iosHeader="Select your SIM"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                {listOfCategory.map((item) =>
                                     <Picker.Item label={item.value} key={item.id} value={item.value} />
                                )}
                                <Picker.Item label="Other" />

                            </Picker>
                        </View>
                        
                    </Form>
                    <View style={styles.sectionFooter}>
                        <Button block style={styles.btnBlock} onPress={() => this.handleSave()}>
                            <Text style={styles.labelBtn}>{"ADD"}</Text>
                        </Button>
                    </View>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 16
    },
    sectionTop: {
        marginTop: 20,
        marginBottom: 22,
        alignItems: 'center'
    },
    titleLarge: {
        fontFamily: 'Poppins-Bold',
        fontSize: 28,
        lineHeight: 40,
        marginBottom: 3,
        color: 'black'
    },
    btnBlock: {
        backgroundColor: '#FD9644',
        borderColor: 'transparent',
        borderRadius: 4
    },
    labelInput: {
        fontSize: 'Poppins-Medium',
        fontSize: 14,
        lineHeight: 18,
        color: '#7d7f85',
        marginTop: 15,
        marginBottom: 6
    },
    input: {
        backgroundColor: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 44,
        color: '#2F3542',
        paddingBottom: 0,
        paddingTop: 0,
        paddingLeft: 16,
        paddingRight: 16,
        borderWidth: 1,
        borderColor: '#7d7f85',
        marginBottom: 30
    },
    labelBtn: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        lineHeight: 44,
        letterSpacing: 0.16,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center'
    }
})
