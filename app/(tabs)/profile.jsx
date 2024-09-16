import { router } from "expo-router";
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
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => {
            return (
              <View>
                <Text className="text-2xl self-center uppercase mt-10 mb-4 text-gray-100 font-pbold">
                  {item.title}
                </Text>
              </View>
            );
          }}
          ListHeaderComponent={
            <>
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
                <CustomButton
                  title="Edit Profile"
                  onPress={() => router.push("/edit-profile")}
                  customStyles={"mt-4 bg-gray-400"}
                  customStylesText="font-pbold"
                />
                <CustomButton
                  title="My plans"
                  onPress={() => router.push("/edit-profile")}
                  customStyles={"mt-4 bg-gray-400"}
                  customStylesText="font-pbold"
                />
              </View>
            </>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </Screen>
  );
}
