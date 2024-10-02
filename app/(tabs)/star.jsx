import { View, Text, ScrollView, Alert } from "react-native";
import { Screen } from "../../components/Screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from "../../components/FormField";
import { CustomButton } from "../../components/CustomButton";
import { router } from "expo-router";
import { useState } from "react";
import { createActivity } from "../../lib/appwrite";
import * as Animatable from "react-native-animatable";

export default function Star() {
  const { user } = useGlobalContext();
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
      await createActivity({
        ...form,
        userId: user.$id,
      });
      Alert.alert("Success", "Post uploaded successfully");
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
      <SafeAreaView className="h-full ">
        <View className="px-4 h-full mt-4">
          <Animatable.View animation="lightSpeedIn" duration={1000}>
            <Text className="text-[50px] my-5 mb-10 text-gray-200 font-caveat">
              Let's make a plan!
            </Text>
          </Animatable.View>
          <Text className="text-2xl text-white font-playwrite">
            Mission title?
          </Text>
          <FormField
            title=""
            value={form.title}
            placeholder="Enter a mission title"
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles="mb-4"
          />

          <Text className="text-2xl text-white font-playwrite mt-3 ">
            Adventures
          </Text>
          <Text className="text-sm text-gray-100 font-pmedium ">
            minimum of three adventures
          </Text>
          <FormField
            title=""
            value={form.planOne}
            placeholder="Name of this path?"
            handleChangeText={(e) => setForm({ ...form, planOne: e })}
            otherStyles="mb-4"
          />
          <FormField
            title=""
            value={form.planTwo}
            placeholder="Name of this path?"
            handleChangeText={(e) => setForm({ ...form, planTwo: e })}
            otherStyles="mb-4"
          />
          <FormField
            title=""
            value={form.planThree}
            placeholder="Name of this path?"
            handleChangeText={(e) => setForm({ ...form, planThree: e })}
            otherStyles="mb-4"
          />

          <CustomButton
            title="Plan it!..."
            onPress={handleSubmit}
            customStyles={
              "mt-6 bg-[#387180] border-b-4 border-r-4 border-gray-700 items-center "
            }
            customStylesText="font-caveat text-4xl"
          />
        </View>
      </SafeAreaView>
    </Screen>
  );
}
