import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// -------------------------------------------------------------------------
// DUMMY DATA
// -------------------------------------------------------------------------
const recipes = {
  'Muscle Gain': [
    { id: '1', title: 'Zucchini Noodles with Pesto', time: '45 Minutes', difficulty: 'Medium', price: '$', imageUri: require('../assets/Images/zucchini noodles with pesto.jpg') },
    { id: '2', title: 'Overnight Oats', time: '5 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/Overnight Oats.png') },
    { id: '3', title: 'Grilled Chicken Breast', time: '30 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/grilled chicken breast.jpg') },
    { id: '4', title: 'Protein Pancakes', time: '15 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/Protein-pancakes-b64bd40.jpg') },
    { id: '5', title: 'Turkey and Sweet Potato Hash', time: '35 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/TurkeyHash.jpg') },
    { id: '6', title: 'Cottage Cheese w/ Pineapple & Walnuts', time: '10 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/cottage cheese.jpg') },
    { id: '7', title: 'Stuffed Bell Peppers', time: '45 Minutes', difficulty: 'Medium', price: '$', imageUri: require('../assets/Images/stuffed peppers.jpg') },
    { id: '8', title: 'Protein Smoothie Bowl', time: '10 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/smoothie bowl.jpg') },
  ],
  'Fat Loss': [
    { id: '9', title: 'Avocado Salad', time: '10 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/avocadosalad.jpg') },
    { id: '10', title: 'Grilled Salmon w/ Asparagus', time: '25 Minutes', difficulty: 'Medium', price: '$$$', imageUri: require('../assets/Images/salmon.jpg') },
    { id: '11', title: 'Kale & Quinoa Salad', time: '20 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/kale.jpg') },
    { id: '12', title: 'Cauliflower Rice Stir-Fry', time: '15 Minutes', difficulty: 'Medium', price: '$', imageUri: require('../assets/Images/friedrice.jpg') },
    { id: '13', title: 'Shrimp Lettuce Wraps', time: '20 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/Shrimp-Lettuce-Wraps.jpg') },
    { id: '14', title: 'Cucumber Noodle Salad', time: '15 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/cucumber-noodle--salad.jpg') },
    { id: '15', title: 'Chicken and Vegetable Soup', time: '45 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/Chicken-Vegetable-Soup.jpg') },
    { id: '16', title: 'Turkey Chili', time: '50 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/Easy-Turkey-Chili.webp') },
  ],
  Vegan: [
    { id: '17', title: 'Chickpea Curry', time: '40 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/chickpea.jpg') },
    { id: '18', title: 'Vegan Tacos', time: '20 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/vegantacos.jpg') },
    { id: '19', title: 'Lentil Soup', time: '35 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/lentilsoup.jpg') },
    { id: '20', title: 'Tofu Stir Fry', time: '25 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/tofu stirfry.jpg') },
    { id: '21', title: 'Stuffed Sweet Potatoes', time: '40 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/stuffed sweet potatoes.jpg') },
    { id: '22', title: 'Vegan Buddha Bowl', time: '30 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/buddha bowl.jpg') },
    { id: '23', title: 'Peanut Butter Energy Bites', time: '15 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/energy bites.jpg') },
    { id: '24', title: 'Vegan Mushroom Stroganoff', time: '25 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/mushroom stroganoff.jpg') },
  ],
  Carnivore: [
    { id: '25', title: 'Bacon-wrapped Steak', time: '30 Minutes', difficulty: 'Medium', price: '$$$', imageUri: require('../assets/Images/bacon steak.webp') },
    { id: '26', title: 'Beef Liver Stir Fry', time: '20 Minutes', difficulty: 'Medium', price: '$$', imageUri: require('../assets/Images/beef stirfry.jpg') },
    { id: '27', title: 'Roast Pork Belly', time: '60 Minutes', difficulty: 'Hard', price: '$$$', imageUri: require('../assets/Images/pork belly.avif') },
    { id: '28', title: 'Grilled Lamb Chops', time: '25 Minutes', difficulty: 'Medium', price: '$$$', imageUri: require('../assets/Images/lamb chops.jpg') },
    { id: '29', title: 'Slow-Cooked Short Ribs', time: '7 Hours', difficulty: 'Hard', price: '$$$', imageUri: require('../assets/Images/slow cooked ribs.jpg') },
    { id: '30', title: 'Duck Breast w/ Orange Glaze', time: '60 Minutes', difficulty: 'Medium', price: '$$$', imageUri: require('../assets/Images/duck breast orange.jpg') },
    { id: '31', title: 'Chicken Thighs in Creamy Garlic Sauce', time: '35 Minutes', difficulty: 'Easy', price: '$$', imageUri: require('../assets/Images/chicken thighs in garlic sauce.jpg') },
    { id: '32', title: 'Smoked Sausage & Cabbage Stir Fry', time: '25 Minutes', difficulty: 'Easy', price: '$', imageUri: require('../assets/Images/sausage and cabbage stir fry.jpg') },
  ],
};

// Flatten all categories into an "All" list
const allCategories = Object.keys(recipes);
const allRecipes = allCategories.reduce((acc, cat) => acc.concat(recipes[cat]), []);

// Helper for difficulty colors
const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Easy':
      return '#4CAF50'; // Green
    case 'Medium':
      return '#FFC107'; // Yellow
    case 'Hard':
      return '#F44336'; // Red
    default:
      return '#000'; // Black
  }
};

// -------------------------------------------------------------------------
// MAIN SCREEN COMPONENT
// -------------------------------------------------------------------------
export default function HealthScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);

  const displayedRecipes = 
    selectedCategory === 'All' ? allRecipes : recipes[selectedCategory];

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setVisibleCount(6);
  };

  const loadMoreRecipes = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  // -----------------------------------------------------------------------
  // RENDER: RECIPE ITEM
  // -----------------------------------------------------------------------
  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeContainer}
      onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}
    >
      <Image source={item.imageUri} style={styles.recipeImage} />
      <Text style={styles.recipeTitle}>{item.title}</Text>

      <View style={styles.infoContainer}>
        <View style={styles.iconRow}>
          <Image
            source={require('../assets/Images/timer.jpg')}
            style={styles.timerIcon}
          />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>

        <View style={styles.priceAndDifficultyContainer}>
          <Text style={styles.priceText}>{item.price}</Text>
          <View
            style={[
              styles.difficultyBox,
              { borderColor: getDifficultyColor(item.difficulty) },
            ]}
          >
            <Text
              style={[styles.difficultyText, { color: getDifficultyColor(item.difficulty) }]}
            >
              *
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // -----------------------------------------------------------------------
  // RENDER: HEADER (TABS)
  // -----------------------------------------------------------------------
  // This will be rendered at the top of the FlatList so it scrolls with content
  const renderListHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* "All" tab */}
          <TouchableOpacity
            style={[
              styles.categoryTab,
              selectedCategory === 'All' && styles.categoryTabSelected,
            ]}
            onPress={() => handleCategoryPress('All')}
          >
            <Text
              style={[
                styles.categoryTabText,
                selectedCategory === 'All' && styles.categoryTabTextSelected,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>

          {/* Other categories */}
          {allCategories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryTab,
                selectedCategory === cat && styles.categoryTabSelected,
              ]}
              onPress={() => handleCategoryPress(cat)}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  selectedCategory === cat && styles.categoryTabTextSelected,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  // -----------------------------------------------------------------------
  // RENDER: FOOTER (LOAD MORE)
  // -----------------------------------------------------------------------
  const renderFooter = () => {
    if (visibleCount < displayedRecipes.length) {
      return (
        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreRecipes}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  // -----------------------------------------------------------------------
  // MAIN RENDER
  // -----------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <FlatList
        data={displayedRecipes.slice(0, visibleCount)}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipeItem}
        numColumns={2}
        // The header with the horizontal categories
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderFooter}
        // We want to see the scroll indicator for the entire list
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// -------------------------------------------------------------------------
// STYLES
// -------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // We handle padding inside the ListHeader, so minimal padding here
  },
  listContent: {
    padding: 10,
    paddingBottom: 20,
  },
  // Header container around the scrollable tabs
  headerContainer: {
    // Some spacing to separate from top
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  categoryTab: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTabSelected: {
    backgroundColor: '#4285F4',
  },
  categoryTabText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },
  categoryTabTextSelected: {
    color: '#fff',
  },
  recipeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 5,
    padding: 10,

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,

    // Android elevation
    elevation: 4,
  },
  recipeImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 5,
  },
  recipeTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: 'column',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  timerIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  timeText: {
    fontSize: 14,
    color: '#444',
  },
  priceAndDifficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  difficultyBox: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 4,
  },
  difficultyText: {
    fontWeight: 'bold',
  },
  // The Load More button
  loadMoreButton: {
    marginVertical: 10,
    padding: 12,
    backgroundColor: '#4285F4',
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: '40%',
  },
  loadMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
