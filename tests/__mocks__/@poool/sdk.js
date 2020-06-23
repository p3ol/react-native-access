const fetch = require('isomorphic-fetch');
module.exports = {
  track: async () => {
    const response = await fetch(
      'https://api.poool.develop:8443/api/v3/access/track',
      { method: 'post' }
    );
    return response.json();
  },
  setConfig: () => ({}),
  unlock: () => ({}),
  register: () => ({}),
};
