import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function AddRecipeScreen({ navigation }) {
  const [category, setSelectedCategory] = useState('');
  const [recipe, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleSaveRecipe = async () => {
      if (!ingredients || !category || !instructions || !recipe) {
        Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
        return;
      }
      
    try {
      await addDoc(collection(db, 'recipes'), {
        category,
        recipe,
        ingredients,
        instructions,
      });
      Alert.alert('Başarılı', 'Tarif başarıyla kaydedildi!');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Hata', 'Tarif kaydedilirken bir hata oluştu: ' + error.message);
    }
  };

  return (
    
      <View style={styles.container}>
        <Text style={styles.title}>Tarif Ekle</Text>

        <TextInput
          style={styles.input}
          placeholder="Yemek Adı"
          onChangeText={setRecipeName}
          value={recipe}
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="Kategori Seçin" value="" />
            <Picker.Item label="Ana Yemekler" value="Ana Yemekler" />
            <Picker.Item label="Atıştırmalıklar" value="Atıştırmalıklar" />
            <Picker.Item label="Tatlılar" value="Tatlılar" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Malzemeler"
          onChangeText={setIngredients}
          value={ingredients}
        />

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Tarifin Hazırlanışı"
          onChangeText={setInstructions}
          value={instructions}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={() => { }}>
          <Text style={styles.buttonText}>Fotoğraf Seç</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSaveRecipe}>
          <Text style={styles.buttonText}>Tarifi Kaydet</Text>
        </TouchableOpacity>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3D7FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#FAFAFA',
  },
  pickerContainer: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4B0082',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
