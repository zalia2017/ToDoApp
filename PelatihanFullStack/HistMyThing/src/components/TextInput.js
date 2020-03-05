import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Label, Input, Item, Icon } from 'native-base'

const TextInput = (props) => {
    return (
        <View style={styles.sectionForm}>
           <Label style={styles.labelInput}>{props.label}</Label>
            <Item regular style={styles.itemInput}>
                <Input
                    {...props}
                    secureTextEntry={props.secureTextEntry}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    placeHolder={props.placeholder}
                    keyboardType={props.keyboardType}
                    placeholderTextColor={"#747D8C"}
                    style={styles.input} />
                {props.password ?
                    props.secureTextEntry ?
                        <Icon active
                            onPress={props.changeVisibility}
                            type="MaterialIcons"
                            name="visibility-off"
                            style={styles.iconEye} />
                        :
                        <Icon active
                            onPress={props.changeVisibility}
                            type="MaterialIcons"
                            name="visibility"
                            style={styles.iconEye} />
                    :
                    null
                }
            </Item>
        </View>
    )
}

export default TextInput

const styles = StyleSheet.create({
    sectionForm: {
        paddingVertical: 5
    },
    labelInput: {
        fontSize: 'Poppins-Medium',
        fontSize: 14,
        lineHeight: 18,
        color: '#7d7f85',
        marginBottom: 6
    },
    itemInput: {
        backgroundColor: '#F1F2F6',
        borderColor: 'transparent',
        borderRadius: 4
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
        borderColor: '#7d7f85'
    },
    iconEye: {
        paddingRight: 16,
        fontSize: 16,
        color: 'black'
    }
})