import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import useAppwrite from '../lib/useAppwrite';
import { getActivityById } from '../lib/appwrite';
import { useEffect } from 'react';
import { Screen } from '../components/Screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from "../components/CustomButton";

const ItemDetail = () => {
  const { id } = useLocalSearchParams()
  const { data: post, refetch } = useAppwrite(() => getActivityById(id));

  // useEffect(() => {
  //   refetch();
  // }, [id]);

  return (
    <Screen>
      <SafeAreaView className="">
        <ScrollView>
          <Text className="self-center text-3xl uppercase text-gray-400 font-pextrabold">
            Ready, Set, Select!
          </Text>
          <View className="w-full px-4">
            <Text className="text-2xl self-center uppercase mt-10 mb-4 text-gray-100 font-pbold">
              {post?.title}
            </Text>

            <CustomButton
              title={post?.activity1}
              customStyles="border-[1px] border-[#FF3864] py-7 mt-5"
              customStylesText="text-2xl text-gray-400 font-psemibold "
              onPress={() => { }}
            />
            <CustomButton
              title={post?.activity2}
              customStyles="border-[1px] border-[#F39C6B] my-5 py-7"
              customStylesText="text-2xl text-gray-400 font-psemibold "
              onPress={() => { }}
            />
            <CustomButton
              title={post?.activity3}
              customStyles="border-[1px] border-[#CC978E]  py-7 mt-3"
              customStylesText="text-2xl text-gray-400 font-psemibold "
              onPress={() => { }}
            />
            <CustomButton
              title="Seal the deal!"
              onPress={() => router.push("/star")}
              customStyles={"mt-10 bg-[#387180]"}
              customStylesText="font-pbold uppercase"
            />
            <CustomButton
              title="Back to home"
              onPress={() => router.push("/home")}
              customStyles={"mt-4 bg-gray-400"}
              customStylesText="font-pbold uppercase"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

export default ItemDetail;