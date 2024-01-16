"use client";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { MicrophoneIcon, PauseCircleIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { twMerge } from "tailwind-merge";

const SpeechToText = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    adjustTextareaHeight();
  }, [transcript]);

  const handleStarListening = () => {
    SpeechRecognition.startListening({
      language: "id",
      continuous: true,
    });
  }; 

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn`t support speech recognition.</span>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div role="fitur-indicator">
        <h1 className="font-bold text-base">Fitur Checking</h1>
        <div role="fitur-status" className="flex flex-col text-sm text-gray-400" >
        <p>Microphone&nbsp;
          {isMicrophoneAvailable
            ? "Available"
            : "is not available"}
        </p>
        <p>Microphone: {listening ? "on" : "off"}</p>
        </div>
       
      </div>

      <div role="fitur-container" className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <button onClick={handleStarListening}>
            <MicrophoneIcon
              className={twMerge(
                "w-6 h-6 aspect-square",
                listening ? "text-blue-500" : "text-black"
              )}
            />
          </button>
          <button onClick={SpeechRecognition.stopListening}>
            <PauseCircleIcon
              className={twMerge(
                "w-6 h-6 aspect-square",
                listening ? "text-black" : "text-red-500"
              )}
            />
          </button>
          <button onClick={resetTranscript}>
            {" "}
            <XCircleIcon className="w-6 h-6" />{" "}
          </button>
        </div>

        <textarea ref={textareaRef} value={transcript} className="border p-2 w-full min-h-10 text-sm"></textarea>
      </div>
    </div>
  );
};
export default SpeechToText;
