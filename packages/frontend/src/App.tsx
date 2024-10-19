import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import {
  ACTIVATE_USER_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  GAME_CREATE_PLAYER_PATH,
  GAME_DASHBOARD_PATH,
  GAME_RESEARCHES_PATH,
  GAME_RESOURCES_PATH,
  GAME_SPECIALS_PATH,
  GAME_TROOPS_PATH,
  GAME_SHIPS_PATH,
  GAME_DEFENSES_PATH,
  GAME_ALLIANCE_PATH,
  GAME_GALAXIES_PATH,
  GAME_MESSAGES_PATH,
  GAME_RANKING_PATH,
  GAME_SETTINGS_PATH,
  GAME_BATTLE_CALCULATOR_PATH,
  GAME_TASKS_PATH
} from './routes/routes'
import Header from './components/header/Header'
import { ThemeProvider } from './store/ThemeContext'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ActivateUserPage from './pages/auth/ActivateUserPage'
import GamePage from './pages/game/GamePage'
import CreatePlayerPage from './pages/game/CreatePlayer'
import { AuthorizationProvider } from './store/AuthorizationContext'
import GameDashboardPage from './pages/game/GameDashboardPage'
import GameResearchPage from './pages/game/GameResearchPage'
import GameResourcesPage from './pages/game/GameResourcesPage'
import GameSpecialsPage from './pages/game/GameSpecialsPage'
import GameTroopsPage from './pages/game/GameTroopsPage'
import GameShipsPage from './pages/game/GameShipsPage'
import GameDefensesPage from './pages/game/GameDefensesPage'
import GameAlliancePage from './pages/game/GameAlliancePage'
import GameGalaxiesPage from './pages/game/GameGalaxiesPage'
import GameMessagesPage from './pages/game/GameMessagesPage'
import GameRankingPage from './pages/game/GameRankingPage'
import GameSettingsPage from './pages/settings/GameSettingsPage'
import BattleCalculator from './pages/tools/BattleCalculatorPage'
import GameTasksPage from './pages/game/GameTasksPage'

function App() {
  return (
    <ThemeProvider>
      <AuthorizationProvider>
        <Header />
        <RouterProvider router={AppRoutes} />
      </AuthorizationProvider>
    </ThemeProvider>
  )
}

const AppRoutes = createBrowserRouter([
  {
    path: GAME_DASHBOARD_PATH,
    element: <GamePage />,
    children: [
      {
        path: GAME_DASHBOARD_PATH,
        element: <GameDashboardPage />
      },
      {
        path: GAME_CREATE_PLAYER_PATH,
        element: <CreatePlayerPage />
      },
      {
        path: GAME_RESEARCHES_PATH,
        element: <GameResearchPage />
      },
      {
        path: GAME_RESOURCES_PATH,
        element: <GameResourcesPage />
      },
      {
        path: GAME_SPECIALS_PATH,
        element: <GameSpecialsPage />
      },
      {
        path: GAME_TROOPS_PATH,
        element: <GameTroopsPage />
      },
      {
        path: GAME_SHIPS_PATH,
        element: <GameShipsPage />
      },
      {
        path: GAME_DEFENSES_PATH,
        element: <GameDefensesPage />
      },
      {
        path: GAME_ALLIANCE_PATH,
        element: <GameAlliancePage />
      },
      {
        path: GAME_GALAXIES_PATH,
        element: <GameGalaxiesPage />
      },
      {
        path: GAME_MESSAGES_PATH,
        element: <GameMessagesPage />
      },
      {
        path: GAME_RANKING_PATH,
        element: <GameRankingPage />
      },
      {
        path: GAME_SETTINGS_PATH,
        element: <GameSettingsPage />
      },
      {
        path: GAME_BATTLE_CALCULATOR_PATH,
        element: <BattleCalculator />
      },
      {
        path: GAME_TASKS_PATH,
        element: <GameTasksPage />
      }
    ]
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
  }
])

export default App
