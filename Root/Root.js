import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screen/Home";

export default function Root() {
    const Drawer =createDrawerNavigator()
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home}  options={{headerTintColor:'white',headerStyle:{backgroundColor:'#1c1c1c'}}}/>

      </Drawer.Navigator>
    );
  }