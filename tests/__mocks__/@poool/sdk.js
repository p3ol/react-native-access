const fetch = require('isomorphic-fetch');
module.exports = {
  // track: () => ({
  //   action: 'gift',
  //   styles: {},
  //   texts: {},
  // }),
  track: async () => {
    const response = await fetch('https://api.poool.local:8443/api/v3/access/track',
      { method: 'post' });
    return response.json();
  },

  setConfig: () => ({}),
};
