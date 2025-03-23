// ExerciseDetailScreen.test.js
// Jacob Marshall, last edited 3/6/2025

import React from 'react';
import { render } from '@testing-library/react-native';
import ExerciseDetailScreen from '../../screens/ExerciseDetailScreen';

describe('ExerciseDetailScreen', () => {
  it('renders correctly with exercise details', () => {
    const mockRoute = {
      params: {
        exercise: 'Push Up',
      },
    };

    const { getByText } = render(<ExerciseDetailScreen route={mockRoute} />);

    // Check if the exercise title is rendered
    expect(getByText('Push Up')).toBeTruthy();

    // Check if the description is rendered
    expect(getByText('Exercise details will go here along with videos to show the workouts.')).toBeTruthy();
  });
});