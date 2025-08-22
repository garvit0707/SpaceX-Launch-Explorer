import React, {FC} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen';
import DetailedScreen from '../screens/DetailedScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import UserDetails from '../CRUD/UserDetails';
import AddUser from '../CRUD/AddUser';
import EditUser from '../CRUD/EditUser';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
         <Stack.Navigator initialRouteName='addUser' screenOptions={{headerShown:false}}>
            <Stack.Screen name = "detailedUser" component={UserDetails}/>
            <Stack.Screen name = "addUser" component={AddUser}/>
            <Stack.Screen name = "editUser" component={EditUser}/>
            <Stack.Screen name='splash' component={SplashScreen} />
            <Stack.Screen name = "list" component={ListScreen} />
            <Stack.Screen name = "detailed" component={DetailedScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;
