import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Animated,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  const api = {
    key: "dc764666f1bd7d701e63ecd7a7950769",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  const [query, setQuery] = useState("");
  interface WeatherData {
    name?: string;
    sys?: {
      country?: string;
    };
    main?: {
      temp?: number;
    };
    weather?: {
      description?: string;
      icon?: string;
      main?: string;
    }[];
  }

  const [weather, setWeather] = useState<WeatherData>({});
  const search = () => {
    // Trim whitespace and check if query is empty
    if (!query.trim()) {
      console.log("No query entered"); // Log message if input is empty
      return; // Exit function early
    }
    // Fetch weather data from OpenWeather API using user-entered query
    fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then((res) => res.json()) //Convert response to JSON
      .then((result) => {
        console.log("Weather API response:", result); // Log API response
        setWeather(result); // Store retrieved weather data in state
        setQuery(""); // Clear input field after search
      })
      .catch((error) => console.error("Error fetching weather:", error)); // Log any errors
  };

  const dateBuilder = (d: any) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  const [isFocused, setIsFocused] = useState(false);

  const backgroundImage =
    weather.main?.temp && weather.main.temp > 70
      ? require("../assets/images/warmImage.jpg")
      : require("../assets/images/coldImage.jpg");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={backgroundImage}
          style={styles.imageBackground}
        >
          <View style={styles.overlay} />
          <TextInput
            style={[styles.searchBar, isFocused && styles.inputFocused]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search city state or zip"
            onChangeText={(e) => setQuery(e)}
            value={query}
            returnKeyType="done"
            onSubmitEditing={search}
          />
          {typeof weather.main != "undefined" ? (
            <View>
              <View style={styles.locationContainer}>
                <Text style={styles.location}>
                  {weather.name}, {weather.sys?.country}
                </Text>
                <Text style={styles.date}>{dateBuilder(new Date())}</Text>
              </View>
              <View style={styles.weatherContainer}>
                <Text style={styles.temp}>
                  {Math.round(weather.main.temp ?? 0)}°f
                </Text>
                <Text style={styles.weather}>{weather.weather?.[0]?.main}</Text>
              </View>
            </View>
          ) : (
            ""
          )}
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "center",
  },
  searchBar: {
    height: 50,
    width: "90%",
    //borderWidth: 2,
    //borderColor: "black",
    textAlignVertical: "top",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    boxShadow: "0 5px rgba(0, 0, 0, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  inputFocused: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    opacity: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  locationContainer: {},
  location: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  date: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  weatherContainer: {
    alignItems: "center",
  },
  temp: {
    position: "relative",
    margin: 30,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 16,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    color: "white",
    fontSize: 100,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    boxShadow: "3px 6px rgba(0, 0, 0, 0.2)",
  },
  weather: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

//Set TextInput as a controlled component
