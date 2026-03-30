import pdfbotLogo from "../../../assets/pdfbot-logo.svg"

export function EditorBottomRightUtilities() {
  return (
    <div className="fixed bottom-4 right-6 flex items-center gap-3" data-testid="editor-utility-cluster">
      <div className="relative">
        <button
          data-slot="button"
          className="border-grey-300 hover:bg-grey-200 hover:border-grey-400 disabled:border-grey-400 disabled:text-grey-400 text-primary focus-visible:border-primary active:bg-grey-300 active:border-grey-500 focus-visible:bg-white relative inline-flex size-8 shrink-0 items-center justify-center whitespace-nowrap rounded-lg border text-sm font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-5"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="editor-performance-panel"
          data-state="closed"
          aria-label="Performance panel"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3333 7.5H1.66666M11.6667 14.5833L13.75 12.5L11.6667 10.4167M8.33332 10.4167L6.24999 12.5L8.33332 14.5833M1.66666 6.5L1.66666 13.5C1.66666 14.9001 1.66666 15.6002 1.93914 16.135C2.17882 16.6054 2.56127 16.9878 3.03168 17.2275C3.56646 17.5 4.26652 17.5 5.66665 17.5H14.3333C15.7335 17.5 16.4335 17.5 16.9683 17.2275C17.4387 16.9878 17.8212 16.6054 18.0608 16.135C18.3333 15.6002 18.3333 14.9001 18.3333 13.5V6.5C18.3333 5.09987 18.3333 4.3998 18.0608 3.86502C17.8212 3.39462 17.4387 3.01217 16.9683 2.77248C16.4335 2.5 15.7335 2.5 14.3333 2.5L5.66666 2.5C4.26653 2.5 3.56646 2.5 3.03168 2.77248C2.56128 3.01217 2.17882 3.39462 1.93914 3.86502C1.66666 4.3998 1.66666 5.09987 1.66666 6.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="relative">
        <button
          data-slot="button"
          className="border-grey-300 hover:bg-grey-200 hover:border-grey-400 disabled:border-grey-400 disabled:text-grey-400 text-primary focus-visible:border-primary active:bg-grey-300 active:border-grey-500 focus-visible:bg-white relative inline-flex size-8 shrink-0 items-center justify-center whitespace-nowrap rounded-lg border text-sm font-semibold transition-colors focus-visible:outline-none disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-5"
          type="button"
          aria-label="Open help"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.57501 7.50033C7.77093 6.94338 8.15763 6.47375 8.66663 6.1746C9.17564 5.87546 9.77409 5.76611 10.356 5.86592C10.9379 5.96573 11.4657 6.26826 11.8459 6.71993C12.2261 7.1716 12.4342 7.74326 12.4333 8.33366C12.4333 10.0003 9.93334 10.8337 9.93334 10.8337M10 14.167H10.0083M18.3333 10.0003C18.3333 14.6027 14.6024 18.3337 10 18.3337C5.39763 18.3337 1.66667 14.6027 1.66667 10.0003C1.66667 5.39795 5.39763 1.66699 10 1.66699C14.6024 1.66699 18.3333 5.39795 18.3333 10.0003Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <a href="/">
        <img alt="Company logo" width="174" height="28" src={pdfbotLogo} />
      </a>
    </div>
  )
}
