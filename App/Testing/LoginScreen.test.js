import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

describe('Simple render test', () => {
  it('renders text correctly', () => {
    const testMessage = 'Test Message';
    const { getByText } = render(<Text>{testMessage}</Text>);
    expect(getByText(testMessage)).toBeTruthy();
  });
});
