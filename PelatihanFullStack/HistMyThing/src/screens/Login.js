import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Form, Button, Text } from 'native-base'

import TextInput from './../components/TextInput'
import { ScrollView } from 'react-native-gesture-handler'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility: true
        }
    }

    handleVisibility = () => {
        this.setState({visibility: !this.state.visibility})
    }
    render() {
        this.props.navigation.setOptions({
            headerMode: 'none',
            headerShown: false,
            keyboardHandlingEnabled: false
        })
        return (
            <View style={styles.container}>
                <ScrollView>
                <View style={styles.sectionTop}>
                    <Image 
                        source={require('./../assets/img/my_logo.png')}
                        style={styles.imgBrand}/>
                    <View style={styles.line}/>
                    <Text style={styles.titleLarge}>{"Welcome"}</Text>
                    <Text style={styles.subTitle}>{"Please enter your account to continue"}</Text>
                </View>
                <Form>
                    <TextInput
                        label="Email"
                        placeholder="e.g. zulka.ajuab@gmail.com"
                        keyboardType={"email-address"}
                   />
                   <TextInput
                        password={true}
                        secureTextEntry={this.state.visibility}
                        label="Password"
                        placeholder="Input your Password..."
                        changeVisibility={this.handleVisibility}
                    />
                </Form>
                <View style={styles.sectionFooter}>
                    <Button block style={styles.btnBlock} 
                        onPress={()=>this.props.navigation.navigate('Dashboard')}>
                            <Text style={styles.labelBtn}>{"SIGN IN"}</Text>
                    </Button>
                    <View style={styles.infoFooter}>
                        <Text style={styles.textInfo}>{"I don't have an account yet. "}
                             <Text style={styles.textInfoLink} onPress={() => this.props.navigation.navigate('Register')}>
                                 {"Register"}
                              </Text>
                        </Text>
                    </View>
                </View>

                </ScrollView>
            </View>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#505154',
        paddingHorizontal: 16
    },
    sectionTop: {
        marginTop: 44,
        marginBottom: 22,
        alignItems: 'center'
    },
    imgBrand: {
        width: 143,
        height:100,
        marginBottom: 10
    },
    line: {
        borderBottomWidth: 1, 
        borderBottomColor: 'white',
        width: '100%',
        marginTop: 10,
        marginBottom: 10
    },
    titleLarge: {
        fontFamily: 'Poppins-Bold',
        fontSize: 28, 
        lineHeight: 40,
        marginBottom: 3,
        color: 'white'
    },
    subTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 21,
        color: 'white'
    },
    sectionFooter: {
        marginTop: 22
    },
    btnBlock: {
        backgroundColor: '#FD9644',
        borderColor: 'transparent',
        borderRadius: 4
    },
    labelBtn: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        lineHeight: 44,
        letterSpacing: 0.16,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center'
    },
    infoFooter: {
        marginTop: 12
    },
    textInfo: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 21,
        color: 'white'
    },
    textInfoLink: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        lineHeight: 21,
        color: '#FD9644'
    }
})