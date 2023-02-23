import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";


const Home = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  
  const scrollViewRef = useRef(null);

  const messageHandler = (textMessage) => {
    setMessage(textMessage);
  };
  const sendMessageHandler = async () => {

    setMessage("");
    Keyboard.dismiss();
    setChatHistory([...chatHistory, { userMessage:message}]);

    const apiKey = "";
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: message,
        max_tokens: 50,
        temperature: 0.5,
      },
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    const { choices } = response.data;
    const botMessage = choices[0].text.trim();


    setChatHistory([...chatHistory, {userMessage:message, botMessage }]);

  };
useEffect(()=>{
  scrollViewRef.current.scrollToEnd({ animated: true });
},[chatHistory])

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#1c1c1c'}} >
    <View style={styles.container}>
      
      <View style={styles.eyesContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.leftEye}></View>
          <View style={styles.rightEye}></View>
        </View>
        <View>
          <View style={styles.lip}></View>
        </View>
      </View>
      
      <View style={styles.chatContainer} >
        <View style={{flex:1}} >
        <FlatList
        
          ref={scrollViewRef}
          contentContainerStyle={styles.messageContainer}
          data={chatHistory}
          renderItem={(item) => {
            return (
              <>
                <View style={styles.userMessageContainer}>
                  <Text style={styles.nameBot}>{item.item.userMessage}</Text>
                </View>

                <View style={styles.botMessageContainer}>
                  <Text style={styles.nameBot}>{item.item.botMessage}</Text>
                </View>
              </>
            );
          }}
          keyExtractor={(item) => item.userMessage}
        />
        </View>
      <KeyboardAvoidingView behavior="height"style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="I'm waiting"
            placeholderTextColor="#1c1c1c"
            onChangeText={messageHandler}
            value={message}

          />
          <FontAwesome
            name="send-o"
            size={25}
            color="black"
            onPress={sendMessageHandler}
            style={{ paddingHorizontal: 10 }}
          />
        
        </KeyboardAvoidingView>

      </View>
      
    </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#1c1c1c",
    justifyContent: "space-between",

  },

  chatContainer: {
    flex: 1,
    justifyContent:'space-between',
    width: "100%",
  
    marginVertical: 20,
  },
  messageContainer: {


    flexGrow:1,
    justifyContent: "flex-end",

    marginHorizontal: 20,
  },
  userMessageContainer: {
    width: "100%",

    alignItems: "flex-end",
    marginVertical: 10,
  },
  botMessageContainer: {
    marginVertical: 10,
    width: "100%",

    alignItems: "flex-start",
  },
  nameBot: {
    color: "white",
    backgroundColor: "#121212",
    padding: 18,
    borderRadius: 15,
    maxWidth: "90%",
    fontSize: 16,
  },
  textInputContainer: {
    height: 70,

    flexDirection: "row",
    marginTop: 10,
 
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
    borderWidth: 2,
    color: "white",
    paddingHorizontal: 25,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  textInput: {
    justifyContent: "center",
    zIndex: 2,
    alignItems: "center",

    width: "96%",
    height: "100%",
    fontSize: 18,

    color: "#1c1c1c",
    shadowColor: "hsla(0, 100%, 100%, 0.15)",

    elevation: 1,
  },

  eyesContainer: {
    height: 200,
    marginHorizontal: 30,
    marginTop: 15,
    padding: 55,

    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#121212",
    alignItems: "center",
    borderRadius: 60,
  },
  leftEye: {
    borderWidth: 4,
    borderColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 25,
  },
  rightEye: {
    borderWidth: 4,
    borderColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginLeft: 25,
  },
  lip: {
    borderWidth: 4,
    borderColor: "white",
    //paddingVertical:12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 35,
    justifyContent: "center",
    alignItems: "center",
  },
});
