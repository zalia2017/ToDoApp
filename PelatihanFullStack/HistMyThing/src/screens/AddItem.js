import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Form, Button, Text, Picker, Icon } from 'native-base'

import TextInput from './../components/TextInput'
import { ScrollView } from 'react-native-gesture-handler';

export default class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: true,
            selected: 'key1'
        }
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }
    handleVisibility = () => {
        this.setState({ visibility: !this.state.visibility })
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
                name: 'TV',
                value: 'key0'
            },
            {
                id: '2',
                name: 'Motor',
                value: 'key1'
            },
            {
                id: '3',
                name: 'Mesin Cuci',
                value: 'key2'
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
                            placeholder="e.g LG TV on Living Roomg"
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
                                     <Picker.Item label={item.name} key={item.id} value={item.value} />
                                )}
                                <Picker.Item label="Other" />

                            </Picker>
                        </View>
                        
                    </Form>
                    <View style={styles.sectionFooter}>
                        <Button block style={styles.btnBlock} onPress={() => this.props.navigation.goBack()}>
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
