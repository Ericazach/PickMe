import { Image, ScrollView, Text, View } from "react-native";
import { Screen } from "../../components/Screen";
import { useGlobalContext } from "../../context/GlobalProvider";
import { CustomButton } from "../../components/CustomButton";

import ImageRender from "../../components/ImageRender";
import { Link, router } from "expo-router";

const Home = () => {
  const { user } = useGlobalContext();

  return (
    <Screen>
      <ScrollView>
        <View className="w-full justify-between mt-16 mb-7 flex-row">
          <View className="justify-center items-center px-4">
            <Text className="font-pmedium text-xl text-gray-100">
              Welcome Back!
            </Text>
            <Link href="/profile">
              <Text className="text-2xl font-psemibold text-white">
                {user ? user.username : ""}
              </Text>
            </Link>
          </View>

          <Image
            source={require("../../assets/images/logo2.png")}
            className="w-[120px] h-[120px]"
          />
        </View>

        <View className=" items-center justify-center rounded-2xl">
          <Text className="text-gray-100 text-2xl mb-4  font-pbold">
            What's the quest for today?
          </Text>
        </View>
        <View>
          <ImageRender />
        </View>
        <View className="px-4">
          <CustomButton
            title="Create Plan"
            onPress={() => router.push("/star")}
            customStyles={"mt-10 bg-[#387180]  border-b-4 border-r-4 border-gray-700 items-center "}
            customStylesText="font-pbold uppercase"
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Home;
