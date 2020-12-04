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
  getQuestion: async () => {
    const response = await fetch(
      'https://api.poool.develop:8443/api/v3/access/question',
      { method: 'get' }
    );

    return response.json();
  },
  postAnswer: async () => {
    const response = await fetch(
      'https://api.poool.develop:8443/api/v3/access/question/answer',
      { method: 'post' }
    );

    return response.json();
  },
  getStripeToken: async () => {
    const response = await fetch(
      'https://api.poool.develop:8443/api/v3/access/form/pay',
      { method: 'post' }
    );

    return response.json();
  },
};
