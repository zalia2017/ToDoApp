import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { Form, Container, Content, Header, Left, Body, Right, Title, Icon, List, ListItem, Fab, Item, Input, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class App extends Component {
    state = {
        newList : ''
    }

  render() {
    this.props.navigation.setOptions({
        title: "TODO APP",
        headerStyle: {
            backgroundColor: 'blue',
        }, 
        headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center'
    })

    return (
      <Container>
        <Form style={{flex:1}}>
            <Content style={{padding: 6}}>
                <Text>To Do</Text>
                <Item r style={{backgroundColor: '#ccc', marginTop: 5}}>
                    <Input placeholder="What to do?" 
                     onChangeText={(text) => this.setState({newList:text})}/>
                </Item>

            </Content>
        </Form>
            <Button success style={{justifyContent: 'center'}}
            onPress={() => this.props.navigation.navigate('ListData', {
                id: Math.floor(Math.random() * 100),
                list : this.state.newList,
            })}>
                <Text style={{color:'white'}}>ADD ITEM</Text>
            </Button>
                

      </Container>
    )
  }
}
