export interface IUser {
  username: string
  email: string
  password: string
  activationCode: string
  isActivated: boolean
  isAdmin: boolean
  isBanned: boolean
  createdAt?: Date
  activatedAt?: Date
  bannedAt?: Date
  lastLoginDate?: Date
}

export type UserType = Pick<
  IUser,
  | 'username'
  | 'email'
  | 'isActivated'
  | 'isAdmin'
  | 'isBanned'
  | 'createdAt'
  | 'activatedAt'
  | 'bannedAt'
  | 'lastLoginDate'
>

export type CreateUserData = {
  email: string
  username: string
  password: string
}

export type activateUserData = {
  activationCode: string
}

export type loginData = {
  email: string
  password: string
}

export type createUserResponseType = { user: UserType }
export type userActivationResponseType = { user: UserType }
export type LoginResponseType = { user: UserType; sessionToken: string }
export type getUserResponseType = { user: UserType }
