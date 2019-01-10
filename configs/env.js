'use strict'

const endpointEnv = process.env.ENDPOINT_ENV || 'cf'

const ENV = {
  AXIOS_BASE_URL: process.env.AXIOS_BASE_URL || 'https://j06qak8vmc.execute-api.ap-northeast-1.amazonaws.com/Prod',
  STAGE: 'Prod',
  BASE_URL: '',
  ENDPOINT_ENV: endpointEnv,
  NODE_ENV: process.env.NODE_ENV || ''
}

if (endpointEnv === 'api_gw') {
  ENV.BASE_URL = `/${ENV.STAGE}/`
}

// for serverless.yml
const exporter = () => {
  return ENV
}

module.exports = {
  ENV,
  exporter
}
