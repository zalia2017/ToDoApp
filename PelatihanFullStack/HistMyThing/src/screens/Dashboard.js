import React, { Component } from 'react'
import { StyleSheet, View, BackHandler, FlatList, Image, AsyncStorage, Alert } from 'react-native'
import { Text, List, ListItem, Fab, Icon } from 'native-base'
import axios from 'axios'
import { ConfirmDialog } from 'react-native-simple-dialogs'

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            idUser: '',
        }
    }
    openConfirm = (show, value) => {
        this.setState({ showConfirm: show, btnValue: value });
    }
    optionYes = () => {
        this.openConfirm(false);
        setTimeout(
            () => {
                //    if(this.state.btnValue=='logout'){
                this.handleLogout()
                //    }
            },
            300,
        );
    }
    optionNo = () => {
        this.openConfirm(false);
    }
    getData = async () => {
        const idUser = await AsyncStorage.getItem('@HistMyThings.idUser')
        axios({
            url: "https://histmythings1583381336810.mejik.id/graphql",
            method: "POST",
            data: {
                variables: {
                    idUser: `${idUser}`
                },
                query: `
                    query($idUser: String!){
                        items(where: {
                            idUser: $idUser
                        }){
                            id
                            name
                        }
                    }
                    `
            }
        }).then(res => {
            this.setState({
                items: res.data.data.items
            })
        })
    }
    handleLogout = async () => {

        const token = await AsyncStorage.getItem('@HistMyThings');
        axios({
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
        }).then(async res => {
            await AsyncStorage.setItem('@HistMyThings', '')
            this.setState({
                token: ''
            })
            this.props.navigation.navigate('Login')
        }).catch(err => {
            alert(err.toString())
        })
    }
    handleDelete = () => {

    }

    componentDidMount() {
        this.getData()
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        
        return true;
    }
    render() {

        var lengthOfArray = this.state.items.length

        this.props.navigation.setOptions({
            headerShown: true,
            headerBackTitleVisible: false,
            keyboardHandlingEnabled: false,
            headerTitle: 'ITEM LISTS',
            headerLeft: null,
            headerRight: () => <TouchableOpacity onPress={() => this.openConfirm(true, 'logout')}><Icon type="MaterialIcons" name="exit-to-app" style={{ color: '#ffffff' }} /></TouchableOpacity>,
            headerStyle: { backgroundColor: '#505154' },
            headerTintColor: '#FD9644',
            headerRightContainerStyle: { marginRight: 16 },
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
                            data={this.state.items}
                            renderItem={({ item, index }) =>
                                <List>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('DetailItem', { id: item.id, item: item.name })}
                                    >
                                        <ListItem>
                                            <Text>{index + 1}.{item.name}. </Text>
                                        </ListItem>
                                    </TouchableOpacity>
                                </List>

                            }
                            keyExtractor={item => item.id}
                        />
                    }

                    <Fab
                        onPress={() => this.props.navigation.navigate('AddItem', { handleRefresh: this.getData })}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#174691' }}
                        position="bottomRight"
                    >
                        <Icon name="add" type="MaterialIcons" />

                    </Fab>
                    <ConfirmDialog
                        title="Confirm Dialog"
                        message="Are you sure want to logout?"
                        onTouchOutside={() => this.openConfirm(false)}
                        visible={this.state.showConfirm}
                        negativeButton={
                            {
                                title: "NO",
                                onPress: this.optionNo,
                                titleStyle: {
                                    color: "blue",
                                    colorDisabled: "aqua",
                                },
                                style: {
                                    backgroundColor: "transparent",
                                    backgroundColorDisabled: "transparent",
                                },
                            }
                        }
                        positiveButton={
                            {
                                title: "YES",
                                onPress: this.optionYes,
                            }
                        }
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ScanQR')}
                    style={{ backgroundColor: '#FD9644', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white' }}>Scan QR Code</Text>
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
