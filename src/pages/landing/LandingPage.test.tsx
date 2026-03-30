import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { vi } from "vitest"
import { LandingPage } from "./LandingPage"

const navigateMock = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom")
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

describe("LandingPage", () => {
  beforeEach(() => {
    navigateMock.mockReset()
  })

  it("shows the primary and secondary entry CTAs", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole("button", { name: /upload pdf/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /create new document/i })).toBeInTheDocument()
  })

  it("opens file picker first, then navigates with selected pdf", async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )

    const fileInput = screen.getByLabelText(/select pdf file/i)
    const clickSpy = vi.spyOn(fileInput, "click")

    await user.click(screen.getByRole("button", { name: /upload pdf/i }))
    expect(clickSpy).toHaveBeenCalledTimes(1)
    expect(navigateMock).not.toHaveBeenCalled()

    const pickedFile = new File(["%PDF"], "picked.pdf", { type: "application/pdf" })
    await user.upload(fileInput, pickedFile)

    expect(navigateMock).toHaveBeenCalledWith("/editor", {
      state: { initialPdfFile: pickedFile },
    })
  })
})
