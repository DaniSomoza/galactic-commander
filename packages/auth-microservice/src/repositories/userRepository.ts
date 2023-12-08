import UserModel, { IUser } from '../models/UserModel'

// TODO: Add JSdoc for each function

async function findUserByUsername(username: string) {
  return UserModel.findOne({ username }).lean().exec()
}

async function findUserByEmail(email: string) {
  return UserModel.findOne({ email }).lean().exec()
}

async function createUser(userData: IUser) {
  const newUser = new UserModel(userData)
  return newUser.save()
}

async function findUserByActivationCode(activationCode: string) {
  return UserModel.findOne({ activationCode }).lean().exec()
}

async function updateUser(userId: string, updateData: Partial<IUser>) {
  return UserModel.findByIdAndUpdate(userId, updateData, { new: true }).lean().exec()
}

const userRepository = {
  findUserByUsername,
  findUserByEmail,
  createUser,
  findUserByActivationCode,
  updateUser
}

export default userRepository
