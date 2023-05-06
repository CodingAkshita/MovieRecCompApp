/* This is a React Native component that fetches and displays recommended movies using data from an
API. */


/* These lines of code are importing necessary modules and libraries for the React Native component. */
import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";


export default class RecommendedMoviesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  timeConvert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return `${hours} hrs ${minutes} mins`;
  }

  /* `getData` is a method that is used to fetch data from an API endpoint. It sends a GET request to
  the specified URL using the `axios` library. If the request is successful, the response data is
  stored in the component's state using `setState`. If there is an error, the error message is logged
  to the console. */
  getData = () => {
    const url = "http://localhost:5000/recommended-movies";
    axios
      .get(url)
      .then(async response => {
        this.setState({ data: response.data.data });
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  /* `keyExtractor` is a function that is used to extract a unique key for each item in the `FlatList`
  component. In this case, it takes in two parameters, `item` and `index`, and returns the `index` of
  the item as a string. This is necessary because React requires a unique key for each item in a list
  to help with efficient rendering and updating of the list. By default, React uses the index of each
  item as its key, but this can cause issues if the order of the items changes or if items are added
  or removed from the list. By providing a custom `keyExtractor` function, we can ensure that each
  item has a unique and stable key that will not change even if the order of the items changes. */
  keyExtractor = (item, index) => index.toString();

/* `renderItems` is a function that takes in an object with `item` and `index` properties as its
argument. It returns a `Card` component from the `react-native-elements` library that displays an
image, a title, and a subtitle for each item in the `data` array. The `key` prop is used to uniquely
identify each card. The `image` prop specifies the image to be displayed on the card, and the
`imageProps` prop specifies how the image should be resized. The `featuredTitle` prop specifies the
title to be displayed on the card, and the `featuredTitleStyle` prop specifies the style of the
title. The `featuredSubtitle` prop specifies the subtitle to be displayed on the card, and the
`featuredSubtitleStyle` prop specifies the style of the subtitle. The `containerStyle` prop
specifies the style of the card container. The `item.release_date.split("-")[0]` and
`this.timeConvert(item.duration)` are used to format the subtitle text. This function is used as the
`renderItem` prop for the `FlatList` component in the `render` method of the
`RecommendedMoviesScreen` component. */
  renderItems = ({ item, index }) => {
    return (
      /* This code is rendering a `Card` component from the `react-native-elements` library. The `Card`
      component displays an image, a title, and a subtitle for each item in the `data` array. The
      `key` prop is used to uniquely identify each card. The `image` prop specifies the image to be
      displayed on the card, and the `imageProps` prop specifies how the image should be resized.
      The `featuredTitle` prop specifies the title to be displayed on the card, and the
      `featuredTitleStyle` prop specifies the style of the title. The `featuredSubtitle` prop
      specifies the subtitle to be displayed on the card, and the `featuredSubtitleStyle` prop
      specifies the style of the subtitle. The `containerStyle` prop specifies the style of the card
      container. The `item.release_date.split("-")[0]` and `this.timeConvert(item.duration)` are
      used to format the subtitle text. */
      <Card
        key={`card-${index}`}
        image={{ uri: item.poster_link }}
        imageProps={{ resizeMode: "cover" }}
        featuredTitle={item.title}
        containerStyle={styles.cardContainer}
        featuredTitleStyle={styles.title}
        featuredSubtitle={`${item.release_date.split("-")[0]
          } | ${this.timeConvert(item.duration)}`}
        featuredSubtitleStyle={styles.subtitle}
      ></Card>
    );
  };

  /**
   * This is a render function that returns a FlatList component with data and render items.
   * @returns A component that renders a container View with a FlatList inside it. The FlatList is
   * populated with data from the component's state, and each item is rendered using the `renderItems`
   * function. The `keyExtractor` function is used to extract a unique key for each item in the list.
   */
  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
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
