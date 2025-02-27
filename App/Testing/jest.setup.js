import '@testing-library/jest-native';

global.window = global;

jest.mock('react-native', () => ({
  Platform: {
    select: jest.fn(x => x.default)
  },
  NativeModules: {},
  Text: 'Text',
  View: 'View'
}));
