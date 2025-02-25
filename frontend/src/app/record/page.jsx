'use client';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Record = () => {
    let mediaRecorder = null;
    let recordedChunks = [];

    const startRecording = async () => {
        try {
            // Get screen recording stream with system audio
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: { mediaSource: "screen" },
                audio: true // This captures system audio
            });

            // Get microphone audio separately
            const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Merge both screen and microphone audio
            const combinedStream = new MediaStream([
                ...screenStream.getVideoTracks(),  // Get video track
                ...screenStream.getAudioTracks(),  // Get system audio
                ...micStream.getAudioTracks()      // Get microphone audio
            ]);

            // Initialize MediaRecorder
            mediaRecorder = new MediaRecorder(combinedStream, { mimeType: "video/webm" });

            // Capture data chunks
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            // Handle stop event
            mediaRecorder.onstop = async () => {
                const blob = new Blob(recordedChunks, { type: "video/webm" });
                const videoURL = URL.createObjectURL(blob);

                // Auto-download video
                const a = document.createElement("a");
                a.href = videoURL;
                a.download = "screen-recording.webm";
                a.click();

                // Upload to Cloudinary
                const formData = new FormData();
                formData.append('file', blob);
                formData.append('upload_preset', 'Ankita');
                formData.append('cloud_name', 'dtdbsaj3z');

                try {
                    const response = await axios.post(
                        'https://api.cloudinary.com/v1_1/dtdbsaj3z/video/upload',
                        formData,
                        { headers: { 'Content-Type': 'multipart/form-data' } }
                    );

                    const { url } = response.data;
                    try {
                        await axios.post(`${process.env.BACKEND_URL}/record/add`, {
                            title: prompt('Enter Video Title'),
                            file: url
                        });
                        toast.success('Video uploaded successfully');
                    } catch (error) {
                        toast.error('Error uploading video');
                    }
                } catch (error) {
                    console.error('Error uploading video:', error);
                }
            };

            // Start Recording
            mediaRecorder.start();
        } catch (error) {
            console.error("Error starting screen recording:", error);
            alert("Failed to start screen recording. Please allow microphone access.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    };

    return (
        <div className="bg-blue-400 text-black pb-6 sm:pb-8 lg:pb-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <header className="mb-8 flex items-center justify-between border-b py-4 md:mb-12 md:py-8 xl:mb-16">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Menu
                    </button>
                </header>
                <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
                    <div className="sm:text-center lg:py-12 lg:text-left xl:py-24">
                        <p className="mb-8 text-4xl font-bold sm:text-5xl md:mb-12 md:text-6xl">
                            Screen Recording with RecPro
                        </p>
                        <h1 className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">
                            Please Click &quot;Capture Screen&quot; button below to start capture your screen.
                        </h1>
                        <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                            <button
                                onClick={startRecording}
                                className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
                            >
                                🎥 Capture Screen
                            </button>
                            <button
                                onClick={stopRecording}
                                className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
                            >
                                🚫 Stop Screen
                            </button>
                        </div>
                    </div>
                    <div className="h-28 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:h-[70vh] xl:w-5/12">
                        <img
                            src="DALL·E 2024-12-09 19.24.27 - A modern and eye-catching hero section design for a screen recording software project. The image features a digital tablet and smartphone floating in .webp"
                            loading="lazy"
                            alt="Photo by Fakurian Design"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Record;
