import { IUser, UserType } from '../types/User'

// TODO: add Jsdoc
function cleanUserFields(user: IUser): UserType {
  const {
    username,
    email,
    isActivated,
    isAdmin,
    isBanned,
    createdAt,
    activatedAt,
    bannedAt,
    lastLoginDate
  } = user

  return {
    username,
    email,
    isActivated,
    isAdmin,
    isBanned,
    createdAt,
    activatedAt,
    bannedAt,
    lastLoginDate
  }
}

export default cleanUserFields
