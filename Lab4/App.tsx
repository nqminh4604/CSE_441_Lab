import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Contacts from "./src/Contact";
import ProfileContact from "./src/ProfileContact";
import Favorites from "./src/Favorites";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Provider } from "react-redux";
import Store from "./src/store";

const Stack = createStackNavigator();

const ContactScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={
        {
          headerShown: true
        }
      }>
      <Stack.Screen
        name="Contacts" component={Contacts}
        options={{ title: "Contacts" }} />

      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: "Profile Contact" }}
      />
    </Stack.Navigator>
  );
}

const favoriteScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"
      screenOptions={
        {
          headerShown: true
        }
      }>
      <Stack.Screen
        name="Favorites" component={Favorites}
        options={{ title: "Favorites" }} />

      <Stack.Screen
        name="ProfileContact"
        component={ProfileContact}
        options={{ title: "Profile Contact" }}
      />
    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="ContactScreen"
      barStyle={{ backgroundColor: "blue" }}
      labeled={false}
      activeColor={"greyLight"}
      inactiveColor={"greyDark"}
    >
      <Tab.Screen
        name="Contacts"
        component={ContactScreen}
        options={{
          tabBarIcon: "star-check"
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <TabNavigator></TabNavigator>
      </NavigationContainer>
    </Provider>
  );
}