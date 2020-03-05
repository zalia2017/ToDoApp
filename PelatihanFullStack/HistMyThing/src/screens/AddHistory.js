import React, { Component } from 'react'
import { StyleSheet, View, AsyncStorage} from 'react-native'
import { Form, Button, Text, DatePicker } from 'native-base'
import axios from 'axios'

import TextInput from '../components/TextInput'
import { ScrollView } from 'react-native-gesture-handler';

export default class AddHistory extends Component {
    constructor(props) {
        super(props)
        this.state = { chosenDate: new Date() };
        this.setDate = this.setDate.bind(this);
        this.state = {
            visibility: true,
            selected: 'key1',
            name: ''
        }
    }

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }
    
    handleSave = async () => {
        const token = await AsyncStorage.getItem('@HistMyThings');
        const idUser = await AsyncStorage.getItem('@HistMyThings.idUser');

        if(this.state.name=='' || this.state.chosenDate==''){
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
                    idItem: this.props.route.params.id,
                    date: this.state.chosenDate
                },
                query: `
                    mutation($name: String!, $idItem: String!, $date: DateTime!) {
                        createHistory(input: {
                            name: $name
                            idItem: $idItem
                            date: $date
                          },) {
                               id
                                name
                                idItem
                                date
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
    render() {
        this.props.navigation.setOptions({
            headerShown: true,
            keyboardHandlingEnabled: false,
            headerTitle: 'Add Repair History',
            headerStyle: { backgroundColor: '#505154' },
            headerTintColor: '#FD9644'
        });
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.sectionTop}>
                        <Text style={styles.titleLarge}>{"Add Repair History of Your Items"}</Text>
                    </View>
                    <Form>
                        <Text style={styles.labelInput}>{"Date of Repair"}</Text>
                        <View style={styles.input}>
                            <DatePicker
                                defaultDate={new Date()}
                                minimumDate={new Date(2018, 1, 1)}
                                // maximumDate={new Date(2018, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select date"
                                textStyle={{ color: "#2F3542"}}
                                placeHolderTextStyle={{ color: "#747D8C" }}
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                        </View>

                        <TextInput
                            label="Repair Description"
                            placeholder="e.g Change LCD Component"
                            onChangeText={(text)=> this.setState({name: text})}
                        />

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
        fontSize: 18,
        lineHeight: 40,
        marginBottom: 3,
        color: 'black'
    },
    btnBlock: {
        backgroundColor: '#FD9644',
        borderColor: 'transparent',
        borderRadius: 4,
        marginTop: 10
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
