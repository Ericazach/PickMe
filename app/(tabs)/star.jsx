import { View, Text, ScrollView, Alert } from "react-native";
import { Screen } from "../../components/Screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from "../../components/FormField";
import { CustomButton } from "../../components/CustomButton";
import { router } from "expo-router";
import { useState } from "react";
import { createActivity } from "../../lib/appwrite";

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
        <ScrollView className="px-4 my-7">
          <Text className="text-3xl my-5 mb-10 uppercase text-gray-400 font-pextrabold">
            Let's make a plan!
          </Text>
          <Text className="text-xl text-white font-pbold">Mission title?</Text>
          <FormField
            title=""
            value={form.title}
            placeholder="Enter a mission title"
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
            title="Plan it!"
            onPress={handleSubmit}
            customStyles={"mt-10 bg-[#387180]"}
            customStylesText="font-pbold"
          />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}
