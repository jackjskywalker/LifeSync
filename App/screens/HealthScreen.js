import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

const categories = ['Muscle Gain', 'Fat Loss', 'Vegan', 'Carnivore'];

//Chandler
const recipes = {
    'Muscle Gain': [
        { title: 'Zucchini Noodles with Pesto', time: '45 Minutes', difficulty: 'Medium', price: '$', imageUri: require('../assets/Images/zucchini noodles with pesto.jpg') },
        { title: 'Overnight Oats', time: '5 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/Overnight Oats.png') },
        { title: 'Grilled Chicken Breast', time: '30 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/grilled chicken breast.jpg') },
        { title: 'Protein Pancakes', time: '15 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/Protein-pancakes-b64bd40.jpg') },
        { title: 'Turkey and Sweet Potato Hash', time: '35 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/TurkeyHash.jpg') },
        { title: 'Cottage Cheese with Pineapple and Walnuts', time: '10 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/cottage cheese.jpg') },
        { title: 'Stuffed Bell Peppers', time: '45 Minutes', difficulty: 'Medium', price: '$', imageUri: require('../assets/Images/stuffed peppers.jpg') },
        { title: 'Protein Smoothie Bowl', time: '10 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/smoothie bowl.jpg') }
    ],
    'Fat Loss': [
        { title: 'Avocado Salad', time: '10 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/avocadosalad.jpg') },
        { title: 'Grilled Salmon with Asparagus', time: '25 Minutes', difficulty: 'Medium', price: '$$$', imageUri: require('../assets/Images/salmon.jpg') },
        { title: 'Kale & Quinoa Salad', time: '20 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/kale.jpg') },
        { title: 'Cauliflower Rice Stir-Fry', time: '15 Minutes', difficulty: 'Medium', price: '$', imageUri: require('../assets/Images/friedrice.jpg') },
        { title: 'Shrimp Lettuce Wraps', time: '20 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/Shrimp-Lettuce-Wraps.jpg') },
        { title: 'Cucumber Noodle Salad', time: '15 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/cucumber-noodle--salad.jpg') },
        { title: 'Chicken and Vegetable Soup', time: '45 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/Chicken-Vegetable-Soup.jpg') },
        { title: 'Turkey Chili', time: '50 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/Easy-Turkey-Chili.webp') }
    ],
    'Vegan': [
        { title: 'Chickpea Curry', time: '40 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/chickpea.jpg') },
        { title: 'Vegan Tacos', time: '20 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/vegantacos.jpg') },
        { title: 'Lentil Soup', time: '35 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/lentilsoup.jpg') },
        { title: 'Tofu Stir Fry', time: '25 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/tofu stirfry.jpg') },
        { title: 'Stuffed Sweet Potatoes', time: '40 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/stuffed sweet potatoes.jpg') },
        { title: 'Vegan Buddha Bowl', time: '30 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/buddha bowl.jpg') },
        { title: 'Peanut Butter Energy Bites', time: '15 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/energy bites.jpg') },
        { title: 'Vegan Mushroom Stroganoff', time: '25 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/mushroom stroganoff.jpg') }

    ],
    'Carnivore': [
        { title: 'Bacon-wrapped Steak', time: '30 Minutes', difficulty: 'Medium', price: '$$$', imageUri: require('../assets/Images/bacon steak.webp') },
        { title: 'Beef Liver Stir Fry', time: '20 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/beef stirfry.jpg') },
        { title: 'Roast Pork Belly', time: '60 Minutes', difficulty: 'Hard', price: '$$$', imageUri: require('../assets/Images/pork belly.avif') },
        { title: 'Grilled Lamb Chops', time: '25 Minutes', difficulty: 'Medium', price: '$$$', imageUri: require('../assets/Images/lamb chops.jpg') },
        { title: 'Slow-Cooked Short Ribs', time: '7 Hours', difficulty: 'Hard', price: '$$$', imageUri: require('../assets/Images/slow cooked ribs.jpg') },
        { title: 'Duck Breast with Orange Glaze', time: '60 Minutes', difficulty: 'Medium', price: '$$$', imageUri: require('../assets/Images/duck breast orange.jpg') },
        { title: 'Chicken Thighs in Creamy Garlic Sauce', time: '35 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/chicken thighs in garlic sauce.jpg') },
        { title: 'Smoked Sausage and Cabbage Stir Fry', time: '25 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/sausage and cabbage stir fry.jpg') }
    ]
};


const allRecipes = Object.values(recipes).flat();

const HealthScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Muscle Gain');
  const [showAll, setShowAll] = useState(false);

  const renderRecipeItem = ({ item }) => (
    <View style={styles.recipeCard}>
      <Image source={item.imageUri} style={styles.recipeImage} />
      <View style={styles.priceTag}>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
      <Text style={styles.recipeTitle}>{item.title}</Text>
      <Text style={styles.recipeDetails}>{`${item.time}, ${item.difficulty}`}</Text> 
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to Recipe</Text>
      </TouchableOpacity>
    </View>
  );
  

  const renderYourRecipes = ({ item }) => (
    <TouchableOpacity style={styles.workoutContainer}>
      <Image source={item.imageUri} style={styles.workoutImage} />
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{item.title}</Text>
        <Text style={styles.workoutDetails}>{`${item.time}, ${item.difficulty}`}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={30} color="#000" />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={[]}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={
        <View style={styles.container}>
          {/* Category Selector */}
          <View style={styles.topBar}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonSelected
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.categoryButtonTextSelected
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recommended Recipes (Horizontal List) */}
          <Text style={styles.sectionTitle}>Recommended</Text>
          <FlatList
            data={recipes[selectedCategory]}
            renderItem={renderRecipeItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            contentContainerStyle={styles.recipeContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      }
      ListFooterComponent={
        <View style={styles.container}>
          {/* Your Recipes */}
          <Text style={styles.sectionTitle}>Your Recipes</Text>
          <FlatList
            data={showAll ? allRecipes.slice(0, 5) : allRecipes.slice(0, 3)}
            renderItem={renderYourRecipes}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.recipeContainer}
          />

          {/* Load More / Show Less Button */}
          {allRecipes.length > 3 && (
            <TouchableOpacity
              style={styles.updatePreferencesButton}
              onPress={() => setShowAll((prev) => !prev)}
            >
              <Text style={styles.updatePreferencesText}>
                {showAll ? 'Show Less' : 'Load More'}
              </Text>
            </TouchableOpacity>
          )}

          {/* All Plans (Horizontal List) */}
          <Text style={styles.sectionTitle}>All Plans</Text>
          <FlatList
            data={allRecipes}
            renderItem={renderRecipeItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            contentContainerStyle={styles.recipeContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    padding: 8,
    borderRadius: 4,
  },
  categoryButtonSelected: {
    backgroundColor: '#4285F4',
  },
  categoryButtonText: {
    color: '#555',
  },
  categoryButtonTextSelected: {
    color: 'white',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 16,
  },
  recipeContainer: {
    marginBottom: 16,
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    width: 200,
  },
  priceTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  priceText: {
    color: '#555',
    fontWeight: 'bold',
  },
  recipeImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  recipeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    marginTop: 10,
  },
  recipeDetails: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#4285F4',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
  },
  workoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    margin: 10,
    borderRadius: 8,
    width: '100%',
  },
  workoutImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 8,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
  },
  workoutDetails: {
    color: '#555',
    fontSize: 14,
  },
  updatePreferencesButton: {
    alignSelf: 'center',
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  updatePreferencesText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HealthScreen;
