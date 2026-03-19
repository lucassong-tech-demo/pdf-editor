import { PDFDocument } from 'pdf-lib'

export async function loadPdfDocument(fileBytes: Uint8Array) {
  return PDFDocument.load(fileBytes)
}
