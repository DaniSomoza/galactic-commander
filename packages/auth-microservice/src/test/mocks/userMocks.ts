import { IUser } from '../../models/UserModel'

export const UNCONFIRMED_USER: IUser = {
  email: 'unconfirmedUser@example.com',
  password: '$2b$10$HOY85vdVwPm4X8bUTtKky.1K.nhyq5tYxub5bhy9zvCw6EEmMY36G',
  username: 'unconfirmedUser',
  isActivated: false,
  isBanned: false,
  isAdmin: false,
  activationCode: 'unconfirmed-user-activation-code'
}

export const ACTIVE_USER: IUser = {
  email: 'activeUser@example.com',
  password: '$2b$10$HOY85vdVwPm4X8bUTtKky.1K.nhyq5tYxub5bhy9zvCw6EEmMY36G',
  username: 'activeUser',
  isActivated: true,
  isBanned: false,
  isAdmin: false,
  activationCode: 'active-user-activation-code',
  activatedAt: new Date()
}

export const BANNED_USER: IUser = {
  email: 'bannedUser@example.com',
  password: '$2b$10$HOY85vdVwPm4X8bUTtKky.1K.nhyq5tYxub5bhy9zvCw6EEmMY36G',
  username: 'bannedUser',
  isActivated: true,
  isBanned: true,
  isAdmin: false,
  activationCode: 'banned-user-activation-code',
  activatedAt: new Date()
}

export const ALL_USERS_MOCK = [UNCONFIRMED_USER, ACTIVE_USER, BANNED_USER]
