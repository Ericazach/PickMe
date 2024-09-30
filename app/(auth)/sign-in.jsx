import { Alert, Image, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import { Screen } from "../../components/Screen";
import FormField from "../../components/FormField";
import { CustomButton } from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.email === "" || !form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen>
      <ScrollView className="px-4">
        <View className="w-full min-h-[85vh] justify-center my-10 ">
          <Image
            source={require("../../assets/images/logo2.png")}
            className="w-[150px] h-[150px] self-center"
          />
          <Text className="text-white text-xl font-psemibold self-start">
            Log In to PickMe
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            KeyBoardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Log In"
            onPress={submit}
            customStyles={"mt-10 bg-[#387180]"}
            customStylesText="font-caveat text-4xl"
          />

          <View className="flex-row justify-center gap-2 mt-0">
            <Text className="text-white text-sm text-center font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-[#387197] font-pbold">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default SignIn;
