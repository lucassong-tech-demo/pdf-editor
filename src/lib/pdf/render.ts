import type { PDFDocumentProxy } from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

export async function loadPdfDocument(file: File): Promise<PDFDocumentProxy> {
  const { getDocument, GlobalWorkerOptions } = await import('pdfjs-dist')
  GlobalWorkerOptions.workerSrc = pdfWorker
  const bytes = await file.arrayBuffer()
  const loadingTask = getDocument({ data: bytes })
  return loadingTask.promise
}

export async function renderPageToDataUrl(
  pdfDocument: PDFDocumentProxy,
  pageNumber: number,
  scale: number,
): Promise<string> {
  const page = await pdfDocument.getPage(pageNumber)
  const viewport = page.getViewport({ scale })
  const canvas = window.document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    throw new Error('Failed to create 2D canvas context.')
  }

  canvas.width = Math.ceil(viewport.width)
  canvas.height = Math.ceil(viewport.height)

  await page.render({
    canvas,
    canvasContext: context,
    viewport,
  }).promise

  return canvas.toDataURL('image/png')
}
