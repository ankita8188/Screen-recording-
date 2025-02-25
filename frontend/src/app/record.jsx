import React from 'react';
import html2canvas from 'html2canvas';

const ScreenshotWebsite = () => {
  const takeScreenshot = () => {
    // Capture the entire page or a specific element
    html2canvas(document.body).then((canvas) => {
      // Convert canvas to image
      const imgData = canvas.toDataURL('image/png');

      // Create a link to download the image
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'screenshot.png';
      link.click();
    });
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Take a Screenshot</h1>
      <div id="content" style={{ padding: '20px', border: '2px solid #ccc', margin: '20px auto', width: '80%', maxWidth: '600px' }}>
        <p>This is the content you can screenshot.</p>
        <p>You can include images, text, or any other HTML elements here.</p>
      </div>
      <button onClick={takeScreenshot} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
        Take Screenshot
      </button>
    </div>
  );
};

export default ScreenshotWebsite;