/* The `PopularMoviesScreen` class is a React Native component that displays a list of popular movies
using data fetched from an API. */
/* These lines of code are importing necessary modules and libraries for the component to function
properly. */
import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

export default class PopularMoviesScreen extends Component {
  /**
   * This is a constructor function that initializes the state of a component with an empty array.
   * @param props - props is an object that contains properties passed down to a React component from
   * its parent component. These properties can be accessed within the component using the `this.props`
   * syntax. In the constructor, `props` is passed as a parameter to the `super()` method to initialize
   * the component's state.
   */
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

/**
 * The `componentDidMount()` function calls the `getData()` function.
 */
  componentDidMount() {
    this.getData();
  }

 /**
  * The function converts a given number of minutes into hours and minutes format.
  * @param num - The parameter "num" represents the total number of minutes that we want to convert
  * into hours and minutes format.
  * @returns a string that includes the number of hours and minutes converted from the input `num`. The
  * string has the format "X hrs Y mins", where X is the number of hours and Y is the number of
  * minutes.
  */
  timeConvert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return `${hours} hrs ${minutes} mins`;
  }

 /* `getData` is a function that makes an HTTP GET request to the URL
 "http://localhost:5000/popular-movies" using the `axios` library. If the request is successful, the
 response data is stored in the component's state using `setState`. If there is an error, the error
 message is logged to the console. */
  getData = () => {
    const url = "http://localhost:5000/popular-movies";
    axios
      .get(url)
      .then(async response => {
        this.setState({ data: response.data.data });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItems = ({ item, index }) => {
    return (
      /* This code is rendering a `Card` component from the `react-native-elements` library. The `Card`
      component is displaying information about a movie, including its poster image, title, release
      year, and duration. */
      <Card
        key={`card-${index}`}
        image={{ uri: item.poster_link }}
        imageProps={{ resizeMode: "cover" }}
        featuredTitle={item.title}
        containerStyle={styles.cardContainer}
        featuredTitleStyle={styles.title}
        featuredSubtitle={`${
          //We display the year only(the first element)
          item.release_date.split("-")[0] 
        } | ${this.timeConvert(item.duration)}`}
        featuredSubtitleStyle={styles.subtitle}
      ></Card>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
       {/* `<FlatList>` is a component in React Native that renders a scrollable list of items. In this
        code, it is being used to display a list of popular movies. */}
        <FlatList
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItems}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  title: {
    color: "#fff",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(25),
    marginTop: RFValue(65)
  },
  subtitle: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(15)
  },
  cardContainer: {
    flex: 1,
    borderRadius: RFValue(10),
    justifyContent: "center",
    height: RFValue(110),
    marginBottom: RFValue(20)
  }
});
