import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { explorePage } from "./src/view/explorePage";
import { exploreByBank } from "./src/view/exploreByBank";
import { exploreByCategory } from "./src/view/exploreByCategory";
import { beginPage } from "./src/view/beginPage";
import { incomePage } from "./src/view/incomePage";
import { spendingPage } from "./src/view/spendingPage";
import { preferencePage } from "./src/view/preferencePage";
import { comparePage } from "./src/view/comparePage";
import { listPage } from "./src/view/listPage";
import { resultsPage } from "./src/view/resultsPage";
import { settings } from "./src/view/settings";
import { loginPage } from "./src/view/LoginPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";


import { firebaseConfig } from "./src/model/firebase";

firebase.initializeApp(firebaseConfig);

const Tabs = createBottomTabNavigator();
const exploreStack = createNativeStackNavigator();
const recommendStack = createNativeStackNavigator();
const compareStack = createNativeStackNavigator();

global.bank = "all";
global.type = "all";

global.results = [];
global.targetId = -1;

global.preference = "none";

global.currency = "NZD";
global.currencyRate = 1;

const exploreStackScreen = () => (
  <exploreStack.Navigator>
    <exploreStack.Screen name="Login" component={loginPage} />
    <exploreStack.Screen name="Explore - Home" component={explorePage} />
    <exploreStack.Screen
      name="Explore By Category"
      component={exploreByCategory}
    />
    <exploreStack.Screen name="Explore By Bank" component={exploreByBank} />
    <exploreStack.Screen name="List" component={listPage} />
    <exploreStack.Screen name="Results" component={resultsPage} />
  </exploreStack.Navigator>
);

const recommendStackScreen = () => (
  <recommendStack.Navigator>
    <recommendStack.Screen name="Recommend - Home" component={beginPage} />
    <recommendStack.Screen name="Recommend1" component={incomePage} />
    <recommendStack.Screen name="Recommend2" component={spendingPage} />
    <recommendStack.Screen name="Recommend3" component={preferencePage} />
    <recommendStack.Screen name="List" component={listPage} />
    <recommendStack.Screen name="Results" component={resultsPage} />
  </recommendStack.Navigator>
);

const compareStackScreen = () => (
  <compareStack.Navigator>
    <compareStack.Screen name="Compare - Home" component={comparePage} />
    <compareStack.Screen name="List" component={listPage} />
    <compareStack.Screen name="Results" component={resultsPage} />
  </compareStack.Navigator>
);

function App() {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        initialRouteName="Login"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Explore") {
              iconName = "search";
            } else if (route.name === "Recommend") {
              iconName = "ios-list";
            } else if (route.name === "Compare") {
              iconName = "copy";
            } else if (route.name === "Settings") {
              iconName = "settings";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#2A9DB2",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tabs.Screen
          name="Explore"
          component={exploreStackScreen}
          options={{ headerShown: false }}
        />
        <Tabs.Screen
          name="Recommend"
          component={recommendStackScreen}
          options={{ headerShown: false }}
        />
        <Tabs.Screen
          name="Compare"
          component={compareStackScreen}
          options={{ headerShown: false }}
        />
        <Tabs.Screen
          name="Settings"
          component={settings}
          options={{ headerShown: true }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

export default App;
