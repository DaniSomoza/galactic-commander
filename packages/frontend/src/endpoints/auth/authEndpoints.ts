import Api from '../Api'

const authBaseEndpoint = import.meta.env.VITE_AUTH_SERVICE_ORIGIN

// TODO: extract user paths from auth-microservice/dist

export async function registerUser(username: string, email: string, password: string) {
  const registerEndpoint = `${authBaseEndpoint}/user`

  const payload = { username, email, password }

  return Api.post(registerEndpoint, payload)
}

export async function activateUser(activationCode: string) {
  const activateEndpoint = `${authBaseEndpoint}/user/activate`

  const payload = { activationCode }

  return Api.post(activateEndpoint, payload)
}

export async function login(email: string, password: string) {
  const registerEndpoint = `${authBaseEndpoint}/user/session`

  const payload = { email, password }

  const response = await Api.post(registerEndpoint, payload)

  const { sessionToken } = response.data

  Api.setSessionToken(sessionToken)

  return response
}
