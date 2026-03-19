import { useEditorStore } from '../state/editorStore'

describe('editorStore', () => {
  beforeEach(() => {
    useEditorStore.getState().resetDocument()
  })

  it('stores uploaded document metadata and resets selected page to first page', () => {
    const store = useEditorStore.getState()

    store.setDocumentMeta({ fileName: 'sample.pdf', pageCount: 5 })

    const state = useEditorStore.getState()
    expect(state.fileName).toBe('sample.pdf')
    expect(state.pageCount).toBe(5)
    expect(state.selectedPage).toBe(1)
  })

  it('keeps selected page in range', () => {
    const store = useEditorStore.getState()

    store.setDocumentMeta({ fileName: 'sample.pdf', pageCount: 3 })
    store.selectPage(99)

    expect(useEditorStore.getState().selectedPage).toBe(3)
  })
})
