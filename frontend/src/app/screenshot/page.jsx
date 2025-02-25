'use client';
import React, { useState } from 'react';

const ScreenshotCapture = () => {
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const takeScreenshot = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if the browser supports getDisplayMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        setError('Screen capture is not supported by your browser.');
        setLoading(false);
        return;
      }

      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const video = document.createElement('video');

      video.srcObject = stream;
      video.play();

      video.onloadedmetadata = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageUrl = canvas.toDataURL('image/png');
        setScreenshot(imageUrl);

        // Clean up the stream and video element after the screenshot is taken
        stream.getTracks().forEach(track => track.stop());
        video.remove();
        setLoading(false);
      };
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      setError('Failed to capture screenshot. Please allow screen recording permissions.');
      setLoading(false);
    }
  };

  const downloadScreenshot = () => {
    if (screenshot) {
      const link = document.createElement('a');
      link.href = screenshot;
      link.download = 'screenshot.png';
      link.click();
    }
  };

  return (
    <div className="p-6 bg-blue-400 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">📸 Screenshot Capture</h1>

      <button
        onClick={takeScreenshot}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        disabled={loading}
      >
        🖥️ Take Screenshot
      </button>

      {loading && (
        <p className="mt-4 text-lg font-semibold text-gray-700">Capturing screenshot...</p>
      )}

      {error && (
        <p className="mt-4 text-lg font-semibold text-red-600">{error}</p>
      )}

      {screenshot && !loading && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">📷 Captured Screenshot:</h2>
          <img src={screenshot} alt="Screenshot" className="mt-4 w-full max-w-lg rounded-lg border shadow-lg" />

          <button
            onClick={downloadScreenshot}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            ⬇️ Download Screenshot
          </button>
        </div>
      )}
    </div>
  );
};

export default ScreenshotCapture;
