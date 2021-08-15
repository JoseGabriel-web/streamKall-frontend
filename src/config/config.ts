export const NODE_ENV = process.env.NODE_ENV
export const API_URL_DEVELOPMENT = "http://localhost:3001"
export const API_URL_PRODUCTION = "https://streamkall-backend.herokuapp.com"
export const API_URL = NODE_ENV === 'production'? API_URL_PRODUCTION : API_URL_DEVELOPMENT