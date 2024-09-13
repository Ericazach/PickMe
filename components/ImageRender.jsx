import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";

import { images } from "../constants";

const imagesArr = [
  {
    id: "1",
    uri: images.waterfall,
  },
  {
    id: "2",
    uri: images.city,
  },
  {
    id: "3",
    uri: images.bike,
  },
  {
    id: "4",
    uri: images.metro,
  },
  {
    id: "5",
    uri: images.bar,
  },
];

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.8,
  },
};

const ImageRender = () => {
  const [activeItem, setActiveItem] = useState(imagesArr[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <View>
      <FlatList
        data={imagesArr}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Animatable.View
              animation={activeItem === item.id ? zoomIn : zoomOut}
              duration={500}
            >
              <Image
                className="w-60 h-96 rounded-[33px] mt-3 bg-white/10"
                source={item.uri}
              />
            </Animatable.View>
          );
        }}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        contentOffset={{ x: 170 }}
        horizontal
      />
    </View>
  );
};

export default ImageRender;

const styles = StyleSheet.create({});
