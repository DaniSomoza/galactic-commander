import { createBrowserRouter } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ActivateUserPage from '../pages/ActivateUserPage'
import CreatePlayerPage from '../pages/CreatePlayer'

// frontend paths
export const DASHBOARD_PATH = '/'
export const LOGIN_PATH = '/login'
export const REGISTER_PATH = '/register'
export const ACTIVATE_USER_PATH = '/user/activate'
export const CREATE_PLAYER_PATH = '/create-player'

export const FRONTEND_PATHS = [
  DASHBOARD_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  ACTIVATE_USER_PATH,
  CREATE_PLAYER_PATH
]

const router = createBrowserRouter([
  {
    path: DASHBOARD_PATH,
    element: <HomePage />
  },
  {
    path: LOGIN_PATH,
    element: <LoginPage />
  },
  {
    path: REGISTER_PATH,
    element: <RegisterPage />
  },
  {
    path: ACTIVATE_USER_PATH,
    element: <ActivateUserPage />
  },
  {
    path: CREATE_PLAYER_PATH,
    element: <CreatePlayerPage />
  }
])

export default router
