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

import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route, navigation }) {
  console.log('route:', route);
  const location = route.params.location;
  const { latitude = 49.411424, longitude = 26.990793 } = location;

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
        <Marker coordinate={{ latitude, longitude }} />
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
