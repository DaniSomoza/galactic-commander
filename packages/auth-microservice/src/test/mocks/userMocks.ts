import { IUser } from '../../models/UserModel'

export const UNCONFIRMED_USER: IUser = {
  email: 'unconfirmedUser@example.com',
  password: '$2b$10$cxNGyMi0zmypkmpaT9hnhexRdr2B/.0sw92ws4D5vD74HPxYgILb.',
  username: 'unconfirmedUser',
  isActivated: false,
  isBanned: false,
  isAdmin: false,
  activationCode: 'unconfirmed-user-activation-code'
}

export const ACTIVE_USER: IUser = {
  email: 'activeUser@example.com',
  password: '$2b$10$cxNGyMi0zmypkmpaT9hnhexRdr2B/.0sw92ws4D5vD74HPxYgILb.',
  username: 'activeUser',
  isActivated: true,
  isBanned: false,
  isAdmin: false,
  activationCode: 'active-user-activation-code',
  activatedAt: new Date()
}

export const BANNED_USER: IUser = {
  email: 'bannedUser@example.com',
  password: '$2b$10$cxNGyMi0zmypkmpaT9hnhexRdr2B/.0sw92ws4D5vD74HPxYgILb.',
  username: 'bannedUser',
  isActivated: true,
  isBanned: true,
  isAdmin: false,
  activationCode: 'banned-user-activation-code',
  activatedAt: new Date()
}

export const ALL_USERS_MOCK = [UNCONFIRMED_USER, ACTIVE_USER, BANNED_USER]
