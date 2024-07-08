import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function RecipeDetailScreen({ route, navigation }) {
  const { recipe } = route.params;

  return (
    
      <View style={styles.container}>
        <Text style={styles.title}>{recipe.recipe}</Text>
        <Text style={styles.subtitle}>Kategori: {recipe.category}</Text>
        <Text style={styles.sectionTitle}>Malzemeler:</Text>
        <Text style={styles.contentText}>{recipe.ingredients}</Text>
        <Text style={styles.sectionTitle}>Hazırlanışı:</Text>
        <Text style={styles.contentText}>{recipe.instructions}</Text>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3D7FF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  contentText: {
    fontSize: 16,
    marginTop: 10,
  },
});
