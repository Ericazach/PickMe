import { useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import { Screen } from "../../components/Screen";
import { useGlobalContext } from "../../context/GlobalProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { getUserPosts, signOut } from "../../lib/appwrite";
import DataForm from "../../components/DataForm";
import { CustomButton } from "../../components/CustomButton";
import { useState } from "react";
import useAppwrite from "../../lib/useAppwrite";

export default function Profile() {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };
  return (
    <Screen>
      <SafeAreaView>
        <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
          <TouchableOpacity
            onPress={logout}
            className="flex w-full items-end mb-10"
          >
            <Image
              source={icons.logout}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <View className="w-20 h-20 border border-gray-100 rounded-full flex justify-center items-center">
            <Image
              source={{ uri: user?.avatar }}
              className="w-[90%] h-[90%] rounded-full "
              resizeMode="cover"
            />
          </View>
        </View>
        <View className="w-full px-3">
          <DataForm title="Username" text={user?.username} />
          <DataForm title="Email" text={user?.email} />
          {/* <CustomButton
            title="Edit Profile..."
            onPress={() => router.push("/edit-Activity/editUser")}
            customStyles={
              "mt-7 bg-gray-400 border-b-4 border-r-4 border-gray-600 items-center "
            }
            customStylesText="font-caveat text-4xl"
          /> */}
          {/* <Text className="self-center mt-7 mb-4 text-4xl  underline  text-gray-300 font-caveat">
                  My Plans...
                </Text> */}
        </View>
        {/* <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => {
            return (
              <View className="px-4">
                <TouchableOpacity
                  onPress={() => router.push(`/${item.$id}`)}
                  className="w-full  bg-gray-600 rounded-lg my-1.5 border-b-4 border-r-4 border-gray-400 items-center justify-center"
                >
                  <Text className="text-2xl  py-4 text-gray-100 font-playwrite">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          ListHeaderComponent={<></>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        /> */}
      </SafeAreaView>
    </Screen>
  );
}
