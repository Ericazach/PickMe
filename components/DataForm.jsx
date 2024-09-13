import { Text, View } from "react-native";
import React from "react";

const DataForm = ({ title, text }) => {
  return (
    <View className="w-full">
      <Text className="text-base text-gray-100 mx-1 mt-4 font-pmedium">
        {title}
      </Text>
      <View className="w-full h-16 px-4 bg-black-200 rounded-2xl justify-center">
        <Text className="text-white tracking-widest text-xl">{text}</Text>
      </View>
    </View>
  );
};

export default DataForm;
