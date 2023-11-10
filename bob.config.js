module.exports = {
  source: 'src',
  output: 'dist',
  targets: [
    'commonjs',
    'module',
    ['typescript', { project: 'tsconfig.build.json' }],
  ],
  exclude: [
    '{example,scripts,ios,dist}/**',
    '*.config.js',
  ],
};
