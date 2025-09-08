import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CharacterList from "../screens/CharacterList";
import CharacterDetails from "../screens/CharacterDetails";
import { RootStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CharacterList"
          component={CharacterList}
          options={{ title: "Personagens" }}
        />
        <Stack.Screen
          name="CharacterDetails"
          component={CharacterDetails}
          options={{ title: "Detalhes" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
