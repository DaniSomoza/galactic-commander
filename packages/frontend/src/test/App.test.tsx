import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
// // import userEvent from '@testing-library/user-event'
// import '@testing-library/jest-dom'

import App from '../App'
import Api from '../endpoints/Api'

test('loads and displays the App Dashboard', async () => {
  // TODO: implement properly the tests
  vi.spyOn(Api.axiosInstance, 'get').mockImplementation(() =>
    Promise.resolve({ data: { universes: [], races: [] } })
  )
  vi.spyOn(Api.axiosInstance, 'post').mockImplementation(() =>
    Promise.resolve({ data: 'mocked data' })
  )

  render(<App />)

  const element = screen.getByText(/Galactic Commander/i)
  expect(element).toBeInTheDocument()
})
