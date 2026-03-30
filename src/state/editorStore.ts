import { create } from 'zustand'

export type ThumbnailItem = {
  pageNumber: number
  dataUrl: string
}

type EditorState = {
  fileName: string | null
  pageCount: number
  selectedPage: number
  thumbnails: ThumbnailItem[]
  isLoading: boolean
  errorMessage: string | null
  setDocumentMeta: (payload: { fileName: string; pageCount: number }) => void
  setThumbnails: (thumbnails: ThumbnailItem[]) => void
  selectPage: (pageNumber: number) => void
  setIsLoading: (isLoading: boolean) => void
  setErrorMessage: (message: string | null) => void
  resetDocument: () => void
}

const initialState = {
  fileName: null,
  pageCount: 0,
  selectedPage: 1,
  thumbnails: [],
  isLoading: false,
  errorMessage: null,
}

export const useEditorStore = create<EditorState>((set) => ({
  ...initialState,
  setDocumentMeta: ({ fileName, pageCount }) =>
    set({ fileName, pageCount, selectedPage: pageCount > 0 ? 1 : 0 }),
  setThumbnails: (thumbnails) => set({ thumbnails }),
  selectPage: (pageNumber) =>
    set((state) => {
      if (state.pageCount === 0) {
        return { selectedPage: 0 }
      }

      return {
        selectedPage: Math.min(Math.max(pageNumber, 1), state.pageCount),
      }
    }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  resetDocument: () => set(initialState),
}))
