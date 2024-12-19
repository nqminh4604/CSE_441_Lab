import "./src/gesture-handler.native";
import { NavigationContainer } from "@react-navigation/native";
import AddScreen from "./src/AddService";
import Home from "./src/Home";
import LoginScreen from "./src/Login"
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppTheme } from "./src/store";
import Transaction from "./src/Transaction";
import Customer from "./src/Customer";
import Setting from "./src/Setting";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailService from "./src/ServiceDetails";
import { MenuProvider } from "react-native-popup-menu";
import UpdateScreen from "./src/ServiceUpdate";
import { PopupMenu } from "./src/ServicePopupMenu";
import AddCustomer from "./src/AddCustomer";
import TransactionDetail from "./src/TransactionDetails";
import { IconButton } from "react-native-paper";
import { LogBox, TouchableOpacity } from "react-native";
import CustomerDetail from "./src/CustomerDetails";
import CustomerPopupMenu from "./src/CustomerPopupMenu";
import CustomerUpdateScreen from "./src/CustomerUpdate";
import AddTransaction from "./src/AddTransaction";

export default App = () => {

  LogBox.ignoreLogs(['Warning: ...']); // Replace with the warning message you want to ignore

  // Ignore all warnings (not recommended for debugging)
  LogBox.ignoreAllLogs(true);
  
  const Stack = createStackNavigator();
  const HomeStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: AppTheme.colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}>

        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Service" component={AddScreen} />
        <Stack.Screen name="Update" component={UpdateScreen} />
        <Stack.Screen name="Service Detail" component={DetailService} options={({ route, navigation }) => ({
          headerRight: () => (
            <PopupMenu route={route} navigation={navigation} />
          ),
        })} />
      </Stack.Navigator>
    )
  }

  const CustomerStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Customer"
        screenOptions={{
          headerStyle: { backgroundColor: AppTheme.colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}>

        <Stack.Screen name="Customer" component={Customer} options={{ headerLeft: () => null }} />
        <Stack.Screen name="Add Customer" component={AddCustomer} />
        <Stack.Screen name="Edit Customer" component={CustomerUpdateScreen} />
        <Stack.Screen name="Detail Customer" component={CustomerDetail} options={({ route, navigation }) => ({
          headerRight: () => (
            <CustomerPopupMenu route={route} navigation={navigation} />
          ),
        })

        } />
        <Stack.Screen name="Transaction Detail" component={TransactionDetail} options={{
          headerRight: () => {
            return (
              <TouchableOpacity>
                <IconButton icon="dots-vertical" iconColor="#FFF" size={30} />
              </TouchableOpacity>
            )
          }
        }} />
      </Stack.Navigator>
    )
  }

  const TransactionStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Transaction"
        screenOptions={{
          headerStyle: { backgroundColor: AppTheme.colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}>
        <Stack.Screen name="Transaction" component={Transaction} options={{ headerLeft: () => null }} />
        <Stack.Screen name="Add Transaction" component={AddTransaction} />
        <Stack.Screen name="Transaction Detail" component={TransactionDetail} options={{
          headerRight: () => {
            return (
              <TouchableOpacity>
                <IconButton icon="dots-vertical" iconColor="#FFF" size={30} />
              </TouchableOpacity>
            )
          }
        }} />
      </Stack.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();
  const MainTabScreen = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: AppTheme.colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarActiveTintColor: AppTheme.colors.primary,
        }}>

        <Tab.Screen name="Home" component={HomeStack}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />),
          }} />
        <Tab.Screen name="Transaction" component={TransactionStack}
          options={{
            tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="cash-multiple" color={color} size={size} />),
            headerShown: false,
          }} />
        <Tab.Screen name="Customer" component={CustomerStack}
          options={{
            tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-supervisor" color={color} size={size} />),
            headerShown: false,
          }} />
        <Tab.Screen name="Setting" component={Setting}
          options={{
            tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="cog-outline" color={color} size={size} />),
          }} />
      </Tab.Navigator>
    );
  }

  const StackNavigation = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: AppTheme.colors.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            headerShown: false
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainTabScreen} />
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