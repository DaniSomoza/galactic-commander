import { RouterProvider } from 'react-router-dom'

import router from './routes/routes'
import Header from './components/header/Header'
import { ThemeProvider } from './store/ThemeContext'

function App() {
  return (
    <>
      <ThemeProvider>
        <Header />

        <RouterProvider router={router} />

        {/* <footer>Footer</footer> */}
      </ThemeProvider>
    </>
  )
}

export default App
