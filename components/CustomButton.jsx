import { Pressable, Text } from "react-native";

export function CustomButton({
  title,
  onPress,
  customStyles,
  customStylesText,
}) {
  return (
    <Pressable
      className={`w-full py-4 rounded-xl ${customStyles}`}
      onPress={onPress}
    >
      <Text
        className={`text-[#0C1C26] text-center text-xl ${customStylesText}`}
      >
        {title}
      </Text>
    </Pressable>
  );
}
