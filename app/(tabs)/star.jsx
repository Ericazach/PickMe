import { View, Text, ScrollView } from "react-native";
import { Screen } from "../../components/Screen";
import { SafeAreaView } from "react-native-safe-area-context";

import FormField from "../../components/FormField";
import { CustomButton } from "../../components/CustomButton";
import { router } from "expo-router";

export default function Star() {
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
            value=""
            placeholder="Enter a mission title"
            handleChangeText={() => {}}
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
            value=""
            placeholder="Name of this path?"
            handleChangeText={() => {}}
            otherStyles="mb-4"
          />
          <FormField
            title=""
            value=""
            placeholder="Name of this path?"
            handleChangeText={() => {}}
            otherStyles="mb-4"
          />
          <FormField
            title=""
            value=""
            placeholder="Name of this path?"
            handleChangeText={() => {}}
            otherStyles="mb-4"
          />

          <CustomButton
            title="Plan it!"
            onPress={() => router.push("/star")}
            customStyles={"mt-10 bg-[#387180]"}
            customStylesText="font-pbold"
          />
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}
