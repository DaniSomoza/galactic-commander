import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { ALL_USERS_MOCK } from './mocks/userMocks'
import UserModel from '../models/UserModel'
import Server from '../configuration/Server'
import authRoutes from '../routes/authRoutes'

jest.mock('../lib/email', () => ({
  sendEmail: jest.fn().mockResolvedValue(true)
}))

// initialize database
let mongoTestDB = new MongoMemoryServer()

export async function connectToTestDatabase() {
  mongoTestDB = await MongoMemoryServer.create()
  const mongoUri = await mongoTestDB.getUri()
  await mongoose.connect(mongoUri)
}

export async function disconnectToTestDatabase() {
  await mongoose.disconnect()
  await mongoTestDB.stop()
}

export async function mockTestDatabase() {
  await Promise.all([...ALL_USERS_MOCK.map((user) => UserModel.create(user))])
}

export async function restoreTestDatabase() {
  await Promise.all([UserModel.deleteMany({})])
}

// initialize server
const serverOptions = {
  logger: false
}

export const testServer = new Server(serverOptions)
testServer.addRoutes(authRoutes)
const port = 3_000
const host = '0.0.0.0'
testServer.start(host, port)
testServer.configureCors(['http://localhost:3000'])

beforeAll(async () => {
  await connectToTestDatabase()
})

beforeEach(mockTestDatabase)

afterEach(restoreTestDatabase)

afterAll(async () => {
  await disconnectToTestDatabase()
  await testServer.server.close()
})
