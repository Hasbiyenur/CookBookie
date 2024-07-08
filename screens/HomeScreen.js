import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function HomeScreen({ navigation }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'recipes'));
        const recipesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecipes(recipesData);
      } catch (error) {
        console.error('Error fetching recipes: ', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    
      <View style={styles.container}>
        <Text style={styles.title}>CookBookie</Text>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipeItem}
              onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            >
              <Text style={styles.recipeTitle}>{item.recipe}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.content}
        />
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3D7FF',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    top: 40,
    right: 20,
    color: "#4B0082"
  },
  content: {
    paddingBottom: 100,
    paddingTop: 80,
  },
  recipeItem: {
    padding: 20,
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
