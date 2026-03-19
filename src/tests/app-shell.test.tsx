import { render, screen } from '@testing-library/react'
import { App } from '../app/App'

describe('Marketing landing', () => {
  it('renders hero and key sections', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /edit pdfs easily and quickly/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /how pdf editor works/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /work with pdfs/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /upload to convert/i })).toBeInTheDocument()
  })
})
