import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

type CharacterDetailsRoute = RouteProp<RootStackParamList, "CharacterDetails">;

type Character = {
  id: number;
  name: string;
  img: string;
  age?: string;
  race?: string;
  gender?: string;
  description?: string;
  quote?: string;
};

function CharacterDetails() {
  const route = useRoute<CharacterDetailsRoute>();
  const { id } = route.params;
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    fetch(`https://www.demonslayer-api.com/api/v1/characters?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.content && data.content.length > 0) {
          setCharacter(data.content[0]);
        } else {
          console.error("Personagem não encontrado:", data);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!character) return <Text style={styles.loading}>Carregando...</Text>;

const background =
  character.race === "Demon"
    ? require("../../assets/background-demon.png")
    : require("../../assets/background-human.png");


  return (
    <ImageBackground source={background} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Image source={{ uri: character.img }} style={styles.image} />
          <Text style={styles.name}>{character.name}</Text>

          {character.age && character.race && character.gender && (
<View style={styles.infoContainer}>
  {character.age && (
    <Text style={styles.info}>
      Idade: <Text style={styles.infoValue}>{character.age}</Text>
    </Text>
  )}
  {character.race && (
    <Text style={styles.info}>
      Raça: <Text style={styles.infoValue}>{character.race}</Text>
    </Text>
  )}
  {character.gender && (
    <Text style={styles.info}>
      Gênero: <Text style={styles.infoValue}>{character.gender}</Text>
    </Text>
  )}
</View>
)}

          {character.description && <Text style={styles.description}>{character.description}</Text>}
          {character.quote && <Text style={styles.quote}>"{character.quote}"</Text>}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default CharacterDetails;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    height: "72%",
    backgroundColor: "rgba(255, 255, 255, 1)", 
    borderRadius: 20,
    paddingTop: 100, 
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
   
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    position: "absolute",
    top: -200, 
    zIndex: 2,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000ff", 
    marginBottom: 8,
    textAlign: "center",
  },

  infoContainer: {
  flexDirection: "row",
  justifyContent: "space-around", 
  width: "100%",
  marginBottom: 5,
},
info: {
  fontSize: 16,
  color: "#000",
  backgroundColor: '#dddbdba6',
  padding: 3,
  borderRadius: 10,
  textAlign: "center",
},
infoValue: {
  color: "rgba(221, 66, 74, 0.84)", 
  fontWeight: "bold",
},
  description: {
    fontSize: 14,
    color: "#000000ff",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 22,
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#ffffffff",
    marginTop: 15,
    textAlign: "center",
    backgroundColor:"black",
    padding: 15,
    borderRadius: 10
  },
  loading: {
    flex: 1,
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#fff",
  },
});
