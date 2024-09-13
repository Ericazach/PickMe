import { Tabs, SplashScreen } from "expo-router";
import { View } from "react-native";

import { HomeIcon, PlanIcon, ProfileIcon, StarIcon } from "../../components/Icons";
import { useFonts } from "expo-font";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function TabsLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: {
          height: 30,
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0C1C26",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="star"
        options={{
          tabBarIcon: ({ color }) => <StarIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          tabBarIcon: ({ color }) => <PlanIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
