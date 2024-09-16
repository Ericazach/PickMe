import { Screen } from "./Screen";
import { Text, Image, View, ScrollView } from "react-native";
import { CustomButton } from "./CustomButton";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
export function Home() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <Screen>
      <ScrollView>
        <View className=" items-center justify-center min-h-[85vh] my-10">
          <Image
            source={require("../assets/images/logo2.png")}
            className="w-[300px] h-[300px]"
          />
          <Text className="text-white text-xl font-pbold">
            3 Paths, 1 Epic Day
          </Text>
          <Text className="text-white text-lg text-center font-light p-4 mt-6 font-pregular">
            Bored with the same old routine? Choose your own adventure every day
            with our app! Three unique options await, ready to spice up your
            life.
          </Text>

          <CustomButton 
            title={"Continue with email"}
            customStyles={"mt-6 bg-[#387180]"}
            customStylesText="font-psemibold"
            onPress={() => router.push("/sign-in")}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
