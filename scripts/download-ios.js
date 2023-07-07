const https = require('https');
const fs = require('fs');
const crypto = require('crypto');

const unzip = require('unzipper');

const pkg = require('../package.json');

(async () => {
  const hash = crypto.createHash('sha256');

  https.get(pkg.poool.ios.url, response => {
    response.pipe(unzip.Extract({ path: 'ios' }))
    response.on('data', data => {
      hash.update(data);
    });
    response.on('end', () => {
      const resultHash = hash.digest('hex');
      if (resultHash !== pkg.poool.ios.sha256) {
        console.error('Hash mismatch, found', resultHash, 'expected', pkg.poool.ios.sha256);
        process.exit(1);
      }
    });
  });
})();
