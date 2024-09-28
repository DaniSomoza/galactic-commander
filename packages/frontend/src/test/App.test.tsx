import { render, screen } from '@testing-library/react'
// // import userEvent from '@testing-library/user-event'
// import '@testing-library/jest-dom'

import App from '../App'

test('loads and displays the App Dashboard', async () => {
  render(<App />)

  const element = screen.getByText(/Home Page/i)
  expect(element).toBeInTheDocument()
})
