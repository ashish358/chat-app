import { useState, useRef, useEffect } from "react";

const VoiceRecognition = () => {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  useEffect(() => {
    // Check if browser supports getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMsg("Your browser doesn't support audio recording.");
    }
    
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const toggleRecording = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    try {
      setErrorMsg("");
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      streamRef.current = stream;
      
      const options = { mimeType: 'audio/webm' };
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        handleRecordingComplete(audioBlob);
      };
      
      mediaRecorderRef.current.onerror = (event) => {
        console.error("MediaRecorder error:", event);
        setErrorMsg("Recording error occurred.");
        setIsRecording(false);
      };

      mediaRecorderRef.current.start(1000);
      setIsRecording(true);
    } catch (error) {
      console.error("Microphone error:", error);
      setErrorMsg(error.name === 'NotAllowedError' 
        ? "Microphone access denied. Please allow access in your browser settings."
        : "Error accessing microphone: " + error.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessing(true);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  };

  const handleRecordingComplete = (audioBlob) => {
    // Create an audio element to play back the recording
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    // Set message about backend requirement
    setText("Audio recorded successfully! (Size: " + (audioBlob.size / 1024).toFixed(2) + " KB)\n\n" +
           "To transcribe this audio, you would need to implement a backend API endpoint " +
           "that connects to OpenAI's Whisper API. The endpoint should be configured at '/api/transcribe'.");
    
    setIsProcessing(false);

    // Provide playback option
    setErrorMsg(
      <div className="flex items-center gap-2">
        <span>Recording complete. Listen to your audio:</span>
        <button 
          onClick={() => audio.play()} 
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          Play
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={toggleRecording}
        disabled={isProcessing}
        className={`px-6 py-3 rounded-lg text-white ${
          isProcessing ? "bg-gray-500" : isRecording ? "bg-red-500" : "bg-blue-500"
        }`}
      >
        {isProcessing ? "Processing..." : isRecording ? "Stop" : "Record"}
      </button>

      {errorMsg && (
        <div className="w-full max-w-lg p-3 bg-blue-100 text-blue-800 rounded-lg">
          {errorMsg}
        </div>
      )}

      <div className="w-full max-w-lg p-4 bg-gray-100 rounded-lg min-h-16">
        <p className="whitespace-pre-line">{text || "Record audio to see instructions for transcription..."}</p>
      </div>
    </div>
  );
};

export default VoiceRecognition;