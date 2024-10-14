import { AxiosResponse } from 'axios'

import {
  LoginResponseType,
  getUserResponseType,
  createUserResponseType,
  userActivationResponseType,
  CreateUserData
} from 'auth-microservice/src/types/User'
import {
  USER_PATH,
  ACTIVATE_USER_PATH,
  LOGIN_USER_PATH
} from 'auth-microservice/src/routes/constants'

import Api from '../Api'

const authBaseEndpoint = import.meta.env.VITE_AUTH_SERVICE_ORIGIN

export async function registerUser(
  username: string,
  email: string,
  password: string
): Promise<AxiosResponse<createUserResponseType>> {
  const registerEndpoint = `${authBaseEndpoint}${USER_PATH}`

  const payload: CreateUserData = { username, email, password }

  return Api.post<createUserResponseType, typeof payload>(registerEndpoint, payload)
}

export async function activateUser(
  activationCode: string
): Promise<AxiosResponse<userActivationResponseType>> {
  const activateEndpoint = `${authBaseEndpoint}${ACTIVATE_USER_PATH}`

  const payload = { activationCode }

  return Api.post<userActivationResponseType, typeof payload>(activateEndpoint, payload)
}

export async function login(
  email: string,
  password: string
): Promise<AxiosResponse<LoginResponseType>> {
  const registerEndpoint = `${authBaseEndpoint}${LOGIN_USER_PATH}`

  const payload = { email, password }

  return await Api.post<LoginResponseType, typeof payload>(registerEndpoint, payload)
}

export async function getUser(): Promise<AxiosResponse<getUserResponseType>> {
  const registerEndpoint = `${authBaseEndpoint}${USER_PATH}`

  return await Api.get<getUserResponseType>(registerEndpoint)
}
