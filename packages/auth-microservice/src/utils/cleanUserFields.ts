import { IUser } from "../models/UserModel";

export type CleanUserData = Pick<
  IUser,
  | "username"
  | "email"
  | "isActivated"
  | "isAdmin"
  | "isBanned"
  | "createdAt"
  | "activatedAt"
  | "bannedAt"
  | "lastLoginDate"
>;

// TODO: add Jsdoc

function cleanUserFields(user: IUser): CleanUserData {
  const {
    username,
    email,
    isActivated,
    isAdmin,
    isBanned,
    createdAt,
    activatedAt,
    bannedAt,
    lastLoginDate,
  } = user;

  return {
    username,
    email,
    isActivated,
    isAdmin,
    isBanned,
    createdAt,
    activatedAt,
    bannedAt,
    lastLoginDate,
  };
}

export default cleanUserFields;
