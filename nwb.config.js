module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false
  },
  webpack: {
    define: {
      __REACT_APP_LOADER_URL__: process.env.NODE_ENV === 'production' ?
        JSON.stringify('https://sdk.privacy-center.org/loader.js') :
        JSON.stringify('http://localhost:8080/sdk.js')
    }
  }
}