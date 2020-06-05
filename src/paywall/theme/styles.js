import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  p3_actions: {
    textAlign: 'center',
  },
  p3_container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  p3_logo: {
    height: 60,
    resizeMode: 'contain',
  },
  p3_subaction: {
    marginBottom: 10,
    marginTop: 32,
    textDecorationLine: 'underline',
  },
  p3_subactions_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  p3_text: {
    lineHeight: 22,
    marginBottom: 25,
    textAlign: 'center',
  },
  p3_title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    textAlign: 'center',
  },
});
