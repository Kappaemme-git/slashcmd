import AppKit
import Foundation
import Vision

guard CommandLine.arguments.count > 1 else {
  fputs("Usage: ocr-video-frames <image> [image...]\n", stderr)
  exit(1)
}

for imagePath in CommandLine.arguments.dropFirst() {
  let imageURL = URL(fileURLWithPath: imagePath)
  guard
    let image = NSImage(contentsOf: imageURL),
    let tiff = image.tiffRepresentation,
    let bitmap = NSBitmapImageRep(data: tiff),
    let cgImage = bitmap.cgImage
  else {
    continue
  }

  let request = VNRecognizeTextRequest()
  request.recognitionLevel = .accurate
  request.usesLanguageCorrection = true
  request.recognitionLanguages = ["en-US", "it-IT"]

  let handler = VNImageRequestHandler(cgImage: cgImage)
  try? handler.perform([request])

  let text = (request.results ?? [])
    .compactMap { $0.topCandidates(1).first?.string }
    .joined(separator: " | ")

  print("\(imageURL.lastPathComponent)\t\(text)")
}
