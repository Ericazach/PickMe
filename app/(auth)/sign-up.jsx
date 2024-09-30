import { Alert, Image, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import { Screen } from "../../components/Screen";
import FormField from "../../components/FormField";
import { CustomButton } from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.username === "" || !form.email === "" || !form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
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
        <View className="w-full min-h-[85vh] justify-center my-10">
          <Image
            source={require("../../assets/images/logo2.png")}
            className="w-[150px] h-[150px] self-center"
          />
          <Text className="text-white text-xl font-psemibold text-semibold self-start">
            Sign Up to PickMe
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
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
            title="Sign Up"
            onPress={submit}
            customStyles={"mt-10 bg-[#387180]"}
            customStylesText="font-caveat text-4xl"
          />

          <View className="flex-row justify-center gap-2 mt-0">
            <Text className="text-white text-sm text-center font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-[#387197] font-pbold">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default SignUp;
