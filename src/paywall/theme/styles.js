import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  actions: {
    textAlign: 'center',
  },
  authorization: {
    marginBottom: 10,
    marginTop: 30,
    textDecorationLine: 'underline',
  },
  backButton: {
    marginTop: -25,
    position: 'abslute',
  },
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#567',
    borderWidth: 1,
    height: 40,

    paddingLeft: 10,
  },
  inputCorrect: {
    backgroundColor: '#E9FBE2',
    borderColor: '#168212',
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
  },
  inputWarning: {
    color: 'red',
  },
  inputWrong: {
    backgroundColor: '#ffebee',
    borderColor: '#d0021b',
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
  },
  logo: {
    height: 60,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  newsletterDataInfos: {
    marginBottom: 30,
  },
  newsletterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 26,
    marginTop: 10,
  },
  newsletterText: {
    fontWeight: 'normal',
  },
  subaction: {
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  subactions_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
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
    textAlign: 'center',
  },
});
