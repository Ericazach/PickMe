import { ScrollView, Text, View } from "react-native";
import React from "react";
import { Screen } from "../../components/Screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton } from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts } from "../../lib/appwrite";
import { router } from "expo-router";

const Plans = () => {
  const { user } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  return (
    <Screen>
      <SafeAreaView className="">
        <ScrollView>
          <Text className="self-center text-3xl uppercase text-gray-400 font-pextrabold mt-10">
            Ready, Set, Select!
          </Text>
          <View className="w-full px-4 mt-10">
            <Text className="text-2xl self-center uppercase mt-10 mb-4 text-gray-100 font-pbold">
              {posts?.[1]?.title}
            </Text>

            <CustomButton
              title={posts?.[0]?.activity1}
              customStyles="border-[1px] border-[#FF3864] py-7 mt-5"
              customStylesText="text-2xl text-gray-400 font-psemibold "
              onPress={() => {}}
            />
            <CustomButton
              title={posts?.[0]?.activity2}
              customStyles="border-[1px] border-[#F39C6B] my-5 py-7"
              customStylesText="text-2xl text-gray-400 font-psemibold "
              onPress={() => {}}
            />
            <CustomButton
              title={posts?.[0]?.activity3}
              customStyles="border-[1px] border-[#CC978E]  py-7 mt-3"
              customStylesText="text-2xl text-gray-400 font-psemibold "
              onPress={() => {}}
            />
            <CustomButton
              title="Seal the deal!"
              onPress={() => router.push("/star")}
              customStyles={"mt-10 bg-[#387180]"}
              customStylesText="font-pbold uppercase"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
};

export default Plans;
