import { View, Text, ScrollView, Alert } from "react-native";
import { Screen } from "../../components/Screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from "../../components/FormField";
import { CustomButton } from "../../components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { editActivity } from "../../lib/appwrite";
import { getActivityById } from '../../lib/appwrite';
import useAppwrite from "../../lib/useAppwrite";

export default function editPlan() {
  const { user } = useGlobalContext();
  const { id } = useLocalSearchParams();
  const { data: post } = useAppwrite(() => getActivityById(id));
  const [form, setForm] = useState({
    title: "",
    planOne: "",
    planTwo: "",
    planThree: "",
  });
  const handleSubmit = async () => {
    if (
      (form.title === "") |
      (form.planOne === "") |
      (form.planTwo === "") |
      (form.planThree === "")
    ) {
      return Alert.alert("Please provide all fields");
    }

    try {
      await editActivity({
        ...form,
        documentId: id,
      });
      Alert.alert("Success", "Post edited successfully");
      router.push("/profile");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        planOne: "",
        planTwo: "",
        planThree: "",
      });
    }
  };

  return (
    <Screen>
      <SafeAreaView>
        <ScrollView className="px-4 ">
          <Text className="text-3xl my-5 mb-10 uppercase text-gray-400 font-pextrabold">
            Edit your plan
          </Text>
          <Text className="text-xl text-white font-pbold">Mission title?</Text>
          <FormField
            title=""
            value={form.title}
            placeholder={post?.title}
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles="mb-4"
          />

          <Text className="text-xl text-white font-pbold mt-3 ">
            Adventures
          </Text>
          <Text className="text-sm text-gray-100 font-pregular ">
            minimum of three adventures
          </Text>
          <FormField
            title=""
            value={form.planOne}
            placeholder={post.activity1}
            handleChangeText={(e) => setForm({ ...form, planOne: e })}
            otherStyles="mb-4"
          />
          <FormField
            title=""
            value={form.planTwo}
            placeholder={post.activity2}
            handleChangeText={(e) => setForm({ ...form, planTwo: e })}
            otherStyles="mb-4"
          />
          <FormField
            title=""
            value={form.planThree}
            placeholder={post.activity3}
            handleChangeText={(e) => setForm({ ...form, planThree: e })}
            otherStyles="mb-4"
          />
          <View className="flex-row mt-4 justify-evenly">
            <CustomButton
              title="Edit it!"
              onPress={handleSubmit}
              customStyles={"bg-[#387180] mx-1 grow border-b-4 border-r-4 border-gray-700"}
              customStylesText="font-pbold uppercase"
            />
            <CustomButton
              title="Back!"
              onPress={() => router.push("/profile")}
              customStyles={"bg-gray-400 mx-1 grow border-b-4 border-r-4 border-gray-700"}
              customStylesText="font-pbold uppercase"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}
