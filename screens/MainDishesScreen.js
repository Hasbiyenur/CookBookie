import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function MainDishes({ navigation }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const q = query(collection(db, 'recipes'), where('category', '==', 'Ana Yemekler'));
        const querySnapshot = await getDocs(q);
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
        
        <View style={styles.content}>
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
            ListFooterComponent={<View style={{ height: 100 }} />}
          />
        </View>
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3D7FF',
    paddingTop: 80,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    top: 40,
    right: 20,
  },
  content: {
    flex: 1,
    width: '100%',
    paddingBottom: 60,
  },
  recipeItem: {
    padding: 20,
    backgroundColor: '#f9f9f9',
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
