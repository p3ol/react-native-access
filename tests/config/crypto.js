const crypto = require('crypto');
//Object.defineProperty(global.crypto, 'getRandomValues', { value: crypto.getRandomValues });
Object.defineProperty(global, 'crypto', { value: crypto });
Object.defineProperty(global.crypto, 'getRandomValues', { value: arr => crypto.randomBytes(arr.length), configurable: true });
