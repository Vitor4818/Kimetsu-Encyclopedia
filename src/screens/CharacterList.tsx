import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "CharacterList">;

type Character = {
  id: number;
  name: string;
  img: string;
  arc?: string;
};

export default function CharacterList({ navigation }: Props) {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    fetch("https://www.demonslayer-api.com/api/v1/characters?limit=45")
      .then((res) => res.json())
      .then((data) => {
        if (data.content) {
          setCharacters(data.content);
        } else {
          console.error("Dados de personagens não encontrados:", data);
        }
      })
      .catch((err) => console.error("Erro ao buscar personagens:", err));
  }, []);

  return (
    <View style={styles.container}>
<FlatList
  data={characters}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("CharacterDetails", { id: item.id })}
    >
      <Image source={{ uri: item.img }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        {item.arc && <Text style={styles.arc}>{item.arc}</Text>}
      </View>
    </TouchableOpacity>
  )}
  contentContainerStyle={{ paddingBottom: 20 }}
ListHeaderComponent={
  <View style={{ alignItems: "center", marginBottom: 15 }}>
    <Image
      source={require("../../assets/logo.png")}
      style={styles.topImage}
    />
    <Text style={styles.headerTitle}>Escolha seu personagem abaixo</Text>
  </View>
}
  
/>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffffff",
  },
  topImage: {
    width: 400,
    height: 200,
    alignSelf: "center",
    marginBottom: 15,
    resizeMode: "contain",
  },
  headerTitle: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#000",
  marginTop: 10,
  textAlign: "center",
},
  card: {
    flexDirection: "row",
    backgroundColor: "#e2e1e1ff",
    borderRadius: 15,
    padding: 10,
    marginVertical: 6,
    alignItems: "center",
    shadowColor: "#ff6b6b",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "contain",
    marginRight: 15,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000ff",
  },
  arc: {
    fontSize: 12,
    color: "#a3e635",
    marginTop: 2,
  },
});
