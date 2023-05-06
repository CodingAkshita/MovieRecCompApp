/**
 * This is a React Native app that creates a stack navigator with a top tab navigation for recommended
 * and popular movies.
 * @returns The `App` function is returning the `AppContainer` component, which is created using the
 * `createAppContainer` function from `react-navigation` and passing in the `AppStackNavigator`
 * component as its argument. The `AppStackNavigator` component is a stack navigator that defines the
 * navigation structure of the app, including the screens and their respective options.
 */


//importing all the necessary packages
/* These lines of code are importing necessary packages and components for the React Native app. */
import React from "react";
import HomeScreen from "./screens/Home";
import RecommendedMoviesScreen from "./screens/Recommendation";
import PopularMoviesScreen from "./screens/Popular";

/* `import { createAppContainer } from
"react-navigation";` is importing the
`createAppContainer` function from the
`react-navigation` package. This function is
used to create a container component that wraps
the navigator component and provides it with the
necessary context and functionality to work with
the navigation system. The `createAppContainer`
function takes a navigator component as its
argument and returns a new component that can be
used as the root component of the app. */
import { createAppContainer } from "react-navigation";


/* `import { createStackNavigator } from "react-navigation-stack";` is importing the
`createStackNavigator` function from the `react-navigation-stack` package. This function is used to
create a stack navigator component that defines the navigation structure of the app, including the
screens and their respective options. The stack navigator allows the user to navigate between
screens by pushing and popping them onto and off of a stack. */
import { createStackNavigator } from "react-navigation-stack";

/* `import { createMaterialTopTabNavigator } from "react-navigation-tabs";` is importing the
`createMaterialTopTabNavigator` function from the `react-navigation-tabs` package. This function is
used to create a top tab navigator component that allows the user to switch between different
screens by tapping on tabs that are displayed at the top of the screen. The
`createMaterialTopTabNavigator` function takes an object as its argument that defines the screens
and their respective options, and returns a new component that can be used as a child component of a
stack navigator or other navigator component. */
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

/* `import { RFValue } from "react-native-responsive-fontsize";
It is importing the `RFValue`function from the `react-native-responsive-fontsize`
package. This function is used to calculate responsive fontsizes based on the device's
screen size and pixel density.It takes a numeric value as input and returns a calculatedfont size value that isappropriate for the device'sscreen size and pixel density.
This is useful for creatingresponsive UI designs that look good on different devices with varying screen sizes and
pixel densities. */
import { RFValue } from "react-native-responsive-fontsize";

/* The `export default function App() {` statement is defining a default export for a function
component named `App`. This function component returns the `AppContainer` component, which is
created using the `createAppContainer` function from `react-navigation` and passing in the
`AppStackNavigator` component as its argument. When this component is imported into other files, it
can be used as a regular component and rendered on the screen. */
export default function App() {
  /* `return <AppContainer />;` is returning the `AppContainer` component, which is created using the
  `createAppContainer` function from `react-navigation` and passing in the `AppStackNavigator`
  component as its argument. This component is the root component of the app and contains the
  navigation structure and screens defined in the `AppStackNavigator` component. When the app is
  rendered, the `AppContainer` component will be displayed on the screen and will provide the
  necessary context and functionality for the navigation system to work. */
  return <AppContainer />;
}

//Top navigation
/* `const AppTopNavigation` is creating a top tab navigator component using the
`createMaterialTopTabNavigator` function from the `react-navigation-tabs` package. The
`AppTopNavigation` component has two screens: `RecommendedMoviesScreen` and `PopularMoviesScreen`.
Each screen is defined as an object with a `screen` property that specifies the component to be
rendered for that screen, and a `navigationOptions` property that specifies the options for that
screen's tab in the top tab navigator. The `tabBarLabel` option sets the label for the tab, and the
`tabBarOptions` object sets the styling options for the tab, such as the background color, label
color, and indicator color. When the `AppTopNavigation` component is rendered, it will display the
two screens as tabs at the top of the screen, and the user can switch between them by tapping on the
tabs. */
const AppTopNavigation = createMaterialTopTabNavigator({
  RecommendedMovies: {
    screen: RecommendedMoviesScreen,
    navigationOptions: {
      tabBarLabel: "Recommended",
      tabBarOptions: {
        tabStyle: { backgroundColor: "#fff" },
        labelStyle: { color: "#000" },
        //when the button is activated,
        indicatorStyle: { backgroundColor: "#9EB9D4" }
      }
    }
  },
  PopularMovies: {
    screen: PopularMoviesScreen,
    navigationOptions: {
      tabBarLabel: "Popular",
      tabBarOptions: {
        tabStyle: { backgroundColor: "#fff" },
        labelStyle: { color: "#000" },
        indicatorStyle: { backgroundColor: "#9EB9D4" } 
      }
    }
  }
});

//creating a stack navigator
/* `const AppStackNavigator` is creating a stack navigator component using the `createStackNavigator`
function from the `react-navigation-stack` package. The `AppStackNavigator` component has two
screens: `HomeScreen` and `AppTopNavigation`. Each screen is defined as an object with a `screen`
property that specifies the component to be rendered for that screen, and a `navigationOptions`
property that specifies the options for that screen's header. The `initialRouteName` option sets the
initial screen to be displayed when the app is launched. When the `AppStackNavigator` component is
rendered, it will display the `HomeScreen` as the initial screen, and the `AppTopNavigation` screen
as a child screen that can be navigated to by pushing it onto the stack. */
const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    AppTopNav: {
      screen: AppTopNavigation,
      navigationOptions: {
        headerBackTitle: null,
        headerTintColor: "#fff",
        headerTitle: "Recommended Movies",
        headerStyle: {
          backgroundColor: "#d500f9"
        },
        headerTitleStyle: {
          color: "#fff",
          fontWeight: "bold",
          fontSize: RFValue(18)
        }
      }
    }
  },
  {
    // initial screen to display
    /* `initialRouteName: "Home"` is setting the initial screen to be displayed when the app is
    launched to the `Home` screen defined in the `AppStackNavigator` component. This means that when
    the app is opened, the first screen that the user will see is the `HomeScreen`. */
    initialRouteName: "Home"
  }
);

/* `const AppContainer = createAppContainer(AppStackNavigator);` is creating a container component for
the `AppStackNavigator` component using the `createAppContainer` function from the
`react-navigation` package. The `AppContainer` component provides the necessary context and
functionality for the navigation system to work with the `AppStackNavigator` component. When the
`AppContainer` component is rendered, it will display the screens and navigation structure defined
in the `AppStackNavigator` component. This line of code is essentially creating the root component
of the app that contains the navigation structure and screens. */
const AppContainer = createAppContainer(AppStackNavigator);
