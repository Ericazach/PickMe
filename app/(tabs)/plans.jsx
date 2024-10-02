import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Screen } from "../../components/Screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, deleteActivity } from "../../lib/appwrite";
import { router } from "expo-router";
import { icons } from "../../constants";
import * as Animatable from "react-native-animatable";

const Plans = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
  const [refreshing, setRefreshing] = useState(false);
  const [animatedIndex, setAnimatedIndex] = useState(0);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleDelete = async (activityId) => {
    Alert.alert(
      "Wait, are you sure?",
      "Do you want to ditch this awesome plan?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteActivity(activityId);
              const updatedPosts = posts.filter(
                (post) => post.$id !== activityId
              );
              refetch(updatedPosts);
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    if (animatedIndex < posts.length) {
      const timeout = setTimeout(() => {
        setAnimatedIndex(animatedIndex + 1);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [animatedIndex, posts.length]);

  return (
    <Screen>
      <SafeAreaView className="h-full">
        <View className="h-full">
          <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item, index }) => {
              const isAnimated = index <= animatedIndex;
              return (
                <View className="px-4">
                  <Animatable.View
                    animation={isAnimated ? "fadeInDown" : undefined}
                    duration={1000}
                    style={{ opacity: isAnimated ? 1 : 0 }}
                  >
                    <TouchableOpacity
                      className="flex-row justify-between px-4 py-4 my-2 bg-black-200 rounded-2xl border border-gray-600"
                      onPress={() => router.push(`/${item.$id}`)}
                    >
                      <Text className="text-2xl px-2 self-center mt-5 mb-4 text-gray-200 font-playwrite">
                        {item?.title}
                      </Text>
                      <TouchableOpacity className="flex-row gap-2">
                        <TouchableOpacity
                          onPress={() =>
                            router.push(`/edit-Activity/${item.$id}`)
                          }
                          className="self-center"
                        >
                          <Image
                            source={icons.edit}
                            resizeMode="contain"
                            className="w-10 h-10"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleDelete(item.$id)}
                          className="self-center"
                        >
                          <Image
                            source={icons.trash}
                            resizeMode="contain"
                            className="w-10 h-10"
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </Animatable.View>
                </View>
              );
            }}
            ListHeaderComponent={
              <View className="px-4 mt-7 mb-7">
                <Text className="text-[55px] text-center text-gray-100 font-caveat">
                  Plans!
                </Text>
              </View>
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default Plans;
