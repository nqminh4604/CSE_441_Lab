import "./src/gesture-handler.native";
import { NavigationContainer } from "@react-navigation/native";
import AddScreen from "./src/Add";
import Home from "./src/Home";
import LoginScreen from "./src/Login"
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppTheme } from "./src/store";
import Transaction from "./src/Transaction";
import Customer from "./src/Customer";
import Setting from "./src/Setting";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailService from "./src/DetailService";
import { MenuProvider } from "react-native-popup-menu";
import UpdateScreen from "./src/Update";
import { PopupMenu } from "./src/PopupMenu";

export default App = () => {

  const Tab = createBottomTabNavigator();
  const HomeScreen = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: AppTheme.colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: AppTheme.colors.primary,
        }}>

        <Tab.Screen name="Home" component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />),
          }} />
        <Tab.Screen name="Transaction" component={Transaction}
          options={{
            tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="cash-multiple" color={color} size={size} />),
          }} />
        <Tab.Screen name="Customer" component={Customer}
          options={{
            tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-supervisor" color={color} size={size} />),
          }} />
        <Tab.Screen name="Setting" component={Setting}
          options={{
            tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="cog-outline" color={color} size={size} />),
          }} />
      </Tab.Navigator>
    );
  }

  const Stack = createStackNavigator();
  const StackNavigation = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: AppTheme.colors.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Service" component={AddScreen} />
          <Stack.Screen name="Update" component={UpdateScreen} />
          <Stack.Screen name="Service Detail" component={DetailService} options={({ route, navigation }) => ({
            headerRight: () => (
              <PopupMenu route={route} navigation={navigation} />
            ),
          })} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <MenuProvider>
      <StackNavigation></StackNavigation>
    </MenuProvider>
  );

}