import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  actions: {
    textAlign: 'center',
  },
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  logo: {
    height: 60,
    resizeMode: 'contain',
  },
  subaction: {
    marginBottom: 10,
    marginTop: 32,
    textDecorationLine: 'underline',
  },
  subactions_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    lineHeight: 22,
    marginBottom: 25,
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    textAlign: 'center',
  },
});
