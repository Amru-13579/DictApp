import React, {Component} from "react";
import {TouchableOpacity,Text,View,TextInput,StyleSheet} from 'react-native';
import { Header } from "react-native-elements";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      textTyped: "",
      isSearchPressed: false,
      word: "",
      lexicalCategory: "",
      examples: [],
      definition: "",
    };
  }

getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url =
      "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword +".json";
    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
    .then((response)=>{
    var responseObject = response
    
    if(responseObject){
        var wordData = responseObject.definitions[0]
        var definition = wordData.description
        var lexicalCategory=wordData.wordType

        this.setState({
            "word" : this.state.text,
            "definition" :definition,
            "lexicalCategory" : lexicalCategory
        })
    }
    else{
        this.setState({
            "word" : this.state.text,
            "definition" : "Not Found",
            "lexicalCategory" : "NotFound"
        });
    }

});
  };

  render (){
    return (
        <View>
          <Header
            backgroundColor="green"
            centerComponent={{
              text: "Dictionary",
              style: { fontSize: 30},
            }}
          />
          <TextInput
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: this.state.isSearchPressed,
                word: this.state.word,
                lexicalCategory: this.state.lexicalCategory,
                examples: [],
                definition: this.state.definition,
              });
            }}
            value={this.state.text}
          />
  
          <TouchableOpacity
            onPress={() => {
              this.setState({isSearchPressed: true });
              this.getWord(this.state.text);
            }}>
            <Text>Search!</Text>
          </TouchableOpacity>
          <View>
              <Text>Word:{""}</Text>
              <Text>{this.state.word}</Text>
          </View>
          <View>
              <Text>Type:{""}</Text>
              <Text>{this.state.lexicalCategory}</Text>
          </View>
          <View style>
              <Text>Definition:{""}</Text>
              <Text>{this.state.definition}</Text>
          </View>
          </View>
    );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
  })