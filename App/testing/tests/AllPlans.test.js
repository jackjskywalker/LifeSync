// AllPlans.test.js
// Jacob Marshall, last edited 3/6/2025

import React from 'react';
import { render } from '@testing-library/react-native';
import AllPlans from '../../screens/AllPlans';

describe('AllPlans', () => {
  it('renders correctly and displays all plans', () => {
    const { getByText, getAllByText } = render(<AllPlans />);

    // Check if the titles of the plans are rendered
    expect(getByText('Cardio Training')).toBeTruthy();
    expect(getByText('Upper Body')).toBeTruthy();

    // Check if the descriptions of the plans are rendered
    expect(getByText('10 Mile Run')).toBeTruthy();
    expect(getByText('Target Chest')).toBeTruthy();

    // Check if the durations of the plans are rendered
    expect(getAllByText('55 minutes').length).toBe(1);
    expect(getAllByText('45 minutes').length).toBe(1);
  });

  it('renders the correct number of plan items', () => {
    const { getAllByText } = render(<AllPlans />);
    
    // Check if the number of plan titles rendered matches the number of plans
    const planTitles = getAllByText(/Training|Body/i); // Regex to match both titles
    expect(planTitles.length).toBe(2); // Adjust this number based on the number of plans
  });
});