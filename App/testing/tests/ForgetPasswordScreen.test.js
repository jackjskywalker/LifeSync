// ForgotPasswordScreen.test.js
// Jacob Marshall, last edited 3/6/2025

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';

describe('ForgotPasswordScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <ForgotPasswordScreen navigation={mockNavigation} />
    );

    // Check if the title is rendered
    expect(getByText('Forgot Password')).toBeTruthy();
    // Check if the email input is rendered
    expect(getByPlaceholderText('Email Address')).toBeTruthy();
    // Check if the reset button is rendered
    expect(getByText('Reset Password')).toBeTruthy();
    // Check if the back to login link is rendered
    expect(getByText('Back to Login')).toBeTruthy();
  });

  it('updates email input value', () => {
    const { getByPlaceholderText } = render(
      <ForgotPasswordScreen navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholderText('Email Address');
    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('displays error message when reset password is pressed', () => {
    const { getByText } = render(
      <ForgotPasswordScreen navigation={mockNavigation} />
    );

    // Press the reset password button
    fireEvent.press(getByText('Reset Password'));

    // Check if the error message is displayed
    expect(getByText('Password reset link sent to your email')).toBeTruthy();
  });

  it('navigates back to login when back to login link is pressed', () => {
    const { getByText } = render(
      <ForgotPasswordScreen navigation={mockNavigation} />
    );

    // Press the back to login link
    fireEvent.press(getByText('Back to Login'));

    // Check if the navigate function was called
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });
});