import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import Login from './../screens/Login';
import Register from './../screens/Register';
import Dashboard from './../screens/Dashboard';
import DetailItem from '../screens/DetailItem';
import AddItem from './../screens/AddItem';
import AddHistory from '../screens/AddHistory';
import ScanQR from '../screens/ScanQR';





const Stack = createStackNavigator();

export default function RouteNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Login"}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="DetailItem" component={DetailItem} />
                <Stack.Screen name="AddItem" component={AddItem} />
                <Stack.Screen name="AddHistory" component={AddHistory} />
                <Stack.Screen name="ScanQR" component={ScanQR} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}
