// import React from 'react';
// import { Text, View } from 'react-native';

// const MapScreen = () => {
//   return (
//     <View>
//       <Text>MapScreen</Text>
//     </View>
//   );
// };

// export default MapScreen;
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
// import { Ionicons } from "@expo/vector-icons";

export default function MapScreen({ route, navigation }) {
  console.log('route:', route);
  const { latitude, longitude } = route.params.location;

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          // styles for router MainTab.Navigator !!!
          height: 83,
          paddingTop: 9,
          paddingBottom: 34,
          paddingHorizontal: 82,
        },
      });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          //   key={index}
          coordinate={{ latitude: latitude, longitude: longitude }}
          //   title={marker.title}
          //   description={marker.description}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  map: {
    width: '100%',
    height: '100%',
  },
});
