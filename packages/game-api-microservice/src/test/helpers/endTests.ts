import { testServer } from './testServer'

export default async () => {
  await testServer.server.close()
}
