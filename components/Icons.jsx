import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

export const ProfileIcon = (props) => (
  <MaterialCommunityIcons
    name="account-circle"
    size={24}
    color="black"
    {...props}
  />
);

export const HomeIcon = (props) => (
  <MaterialCommunityIcons
    name="home-circle"
    size={24}
    color="black"
    {...props}
  />
);

export const StarIcon = (props) => (
  <MaterialCommunityIcons
    name="star-circle"
    size={24}
    color="black"
    {...props}
  />
);

export const PlanIcon = (props) => (
  <MaterialCommunityIcons
    name="checkbox-marked-circle"
    size={24}
    color="black"
    {...props}
  />
);

export const EditIcon = (props) => (
  <MaterialCommunityIcons
    name="circle-edit-outline"
    size={24}
    color="black"
    {...props}
  />
);

export const BackIcon = (props) => (
  <Entypo name="back-in-time" size={24} color="black" {...props} />
);
