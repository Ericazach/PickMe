import { useState, useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import useAppwrite from '../lib/useAppwrite';
import { getActivityById, deleteActivity } from '../lib/appwrite';
import { icons } from '../constants';
import { Screen } from '../components/Screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from "../components/CustomButton";
import * as Animatable from "react-native-animatable";

const ItemDetail = () => {
  const { id } = useLocalSearchParams();
  const { data: post } = useAppwrite(() => getActivityById(id));

  const [isDisabled, setIsDisabled] = useState(false);

  const activities = [
    post?.activity1,
    post?.activity2,
    post?.activity3,
  ];

  const activity1Ref = useRef(null);
  const activity2Ref = useRef(null);
  const activity3Ref = useRef(null);
  const pickBtn = useRef(null);

  const handlePick = async () => {
    setIsDisabled(true);

    await pickBtn.current?.flash(2000);

    const picked = activities[Math.floor(Math.random() * activities.length)];

    activity1Ref.current?.stopAnimation();
    activity2Ref.current?.stopAnimation();
    activity3Ref.current?.stopAnimation();

    if (picked === activities[0]) {
      await activity1Ref.current?.zoomIn(800);
      activity2Ref.current?.zoomOut(800);
      activity3Ref.current?.zoomOut(800);
    } else if (picked === activities[1]) {
      await activity2Ref.current?.zoomIn(800);
      activity1Ref.current?.zoomOut(800);
      activity3Ref.current?.zoomOut(800);
    } else if (picked === activities[2]) {
      await activity3Ref.current?.zoomIn(800);
      activity1Ref.current?.zoomOut(800);
      activity2Ref.current?.zoomOut(800);
    }
  };

  const handleAgain = async () => {
    setIsDisabled(false);
    activity1Ref.current?.stopAnimation();
    activity2Ref.current?.stopAnimation();
    activity3Ref.current?.stopAnimation();
  };

  const handleDelete = async () => {
    Alert.alert(
      "Wait, are you sure?",
      "Do you want to ditch this awesome plan?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteActivity(id);
              router.push("/plans");
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          },
          style: "destructive",
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <Screen>
      <SafeAreaView>
        <ScrollView>
          <Text className="self-center text-[55px] text-gray-200 font-caveat">
            Ready, Set, Pick...
          </Text>
          <View className="w-full mt-7 px-4">
            <View className="flex-row justify-between">
              <Text className="text-[33px] px-2 self-center mt-5 mb-4 text-gray-100 font-playwrite">
                {post?.title}
              </Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => router.push(`/edit-Activity/${post.$id}`)}
                  className="self-center"
                >
                  <Image
                    source={icons.edit}
                    resizeMode="contain"
                    className="w-10 h-10"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDelete}
                  className="self-center"
                >
                  <Image
                    source={icons.trash}
                    resizeMode="contain"
                    className="w-10 h-10"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/plans")}
                  className="self-center"
                >
                  <Image
                    source={icons.back}
                    resizeMode="contain"
                    className="w-10 h-10"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Animatable.View ref={activity1Ref}>
              <CustomButton
                title={post?.activity1}
                customStyles="border-[1px] border-[#FF3864] py-7 mt-5"
                customStylesText="text-2xl text-gray-400 font-medium"
                onPress={() => { }}
              />
            </Animatable.View>
            <Animatable.View ref={activity2Ref}>
              <CustomButton
                title={post?.activity2}
                customStyles="border-[1px] border-[#F39C6B] my-5 py-7"
                customStylesText="text-2xl text-gray-400 font-medium"
                onPress={() => { }}
              />
            </Animatable.View>
            <Animatable.View ref={activity3Ref}>
              <CustomButton
                title={post?.activity3}
                customStyles="border-[1px] border-[#6073d1] py-7 mt-3"
                customStylesText="text-2xl text-gray-400 font-medium"
                onPress={() => { }}
              />
            </Animatable.View>

            <View className="flex-row justify-evenly items-center">
              <Animatable.View ref={pickBtn}>
                <TouchableOpacity
                  onPress={handlePick}
                  disabled={isDisabled}
                  className={`${isDisabled ? 'opacity-20' : ''}`}
                >
                  <Image
                    source={icons.pick}
                    resizeMode="contain"
                    className="w-28 h-28 mt-8"
                  />
                </TouchableOpacity>
              </Animatable.View>
              <TouchableOpacity
                onPress={handleAgain}
              >
                <Image
                  source={icons.again}
                  resizeMode="contain"
                  className="w-[130px] h-[130px] mt-8"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

export default ItemDetail;