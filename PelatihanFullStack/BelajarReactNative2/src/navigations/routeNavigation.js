import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CreateStackNavigator, createStackNavigator } from '@react-navigation/stack';

import ListData from './../screens/ListData';
import AddData from './../screens/AddData';

const Stack = createStackNavigator();

function RouteNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="ListData" component={ListData} />
                <Stack.Screen name="AddData" component={AddData} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RouteNavigation;