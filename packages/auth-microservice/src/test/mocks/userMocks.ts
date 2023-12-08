export const UNCONFIRMED_USER = {
  email: 'unconfirmedUser@example.com',
  password: '$2b$10$HOY85vdVwPm4X8bUTtKky.1K.nhyq5tYxub5bhy9zvCw6EEmMY36G',
  username: 'unconfirmedUser',
  active: false,
  banned: false,
  activationCode: 'unconfirmed-user-activation-code'
}

export const ACTIVE_USER = {
  email: 'activeUser@example.com',
  password: '$2b$10$HOY85vdVwPm4X8bUTtKky.1K.nhyq5tYxub5bhy9zvCw6EEmMY36G',
  username: 'activeUser',
  active: true,
  banned: false,
  activationCode: 'active-user-activation-code',
  activatedAt: new Date()
}

export const BANNED_USER = {
  email: 'bannedUser@example.com',
  password: '$2b$10$HOY85vdVwPm4X8bUTtKky.1K.nhyq5tYxub5bhy9zvCw6EEmMY36G',
  username: 'bannedUser',
  active: true,
  banned: true,
  activationCode: 'banned-user-activation-code',
  activatedAt: new Date()
}

export const ALL_USERS_MOCK = [UNCONFIRMED_USER, ACTIVE_USER, BANNED_USER]
