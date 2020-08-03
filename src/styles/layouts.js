export const smallSpacing = {
  marginVertical: 5,
};

export const mediumSpacing = {
  marginVertical: 10,
};

export const largeSpacing = {
  marginVertical: 20,
};

export const subactions = {
  portrait: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  landscape: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
};

export const shadows = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.30,
  shadowRadius: 10,
};

export const border = color => {
  return { borderLeftColor: color };
};

export const paywall = {
  portrait: {
    top: -50,
    borderLeftWidth: 6,
    margin: 'auto',
    marginHorizontal: 30,
  },
  landscape: {
    top: -50,
  },
};

export const paywallBackground = {
  resizeMode: 'cover',
};

export const wrapper = {
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 20,
  ...shadows,
};

export const widget = {
  paddingHorizontal: 30,
  paddingVertical: 40,
};

export const logo = {
  height: 70,
  marginTop: -50,
  resizeMode: 'contain',
};

export const cover = {
  height: 90,
  marginHorizontal: -20,
};

export const pooolLogo = {
  flexDirection: 'row-reverse',
};

export const pooolLogoBackground = {
  bottom: 10,
  height: 12,
  right: 10,
  width: 50,
};

export const answer = {
  ...mediumSpacing,
  backgroundColor: '#eee',
  borderColor: '#567',
  borderWidth: 1,
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 4,
};
