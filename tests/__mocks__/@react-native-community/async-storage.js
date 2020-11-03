export default {
  cookies: {},
  getItem: function (name) { return this.cookies[name]; },
  setItem: function (name, value) { this.cookies[name] = value; },
  removeItem: function (name) { delete this.cookies[name]; },
};
