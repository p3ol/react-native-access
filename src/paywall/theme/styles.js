import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  p3_container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  p3_logo: {
    height: 60,
    resizeMode: 'center',
  },
  p3_title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  p3_text: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  p3_actions: {
    textAlign: 'center',
  },
  p3_subactions: {
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
});
