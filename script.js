const imageUpload = document.getElementById('image-upload');
const uploadedImage = document.getElementById('uploaded-image');
const qualitySlider = document.getElementById('quality-slider');
const downloadLink = document.getElementById('download-link');

let originalImage;

imageUpload.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      uploadedImage.src = e.target.result;
      uploadedImage.style.display = 'block';
      originalImage = new Image();
      originalImage.src = e.target.result;
      originalImage.onload = () => degradeImageQuality(originalImage, qualitySlider.value);
    };
    reader.readAsDataURL(file);
  }
});

// Adjust quality in real-time as the slider is moved
qualitySlider.addEventListener('input', function() {
  if (originalImage) {
    degradeImageQuality(originalImage, qualitySlider.value);
  }
});

function degradeImageQuality(image, quality) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Resize canvas to image size
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw the image on canvas
  ctx.drawImage(image, 0, 0, image.width, image.height);

  // Convert canvas to image with degraded quality (JPG)
  canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
    uploadedImage.src = url; // Display degraded image in real-time
    downloadLink.href = url;
    downloadLink.style.display = 'inline';
  }, 'image/jpeg', quality / 100); // Convert slider value to a fraction for quality
}
