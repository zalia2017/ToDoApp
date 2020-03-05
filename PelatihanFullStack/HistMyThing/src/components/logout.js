import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import axios from 'axios'

export default class logout extends Component {
    render() {
        logout = async () =>{
            // alert('logout')
            const token = await AsyncStorage.getItem('@HistMyThings');
            axios ({
                url: "https://histmythings1583381336810.mejik.id/graphql",
                method: "POST",
                data: {
                    variables: {
                        token: '${token}'
                    },
                    query: `
                    mutation($token: String!) {
                        logout(input: {
                            token: $token
                          }){
                            lastName
                          }
                      }
                    `
                }
            }).then(async res=> {
                await AsyncStorage.setItem('@HistMyThings', '')
                this.setState({
                    token: ''
                })
                this.props.navigation.navigate('Login')
            }).catch(err => {
                alert(err.toString())
            })
        }
    }
}
