import axios from 'axios'
import router from '@/router'
// import '@/libs/toastification'
import localstorageService from '../localstorage/localstorage.service'

const jwtConfig = {
  // Endpoints
  loginEndpoint: '/api/login',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',
  tokenType: 'Bearer',
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
// const nodejsApiUrl ='http://0.0.0.0:4445/api/v1/'
const nodejsApiUrl ='https://hiretopbackend.netlify.app/api/v1/'



const redirectToLogin = data => {
  const currentRoutePath = router.history.current.path

  const errorCode = (data && data.statusCode) || ''
  const params = {
    ...(errorCode === 401 && { redirectMotive: 'sessionExpired' }),
    redirectFrom: currentRoutePath,
  }

  if (currentRoutePath !== '/login') {

    localstorageService.clearAuthData()
    return router.push({
      name: 'auth-login',
      params,
    })
  }
  return true
}

const servers = {
  laravel: {
    baseUrl: '',
    ...jwtConfig,
  },
  nodejs: {
    baseURL: nodejsApiUrl,
    tokenType: 'Bearer ',
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mjk2NTFkZmMwYWQ3NDBiNzkxNzdmZGEiLCJpYXQiOjE2NTUxMzY1NDMsImV4cCI6MTY1NTc0MTM0M30.HfjHyQzqUhcXHYqjYlLWfeJfNuMmwI7ku8B2wh73KkI',
    storageTokenKeyName: 'accessToken_nodejs',
    Authorization: 'Bearer '
            + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Mjk2NTFkZmMwYWQ3NDBiNzkxNzdmZGEiLCJpYXQiOjE2NTQwNzAwMjIsImV4cCI6MTY1NDY3NDgyMn0.W4PSvguCyyZLfNAKUIprrbocTUGjqHjTtFzvDHdSLo4',
  },
}

const initNodejsAxiosCLient = () => {
  const axiosClient = axios.create({
    baseURL: servers.nodejs.baseURL,
  })
  axiosClient.interceptors.request.use(
    config => {
      const { accessToken } = servers.nodejs
      // If token is present add it to request's Authorization Header
      if (accessToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `${servers.nodejs.tokenType} ${accessToken}`
      }
      return config
    },
    error => Promise.reject(error),
  )

  return axiosClient
}
// eslint-disable-next-line no-unused-vars
const initLaravelAxiosClient = () => {
  const axiosClient = axios.create({})

  // Request Interceptor
  axiosClient.interceptors.request.use(
    config => {
      const accessToken = localstorageService.getJwtToken()
      // If token is present add it to request's Authorization Header
      if (accessToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`
      }
      return config
    },
    error => Promise.reject(error),
  )

  // Add request/response interceptor
  axiosClient.interceptors.response.use(
    response => response,
    error => {
      // eslint-disable-next-line no-unused-vars
      const { config, response } = error
      // if (status === 401) {
      if (response && response.status === 401) {
        // redirect to login
        redirectToLogin({ statusCode: 401 })
      }
      return Promise.reject(error)
    },
  )
  return axiosClient
}

const initMainAxiosClient = () => {
  const { baseURL, tokenType } = servers.nodejs
  const axiosClient = axios.create({ baseURL })
  // Request Interceptor
  axiosClient.interceptors.request.use(
    config => {
      const accessToken = localstorageService.getJwtToken()
      // If token is present add it to request's Authorization Header
      if (accessToken) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `${tokenType} ${accessToken}`
      }
      return config
    },
    error => Promise.reject(error),
  )

  // Add request/response interceptor
  axiosClient.interceptors.response.use(
    response => response,
    error => {
      // eslint-disable-next-line no-unused-vars
      const { config, response } = error
      // if (status === 401) {

      // if (response && response.status === 401) {
      //   // redirect to login
      //   redirectToLogin({ statusCode: 401 })
      // }
      return Promise.reject((error.response && error.response.data) || error)
    },
  )

  return axiosClient
}

export class BaseService {
    $router

    axiosInstance = initMainAxiosClient()

    nodejsAxiosInstance = initNodejsAxiosCLient()

    nodejsApiUrl = nodejsApiUrl

    constructor() {
      this.$router = router
    }
}

// TODO: add more interceptors

export const AppHttpModule = {
  axiosClient: initMainAxiosClient(),
  jwtConfig,
}
