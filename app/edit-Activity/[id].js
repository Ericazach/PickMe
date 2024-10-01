import { View, Text, ScrollView, Alert } from "react-native";
import { Screen } from "../../components/Screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from "../../components/FormField";
import { CustomButton } from "../../components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { editActivity } from "../../lib/appwrite";
import { getActivityById } from '../../lib/appwrite';
import useAppwrite from "../../lib/useAppwrite";

export default function EditPlan() {
  const { user } = useGlobalContext();
  const { id } = useLocalSearchParams();
  const { data: post } = useAppwrite(() => getActivityById(id));


  const [form, setForm] = useState({
    title: "",
    planOne: "",
    planTwo: "",
    planThree: "",
  });


  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || "",
        planOne: post.activity1 || "",
        planTwo: post.activity2 || "",
        planThree: post.activity3 || "",
      });
    }
  }, [post]);

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.planOne ||
      !form.planTwo ||
      !form.planThree
    ) {
      return Alert.alert("Please provide all fields");
    }

    try {
      await editActivity({
        ...form,
        documentId: id,
      });
      Alert.alert("Success", "Post edited successfully");
      router.push("/plans");
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
        <ScrollView className="px-4">
          <Text className="text-[45px] my-5 mb-10  text-gray-200 font-caveat">
            Customize your journey!
          </Text>

          <Text className="text-xl text-white font-playwrite">Mission title?</Text>
          <FormField
            title=""
            value={form.title}
            placeholder="Enter the title"
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles="mb-4"
          />

          <Text className="text-xl text-white font-playwrite  mt-3">Adventures</Text>
          <Text className="text-sm text-gray-100 font-pregular">
            Minimum of three adventures
          </Text>

          <FormField
            title=""
            value={form.planOne}
            placeholder="First adventure"
            handleChangeText={(e) => setForm({ ...form, planOne: e })}
            otherStyles="mb-4"
          />

          <FormField
            title=""
            value={form.planTwo}
            placeholder="Second adventure"
            handleChangeText={(e) => setForm({ ...form, planTwo: e })}
            otherStyles="mb-4"
          />

          <FormField
            title=""
            value={form.planThree}
            placeholder="Third adventure"
            handleChangeText={(e) => setForm({ ...form, planThree: e })}
            otherStyles="mb-4"
          />

          <View className="flex-row mt-4 justify-evenly">
            <CustomButton
              title="Change it!"
              onPress={handleSubmit}
              customStyles="bg-[#387180] mx-1 grow border-b-4 border-r-4 border-gray-700"
              customStylesText="font-caveat text-4xl"
            />
            <CustomButton
              title="Back!"
              onPress={() => router.push("/plans")}
              customStyles="bg-gray-400 mx-1 grow border-b-4 border-r-4 border-gray-700"
              customStylesText="font-caveat text-4xl"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}