import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Container, Header, Left, Body, Right, Title, Icon } from 'native-base';
import Button from './src/components/Button';

export default class Quiz1 extends Component {
  state = {
    title : 'Saat mengirim, teks disini harus berubah sesuai apa yang dikirimkan',
    value :''
  }
  handleClick () {
    this.setState({
      title: this.state.value,
      value:''
    });
  }
  render() {
    return (
      <View style={{flex:1}}>
        <Container>
        <Header>
          <Left>
              <Icon name='home' style={{color:'white'}}/>
            </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
      </Container>
        {/* <View style={{flex:6, justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:'gray', textAlign:'center'}}>{this.state.title}</Text>
        </View>
        
        <View style={{height: 50, flexDirection: "row"}}>
          <TextInput 
          style={{flex:5, backgroundColor:'#ccc'}} 
          placeholder="Type Here..."
          value={this.state.value}
          onChangeText={(text1) => this.setState({value:text1})}/>
          <Button title="Send" style={{flex:1}} onPress={()=>this.handleClick()}/>
        </View> */}
      </View>
    )
  }
}

