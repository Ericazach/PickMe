import { router, useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import useAppwrite from '../lib/useAppwrite';
import { getActivityById, deleteActivity } from '../lib/appwrite';
import { icons } from '../constants';
import { Screen } from '../components/Screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from "../components/CustomButton";
import { Alert } from 'react-native';



const ItemDetail = () => {
  const { id } = useLocalSearchParams()
  const { data: post, refetch } = useAppwrite(() => getActivityById(id));

  // useEffect(() => {
  //   refetch();
  // }, [id]);

  const handleDelete = async () => {
    Alert.alert(
      "Wait, are you sure?",
      "Do you want to ditch this awesome plan?",
      [
        {
          text: "Cancelar", // Botón de cancelar
          onPress: () => console.log("Eliminación cancelada"),
          style: "cancel", // Estilo que lo coloca a la izquierda (cancelación)
        },
        {
          text: "Eliminar", // Botón de confirmación
          onPress: async () => {
            try {
              await deleteActivity(id); // Ejecuta la función para eliminar
              router.push("/profile"); // Redirige a la página de perfil
            } catch (error) {
              Alert.alert("Error", error.message); // Muestra un error si algo sale mal
            }
          },
          style: "destructive", // Estilo que lo resalta en rojo (acción destructiva)
        }
      ],
      { cancelable: true } // Permite cerrar el alert al tocar fuera del cuadro de diálogo
    );
  };

  return (
    <Screen>
      <SafeAreaView className="">
        <ScrollView>
          <Text className="self-center text-3xl uppercase text-gray-400 font-pextrabold">
            Ready, Set, Select!
          </Text>
          <View className="w-full mt-7 px-4">
            <View className="flex-row justify-between ">
              <Text className="text-2xl px-2 self-center uppercase mb-4 text-gray-100 font-pbold">
                {post?.title}
              </Text>
              <TouchableOpacity
                onPress={handleDelete}
                className="self-center"
              >
                <Image
                  source={icons.trash}
                  resizeMode="contain"
                  className="w-10 h-10"
                />
              </TouchableOpacity>
            </View>

            <CustomButton
              title={post?.activity1}
              customStyles="border-[1px] border-[#FF3864] py-7 mt-5 border-b-4 border-r-4 border-b-4 border-r-4 items-center items-center"
              customStylesText="text-2xl text-gray-400 font-psemibold "
              onPress={() => { }}
            />
            <CustomButton
              title={post?.activity2}
              customStyles="border-[1px] border-[#F39C6B] my-5 py-7 border-b-4 border-r-4 items-center"
              customStylesText="text-2xl text-gray-400 font-psemibold "
              onPress={() => { }}
            />
            <CustomButton
              title={post?.activity3}
              customStyles="border-[1px] border-[#CC978E] border-b-4 border-r-4 py-7 mt-3"
              customStylesText="text-2xl text-gray-400 font-psemibold "
              onPress={() => { }}
            />
            <CustomButton
              title="Seal the deal!"
              onPress={() => router.push("/star")}
              customStyles={"mt-10 bg-[#387180] border-b-4 border-r-4 border-gray-700 items-center "}
              customStylesText="font-pbold uppercase"
            />
            <View className="flex-row mt-4 justify-evenly">
              <CustomButton
                title="Edit it!"
                onPress={() => router.push(`/edit-Activity/${post.$id}`)}
                customStyles={"mx-1 grow bg-gray-400 border-b-4 border-r-4 border-gray-600 items-center"}
                customStylesText="font-pbold uppercase"
              />
              <CustomButton
                title="Back!"
                onPress={() => router.push("/home")}
                customStyles={"mx-1 grow bg-gray-400 border-b-4 border-r-4 border-gray-600 items-center "}
                customStylesText="font-pbold uppercase"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

export default ItemDetail;