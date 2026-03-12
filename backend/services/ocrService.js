const fs = require('fs');
const os = require('os');
const path = require('path');

const Tesseract = require('tesseract.js');

let cv = null;
try {
  cv = require('opencv4nodejs');
} catch (error) {
  cv = null;
}

const preprocessWithOpenCv = (imagePath) => {
  if (!cv) {
    return imagePath;
  }

  const image = cv.imread(imagePath);
  const gray = image.bgrToGray();

  // Use adaptive thresholding + denoise to boost OCR on noisy posters.
  const thresholded = gray.adaptiveThreshold(
    255,
    cv.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv.THRESH_BINARY,
    31,
    11
  );
  const denoised = thresholded.medianBlur(3);

  const sharpenKernel = new cv.Mat([
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
  ], cv.CV_32F);
  const sharpened = denoised.filter2D(cv.CV_8U, sharpenKernel);

  const outputPath = path.join(os.tmpdir(), `track-unity-ocr-${Date.now()}.png`);
  cv.imwrite(outputPath, sharpened);
  return outputPath;
};

const extractTextFromImage = async (imagePath) => {
  const processedPath = preprocessWithOpenCv(imagePath);

  try {
    const result = await Tesseract.recognize(processedPath, 'eng');
    return (result.data.text || '').trim();
  } finally {
    if (processedPath !== imagePath && fs.existsSync(processedPath)) {
      fs.unlinkSync(processedPath);
    }
  }
};

module.exports = { extractTextFromImage };
