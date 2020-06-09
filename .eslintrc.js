module.exports = {
  extends: [
    'standard',
    'prettier',
    'prettier/standard',
    'plugin:jest/recommended'
  ],
  plugins: ['prettier', 'jest'],
  env: {
    node: true
  }
}