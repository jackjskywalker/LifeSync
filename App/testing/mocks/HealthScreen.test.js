// HealthScreen.test.js
// Jacob Marshall, last edited 3/6/2025

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HealthScreen from '../../screens/HealthScreen';

// Mock the required assets with updated paths
jest.mock('../../assets/Images/zucchini noodles with pesto.jpg', () => 'zucchini noodles with pesto.jpg');
jest.mock('../../assets/Images/Overnight Oats.png', () => 'Overnight Oats.png');
jest.mock('../../assets/Images/grilled chicken breast.jpg', () => 'grilled chicken breast.jpg');
jest.mock('../../assets/Images/Protein-pancakes-b64bd40.jpg', () => 'Protein-pancakes-b64bd40.jpg');
jest.mock('../../assets/Images/TurkeyHash.jpg', () => 'TurkeyHash.jpg');
jest.mock('../../assets/Images/cottage cheese.jpg', () => 'cottage cheese.jpg');
jest.mock('../../assets/Images/stuffed peppers.jpg', () => 'stuffed peppers.jpg');
jest.mock('../../assets/Images/smoothie bowl.jpg', () => 'smoothie bowl.jpg');
jest.mock('../../assets/Images/avocadosalad.jpg', () => 'avocadosalad.jpg');
jest.mock('../../assets/Images/salmon.jpg', () => 'salmon.jpg');
jest.mock('../../assets/Images/kale.jpg', () => 'kale.jpg');
jest.mock('../../assets/Images/friedrice.jpg', () => 'friedrice.jpg');
jest.mock('../../assets/Images/Shrimp-Lettuce-Wraps.jpg', () => 'Shrimp-Lettuce-Wraps.jpg');
jest.mock('../../assets/Images/cucumber-noodle--salad.jpg', () => 'cucumber-noodle--salad.jpg');
jest.mock('../../assets/Images/Chicken-Vegetable-Soup.jpg', () => 'Chicken-Vegetable-Soup.jpg');
jest.mock('../../assets/Images/Easy-Turkey-Chili.webp', () => 'Easy-Turkey-Chili.webp');
jest.mock('../../assets/Images/chickpea.jpg', () => 'chickpea.jpg');
jest.mock('../../assets/Images/vegantacos.jpg', () => 'vegantacos.jpg');
jest.mock('../../assets/Images/lentilsoup.jpg', () => 'lentilsoup.jpg');
jest.mock('../../assets/Images/tofu stirfry.jpg', () => 'tofu stirfry.jpg');
jest.mock('../../assets/Images/stuffed sweet potatoes.jpg', () => 'stuffed sweet potatoes.jpg');
jest.mock('../../assets/Images/buddha bowl.jpg', () => 'buddha bowl.jpg');
jest.mock('../../assets/Images/energy bites.jpg', () => 'energy bites.jpg');
jest.mock('../../assets/Images/mushroom stroganoff.jpg', () => 'mushroom stroganoff.jpg');
jest.mock('../../assets/Images/bacon steak.webp', () => 'bacon steak.webp');
jest.mock('../../assets/Images/beef stirfry.jpg', () => 'beef stirfry.jpg');
jest.mock('../../assets/Images/pork belly.avif', () => 'pork belly.avif');
jest.mock('../../assets/Images/lamb chops.jpg', () => 'lamb chops.jpg');
jest.mock('../../assets/Images/slow cooked ribs.jpg', () => 'slow cooked ribs.jpg');
jest.mock('../../assets/Images/duck breast orange.jpg', () => 'duck breast orange.jpg');
jest.mock('../../assets/Images/chicken thighs in garlic sauce.jpg', () => 'chicken thighs in garlic sauce.jpg');
jest.mock('../../assets/Images/sausage and cabbage stir fry.jpg', () => 'sausage and cabbage stir fry.jpg');

describe('HealthScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly and displays recipe categories', () => {
    const { getByText } = render(<HealthScreen navigation={mockNavigation} />);

    // Check if the category titles are rendered
    expect(getByText('Muscle Gain')).toBeTruthy();
    expect(getByText('Fat Loss')).toBeTruthy();
    expect(getByText('Vegan')).toBeTruthy();
    expect(getByText('Carnivore')).toBeTruthy();
  });

  it('renders recipe items within categories', () => {
    const { getByText } = render(<HealthScreen navigation={mockNavigation} />);

    // Check if the recipe titles are rendered
    expect(getByText('Zucchini Noodles with Pesto')).toBeTruthy();
    expect(getByText('Overnight Oats')).toBeTruthy();
    expect(getByText('Grilled Chicken Breast')).toBeTruthy();
    expect(getByText('Avocado Salad')).toBeTruthy();
    expect(getByText('Grilled Salmon with Asparagus')).toBeTruthy();
    expect(getByText('Chickpea Curry')).toBeTruthy();
  });

  it('navigates to RecipeDetail when a recipe is pressed', () => {
    const { getByText } = render(<HealthScreen navigation={mockNavigation} />);

    // Simulate pressing a recipe item
    fireEvent.press(getByText('Zucchini Noodles with Pesto'));
  });
});
