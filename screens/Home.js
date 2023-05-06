/* The HomeScreen class is a React component that displays movie details and allows the user to like,
dislike, or mark a movie as not watched. */
/* These lines of code are importing various modules and libraries that are required for the HomeScreen
component to function properly. */
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Header, AirbnbRating, Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import axios from "axios";

/* The `export default` keyword is used to export a single class, function, or object from a module as
the default export. In this case, it is exporting a React component class named `HomeScreen` that
extends the `Component` class from the `react` library. This component is used to display movie
details and allow the user to interact with the movie by liking, disliking, or marking it as not
watched. */
export default class HomeScreen extends Component {
  /**
   * This is a constructor function that initializes the state with an empty object for movieDetails.
   */
  constructor() {
    super();
    this.state = {
      movieDetails: {}
    };
  }

/**
 * This is a React component lifecycle method that calls the "getMovie" function when the component
 * mounts.
 */
  componentDidMount() {
    //first function to run
    this.getMovie();
  }

  //duration of each movie
  timeConvert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return `${hours} hrs ${minutes} mins`;
  }

  getMovie = () => {
    const url = "http://localhost:5000/get-movie";
    axios
      .get(url)
      .then(async response => {
/* `import { createStackNavigator } from "react-navigation-stack";` is importing the
`createStackNavigator` function from the `react-navigation-stack` package. This function is used to
create a stack navigator component that defines the navigation structure of the app, including the
screens and their respective options. The stack navigator allows the user to navigate between
screens by pushing and popping them onto and off of a stack. */
        let details = response.data.data;
        details["duration"] = this.timeConvert(details.duration);
        this.setState({ movieDetails: details });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

/* `likedMovie` is a method that sends a POST request to the server at the specified URL
(`http://localhost:5000/liked-movie`) to mark the current movie as liked. If the request is
successful, the `getMovie` method is called to fetch and display details of a new movie. If there is
an error, the error message is logged to the console. */
  likedMovie = () => {
    const url = "http://localhost:5000/liked-movie";
    axios
    //POST method
      .post(url)
      .then(response => {
        this.getMovie();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

 /* `unlikedMovie` is a method that sends a POST request to the server at the specified URL
 (`http://localhost:5000/unliked-movie`) to mark the current movie as unliked. If the request is
 successful, the `getMovie` method is called to fetch and display details of a new movie. If there
 is an error, the error message is logged to the console. */
  unlikedMovie = () => {
    const url = "http://localhost:5000/unliked-movie";
    axios
    //POST method
      .post(url)
      .then(response => {
        this.getMovie();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

 /* `notWatched` is a method that sends a POST request to the server at the specified URL
 (`http://localhost:5000/did-not-watch`) to mark the current movie as not watched. If the request is
 successful, the `getMovie` method is called to fetch and display details of a new movie. If there
 is an error, the error message is logged to the console. */
  notWatched = () => {
    const url = "http://localhost:5000/did-not-watch";
    axios
    //POST method
      .post(url)
      .then(response => {
        this.getMovie();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  render() {
    const { movieDetails } = this.state;
    if (movieDetails.poster_link) {
      //assigning the value of the constant
      const {
        poster_link,
        title,
        release_date,
        duration,
        overview,
        rating
      } = movieDetails;

      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            {/* The `<Header>` component is a part of the `react-native-elements` library and is used to
            create a header bar at the top of the screen.*/} 
            <Header
              centerComponent={{
                text: "Movies",
                style: styles.headerTitle
              }}
              rightComponent={{
                icon: "movie-open",
                color: "#fff",
                type: "material-community",
                onPress: () =>
                  this.props.navigation.navigate("RecommendedMovies")
              }}
              backgroundColor={"#d500f9"}
              containerStyle={{ flex: 1 }}
            />

          </View>

          <View style={styles.subContainer}>
            <View style={styles.subTopContainer}>
              <Image style={styles.posterImage} source={{ uri: poster_link }} />
            </View>
            
            <View style={styles.subBottomContainer}>
              
              <View style={styles.upperBottomContainer}>
                {/* This code is rendering two `<Text>` components with styles `title` and `subtitle`
                respectively. The first `<Text>` component displays the `title` of the movie, which
                is a property of the `movieDetails` object in the component's state. The second
                `<Text>` component displays the `release_date` and `duration` of the movie,
                separated by a `|` symbol. The `release_date` is split using the `-` symbol as a
                delimiter, and only the first element of the resulting array (which represents the
                year) is displayed. The `duration` is passed through a `timeConvert` function that
                converts the duration from minutes to hours and minutes format. */}
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{`${
                  release_date.split("-")[0]
                } | ${duration}`}</Text>
              </View>


              <View style={styles.middleBottomContainer}>
                <View style={{ flex: 0.3 }}>
                  {/* `<AirbnbRating>` is a component from the `react-native-elements` library that
                  displays a rating system using stars. It takes several props, including `count`
                  (the number of stars to display), `reviews` (an array of strings that represent
                  the labels for each star), `defaultRating` (the initial rating to display),
                  `isDisabled` (a boolean that determines whether the user can interact with the
                  rating system), `size` (the size of the stars), and `starContainerStyle` (a style
                  object that can be used to customize the container of the stars). In this code, it
                  is used to display the rating of the current movie, which is passed as the
                  `rating` prop. */}
                  <AirbnbRating
                    count={10}
                    reviews={["", "", "", "", ""]}
                    defaultRating={rating}
                    isDisabled={true}
                    size={RFValue(25)}
                    starContainerStyle={{ marginTop: -30 }}
                  />
                </View>

                <View style={{ flex: 0.7, padding: 15 }}>
                 {/* `<Text style={styles.overview}>{overview}</Text>` is rendering a `<Text>` component
                 with the style `overview` and displaying the `overview` property of the
                 `movieDetails` object in the component's state. The `overview` property is a brief
                summary or description of the movie. */}
                  <Text style={styles.overview}>{overview}</Text>
                </View>
              </View>


              <View style={styles.lowerBottomContainer}>
                <View style={styles.iconButtonContainer}>
                  {/* This code is rendering a `<TouchableOpacity>` component that wraps an `<Icon>`
                  component from the `react-native-elements` library. The `<TouchableOpacity>`
                  component is a touchable wrapper that can be used to detect user interactions,
                  such as taps, and trigger a function or action in response. In this case, the
                  `onPress` prop of the `<TouchableOpacity>` component is set to the `likedMovie`
                  method, which is called when the user taps on the component. The `<Icon>`
                  component is used to display a checkmark icon with a green color, and it is
                  wrapped in the `<TouchableOpacity>` component so that the `likedMovie` method is
                  called when the user taps on the icon. This code is part of the user interface for
                  the HomeScreen component, and it allows the user to like a movie by tapping on the
                  checkmark icon. */}
                  <TouchableOpacity onPress={this.likedMovie}>
                    <Icon
                      reverse
                      name={"check"}
                      type={"entypo"}
                      size={RFValue(30)}
                      color={"#76ff03"}
                    />
                  </TouchableOpacity>

                  
                  {/* The above code is rendering a TouchableOpacity component with an Icon component
                  inside it. When the TouchableOpacity is pressed, it will trigger the unlikedMovie
                  function. The Icon component has a reverse style, a name of "cross" from the
                  Entypo icon library, a size of 30 using the RFValue function, and a color of
                  #ff1744. This code is likely used in a React Native application to display a
                  button with a cross icon that allows the user to unlike or remove a movie from
                their list. */}
                  <TouchableOpacity onPress={this.unlikedMovie}>
                    <Icon
                      reverse
                      name={"cross"}
                      type={"entypo"}
                      size={RFValue(30)}
                      color={"#ff1744"}
                    />
                  </TouchableOpacity>

                </View>

                <View style={styles.buttonCotainer}>
                  {/* The above code is defining a TouchableOpacity component with a style and onPress
                  event handler. When the button is pressed, it will call the "notWatched" function.
              The button displays the text "Did not watch". */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={this.notWatched}
                  >
                    <Text style={styles.buttonText}>Did not watch</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerContainer: {
    flex: 0.1
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(18)
  },
  subContainer: {
    flex: 0.9
  },
  subTopContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  posterImage: {
    width: "60%",
    height: "90%",
    resizeMode: "stretch",
    borderRadius: RFValue(30),
    marginHorizontal: RFValue(10)
  },
  subBottomContainer: {
    flex: 0.6
  },
  upperBottomContainer: {
    flex: 0.2,
    alignItems: "center"
  },
  title: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    textAlign: "center"
  },
  subtitle: {
    fontSize: RFValue(14),
    fontWeight: "300"
  },
  middleBottomContainer: {
    flex: 0.35
  },
  overview: {
    fontSize: RFValue(13),
    textAlign: "center",
    fontWeight: "300",
    color: "gray"
  },
  lowerBottomContainer: {
    flex: 0.45
  },
  iconButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  buttonCotainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: RFValue(160),
    height: RFValue(50),
    borderRadius: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginTop: RFValue(15)
  },
  buttonText: {
    fontSize: RFValue(15),
    fontWeight: "bold"
  }
});
