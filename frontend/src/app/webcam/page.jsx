'use client';
import React, { useRef, useState } from 'react';

const ScreenWebcamRecorder = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [chunks, setChunks] = useState([]);
  let animationFrameId;

  const startRecording = async () => {
    try {
      // Get screen and webcam streams
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      const webcamStream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 }, audio: true });

      const screenVideo = document.createElement('video');
      screenVideo.srcObject = screenStream;
      screenVideo.muted = true;
      screenVideo.play();

      const webcamVideo = document.createElement('video');
      webcamVideo.srcObject = webcamStream;
      webcamVideo.muted = true;
      webcamVideo.play();

      // Merge streams on canvas
      setTimeout(() => mergeStreams(screenVideo, webcamVideo, screenStream, webcamStream), 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Failed to start recording. Allow screen & webcam access.");
    }
  };

  const mergeStreams = (screenVideo, webcamVideo, screenStream, webcamStream) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawFrames = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(webcamVideo, canvas.width - 340, canvas.height - 260, 320, 240);
      animationFrameId = requestAnimationFrame(drawFrames);
    };

    drawFrames();

    // Capture combined video & audio
    const mergedStream = canvas.captureStream(30);
    screenStream.getAudioTracks().forEach(track => mergedStream.addTrack(track));
    webcamStream.getAudioTracks().forEach(track => mergedStream.addTrack(track));

    // Initialize MediaRecorder
    const mediaRecorder = new MediaRecorder(mergedStream, { mimeType: 'video/webm' });
    const localChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        localChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      cancelAnimationFrame(animationFrameId);
      screenStream.getTracks().forEach(track => track.stop());
      webcamStream.getTracks().forEach(track => track.stop());

      const blob = new Blob(localChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      setChunks(localChunks);
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const downloadRecording = () => {
    if (videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = 'screen-webcam-recording.webm';
      a.click();
    }
  };

  return (
    <div className="p-6 bg-blue-400 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">📹 Screen & Webcam Recorder with Audio</h1>

      <canvas ref={canvasRef} width={1280} height={720} className="hidden" />

      <div className="space-x-4">
        {!recording ? (
          <button
            onClick={startRecording}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            🎥 Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            🛑 Stop Recording
          </button>
        )}
      </div>

      {videoUrl && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold">🎬 Recorded Video:</h2>
          <video controls src={videoUrl} className="mt-4 w-full max-w-lg rounded-lg border shadow-lg" />

          <button
            onClick={downloadRecording}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            ⬇️ Download Video
          </button>
        </div>
      )}
    </div>
  );
};

export default ScreenWebcamRecorder;
