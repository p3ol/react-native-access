export const warning = {
  color: 'red',
  marginTop: 10,
};

export const text = {
  fontSize: 16,
  lineHeight: 24,
};

export const icon = {
  fontSize: 16,
  fontFamily: 'Poool-Ico-2',
};

export const returnButton = {
  ...icon,
  top: 0,
};

export const desc = {
  ...text,
  marginBottom: 25,
  textAlign: 'center',

};

export const title = {
  fontSize: 22,
  fontWeight: 'bold',
  marginBottom: 20,
  textAlign: 'center',
};

export const label = {
  ...text,
  fontWeight: 'bold',
  marginTop: 10,
};

export const question = {
  ...text,
  fontWeight: 'bold',
};

export const signatureText = {
  ...text,
};

export const link = {
  ...text,
  textDecorationLine: 'underline',
};

export const subaction = {
  portrait: {
    ...link,
    textDecorationLine: 'underline',
  },
  landscape: {
    ...text,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 0.45,
    borderWidth: 1,
    borderColor: 'black',
  },
};

export const signatureLink = {
  ...link,
  fontWeight: 'bold',
  marginLeft: 10,
};
