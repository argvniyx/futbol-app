const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
        env: {
            API_URL: 'http://localhost:5001/futbol-app-8b521/us-central1/app'
        }
    }
  }

  return {
      env: {
          API_URL: 'https://us-central1-futbol-app-8b521.cloudfunctions.net/'
      }
  }
}
