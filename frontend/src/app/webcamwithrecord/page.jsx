'use client';
import React, { useRef, useState } from 'react';

const WebcamRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [chunks, setChunks] = useState([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      const localChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          localChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(localChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setChunks(localChunks);

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Failed to start recording. Please allow camera and microphone access.');
    }
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
      a.download = 'webcam-recording.webm';
      a.click();
    }
  };

  return (
    <div className="p-6 bg-blue-400 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">📹 Video</h1>

      <video ref={videoRef} autoPlay muted className="w-96 h-64 bg-black rounded-lg shadow-lg mb-4"></video>

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

export default WebcamRecorder;
