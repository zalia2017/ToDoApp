import React, { Component } from 'react';
import {View, Text} from 'react-native';


class Button extends Component {
    render(){
        return (
            <View style={{backgroundColor:'blue',color:'white',padding:5}}>
                <Text>{this.props.title}</Text>
            </View>
        )
    }
}

export default Button;