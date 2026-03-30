import { useState } from "react"
import { editorToolbarTools, type EditorToolId } from "../config/editor-shell-mock"

interface EditorFloatingToolbarProps {
  activeTool: EditorToolId
  onToolChange: (toolId: EditorToolId) => void
}

export function EditorFloatingToolbar({ activeTool, onToolChange }: EditorFloatingToolbarProps) {
  let previousGroup: string | null = null
  const [showHint, setShowHint] = useState(false)

  const renderToolIcon = (toolId: EditorToolId) => {
    switch (toolId) {
      case "secure":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M17 10V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V10M12 14.5V16.5M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C17.7202 10 16.8802 10 15.2 10H8.8C7.11984 10 6.27976 10 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "pointer":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4.40701 3.41403C3.94876 3.27925 3.71963 3.21186 3.56363 3.27001C3.42768 3.32069 3.32045 3.42793 3.26977 3.56387C3.21162 3.71988 3.27901 3.949 3.41379 4.40726L7.61969 18.7073C7.74493 19.1332 7.80756 19.3461 7.93395 19.4449C8.04424 19.5312 8.18564 19.5672 8.32377 19.5443C8.48206 19.5181 8.639 19.3611 8.95286 19.0473L11.9999 16.0002L16.4343 20.4345C16.6323 20.6325 16.7313 20.7315 16.8454 20.7686C16.9459 20.8012 17.054 20.8012 17.1545 20.7686C17.2686 20.7315 17.3676 20.6325 17.5656 20.4345L20.4343 17.5659C20.6323 17.3679 20.7313 17.2689 20.7684 17.1547C20.801 17.0543 20.801 16.9461 20.7684 16.8457C20.7313 16.7315 20.6323 16.6325 20.4343 16.4345L15.9999 12.0002L19.047 8.95311C19.3609 8.63924 19.5178 8.48231 19.5441 8.32402C19.567 8.18589 19.5309 8.04448 19.4447 7.93419C19.3458 7.8078 19.1329 7.74518 18.7071 7.61993L4.40701 3.41403Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "text":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 7C4 6.06812 4 5.60218 4.15224 5.23463C4.35523 4.74458 4.74458 4.35523 5.23463 4.15224C5.60218 4 6.06812 4 7 4H17C17.9319 4 18.3978 4 18.7654 4.15224C19.2554 4.35523 19.6448 4.74458 19.8478 5.23463C20 5.60218 20 6.06812 20 7M9 20H15M12 4V20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "image":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4.27209 20.7279L10.8686 14.1314C11.2646 13.7354 11.4627 13.5373 11.691 13.4632C11.8918 13.3979 12.1082 13.3979 12.309 13.4632C12.5373 13.5373 12.7354 13.7354 13.1314 14.1314L19.6839 20.6839M14 15L16.8686 12.1314C17.2646 11.7354 17.4627 11.5373 17.691 11.4632C17.8918 11.3979 18.1082 11.3979 18.309 11.4632C18.5373 11.5373 18.7354 11.7354 19.1314 12.1314L22 15M10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9ZM6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27976 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H6.8C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8V16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "draw":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M17.9995 13L10.9995 6.00004M20.9995 21H7.99955M10.9368 20.0628L19.6054 11.3941C20.7935 10.2061 21.3875 9.61207 21.6101 8.92709C21.8058 8.32456 21.8058 7.67551 21.6101 7.07298C21.3875 6.388 20.7935 5.79397 19.6054 4.60592L19.3937 4.39415C18.2056 3.2061 17.6116 2.61207 16.9266 2.38951C16.3241 2.19373 15.675 2.19373 15.0725 2.38951C14.3875 2.61207 13.7935 3.2061 12.6054 4.39415L4.39366 12.6059C3.20561 13.794 2.61158 14.388 2.38902 15.073C2.19324 15.6755 2.19324 16.3246 2.38902 16.9271C2.61158 17.6121 3.20561 18.2061 4.39366 19.3941L5.06229 20.0628C5.40819 20.4087 5.58114 20.5816 5.78298 20.7053C5.96192 20.815 6.15701 20.8958 6.36108 20.9448C6.59126 21 6.83585 21 7.32503 21H8.67406C9.16324 21 9.40784 21 9.63801 20.9448C9.84208 20.8958 10.0372 20.815 10.2161 20.7053C10.418 20.5816 10.5909 20.4087 10.9368 20.0628Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "shape":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 10.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12.5M12.5 11H8M11.5 15H8M16 7H8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.405 18.3892C14.4403 18.2127 14.458 18.1244 14.4903 18.0421C14.5189 17.969 14.5561 17.8996 14.601 17.8352C14.6516 17.7626 14.7152 17.699 14.8426 17.5717L19 13.4142C19.5523 12.8619 20.4477 12.8619 21 13.4142C21.5523 13.9665 21.5523 14.8619 21 15.4142L16.8426 19.5717C16.7152 19.699 16.6516 19.7626 16.579 19.8132C16.5147 19.8581 16.4452 19.8953 16.3721 19.924C16.2898 19.9563 16.2015 19.9739 16.025 20.0092L14 20.4142L14.405 18.3892Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      case "comment":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <g clipPath="url(#editor-comment-clip)">
              <path d="M3.28667 3.28732L12.7133 12.714M14.6667 8.00065C14.6667 11.6826 11.6819 14.6673 8 14.6673C4.3181 14.6673 1.33333 11.6826 1.33333 8.00065C1.33333 4.31875 4.3181 1.33398 8 1.33398C11.6819 1.33398 14.6667 4.31875 14.6667 8.00065Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
              <clipPath id="editor-comment-clip">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="fixed inset-x-0 top-3 z-20 mx-auto w-fit"
      data-testid="editor-floating-toolbar"
      onMouseEnter={() => setShowHint(true)}
      onMouseLeave={() => setShowHint(false)}
      onFocusCapture={() => setShowHint(true)}
      onBlurCapture={() => setShowHint(false)}
    >
      <div className="relative flex min-h-[52px] w-fit rounded-xl bg-black px-2">
        <div className="z-100 absolute left-0 top-0 h-full w-full rounded-xl bg-white opacity-30 transition-opacity duration-500" aria-hidden="true" />
        <div
          className={`text-wrap text-grey-500 mx-auto text-body2 max-w-[606px] pt-1 text-center absolute -bottom-[20px] left-0 w-full translate-y-0 transition-all duration-500 ${
            showHint ? "opacity-100" : "opacity-0"
          }`}
        >
          Upload a file or create a new one to enable all the tools :)
        </div>
        <div className="flex items-center gap-3">
          {editorToolbarTools.map((tool) => {
            const isSelected = tool.id === activeTool
            const showDivider = previousGroup !== null && previousGroup !== tool.group
            previousGroup = tool.group
            const responsiveClass = tool.mobilePrimary ? "inline-flex" : "hidden md:inline-flex"
            const isSplitTool = tool.id === "draw"

            return (
              <div key={tool.id} className="flex items-center">
                {showDivider ? <div className="bg-grey-500 mx-2 h-[52px] w-px" aria-hidden="true" /> : null}
                {isSplitTool ? (
                  <div className="flex items-center md:gap-1">
                    <button
                      type="button"
                      aria-label={tool.label}
                      aria-pressed={isSelected}
                      title={tool.label}
                      onClick={() => onToolChange(tool.id)}
                      className={`${responsiveClass} z-10 h-7 w-7 shrink-0 items-center justify-center rounded text-white transition-colors md:h-9 md:w-9 md:[&_svg]:size-6 ${
                        isSelected ? "bg-[hsl(var(--primary))]" : "hover:bg-[hsl(var(--grey-600))]"
                      }`}
                      data-mobile-priority={tool.mobilePrimary ? "primary" : "secondary"}
                    >
                      {renderToolIcon(tool.id)}
                    </button>
                    <button
                      type="button"
                      aria-label="Tool options"
                      className="hover:bg-grey-600 active:bg-grey-500 z-10 inline-flex h-7 w-4 items-center justify-center rounded bg-black text-white transition-colors md:h-9"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="pointer-events-none size-6">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    aria-label={tool.label}
                    aria-pressed={isSelected}
                    title={tool.label}
                    onClick={() => onToolChange(tool.id)}
                    className={`${responsiveClass} z-10 h-7 w-7 shrink-0 items-center justify-center rounded text-white transition-colors md:h-9 md:w-9 md:[&_svg]:size-6 ${
                      isSelected ? "bg-[hsl(var(--primary))]" : "bg-black hover:bg-[hsl(var(--grey-600))]"
                    }`}
                    data-mobile-priority={tool.mobilePrimary ? "primary" : "secondary"}
                  >
                    {renderToolIcon(tool.id)}
                  </button>
                )}
              </div>
            )
          })}

          <input
            className="hidden"
            max={1}
            accept="image/jpeg,.jpg,.jpeg,image/webp,.webp,image/gif,.gif,image/png,.png,image/svg,.svg"
            type="file"
            aria-label="Insert image file"
          />

          <div className="ml-3 flex items-center gap-0">
            <button
              type="button"
              aria-label="More tools"
              className="z-10 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded bg-black text-white transition-colors hover:bg-[hsl(var(--grey-600))] md:h-9 md:w-9"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="bg-grey-500 mx-2 h-full w-px" aria-hidden="true" />
            <div className="bg-grey-600 flex gap-1 rounded-md p-1">
              <button
                type="button"
                aria-label="Pointer mode"
                className="inline-flex size-5 items-center justify-center rounded bg-black text-[hsl(var(--primary))] transition-colors md:size-7"
                disabled
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M2.87601 18.1156C2.92195 17.7021 2.94493 17.4954 3.00748 17.3022C3.06298 17.1307 3.1414 16.9676 3.24061 16.8171C3.35242 16.6475 3.49952 16.5005 3.7937 16.2063L17 3C18.1046 1.89543 19.8954 1.89543 21 3C22.1046 4.10457 22.1046 5.89543 21 7L7.7937 20.2063C7.49951 20.5005 7.35242 20.6475 7.18286 20.7594C7.03242 20.8586 6.86926 20.937 6.69782 20.9925C6.50457 21.055 6.29783 21.078 5.88434 21.124L2.49997 21.5L2.87601 18.1156Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Form mode"
                className="text-grey-400 inline-flex size-5 items-center justify-center rounded transition-colors hover:bg-grey-500 hover:text-white md:size-7"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8.66665 4.66667H3.46665C2.71991 4.66667 2.34654 4.66667 2.06133 4.81199C1.81044 4.93982 1.60647 5.1438 1.47864 5.39468C1.33331 5.67989 1.33331 6.05326 1.33331 6.8V9.2C1.33331 9.94674 1.33331 10.3201 1.47864 10.6053C1.60647 10.8562 1.81044 11.0602 2.06133 11.188C2.34654 11.3333 2.71991 11.3333 3.46665 11.3333H8.66665M11.3333 4.66667H12.5333C13.28 4.66667 13.6534 4.66667 13.9386 4.81199C14.1895 4.93982 14.3935 5.1438 14.5213 5.39468C14.6666 5.67989 14.6666 6.05326 14.6666 6.8V9.2C14.6666 9.94674 14.6666 10.3201 14.5213 10.6053C14.3935 10.8562 14.1895 11.0602 13.9386 11.188C13.6534 11.3333 13.28 11.3333 12.5333 11.3333H11.3333M11.3333 14L11.3333 2M13 2.00001L9.66665 2M13 14L9.66665 14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="pointer-events-none relative -top-6 -z-1 -translate-y-7 opacity-0 transition-all duration-300" aria-hidden="true">
        <div className="to-primary from-[#404044] flex min-h-[52px] items-center gap-2.5 rounded-xl bg-gradient-to-r from-[50%] px-4 pb-1 pt-7 text-white">
          <div className="bg-primary flex size-5 items-center justify-center rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="size-4">
              <g transform="rotate(180 12 12)">
                <path d="M12 16V12M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
          <span className="text-body3 lg:text-body2 flex-1">
            This page contains forms. Activate form mode to fill them in.
          </span>
          <button type="button" aria-label="Dismiss form hint" className="pointer-events-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="size-4 md:size-5">
              <path d="M17 7L7 17M7 7L17 17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
