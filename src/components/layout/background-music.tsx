"use client";

import React, { useState, useRef, useEffect } from "react";
import { IconMusic, IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { playTapSound } from "@/lib/sound";

// High-energy upbeat synthwave rocking track for portfolio listening
const MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a14f24.mp3?filename=synthwave-80s-110045.mp3";

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    playTapSound("pop");
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Audio play blocked by browser policy:", err);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTapSound("pop");
    if (!audioRef.current) return;

    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[5000] flex items-center gap-2">
      <div className="group relative flex items-center gap-2 px-3.5 py-2 rounded-full border border-border/80 bg-background/80 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-amber-500/50 hover:bg-background hover:scale-105 active:scale-95">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
          className="flex items-center gap-2 text-left"
        >
          <div className="relative flex items-center justify-center">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4 w-4">
                <span className="w-1 bg-amber-400 rounded-full animate-bounce h-full" style={{ animationDuration: "0.6s" }} />
                <span className="w-1 bg-indigo-400 rounded-full animate-bounce h-3/4" style={{ animationDuration: "0.8s" }} />
                <span className="w-1 bg-cyan-400 rounded-full animate-bounce h-full" style={{ animationDuration: "0.5s" }} />
              </div>
            ) : (
              <IconMusic className="h-4 w-4 text-muted-foreground group-hover:text-amber-400 transition-colors" />
            )}
          </div>

          <span className="text-xs font-semibold text-foreground group-hover:text-amber-400 transition-colors hidden sm:inline-block">
            {isPlaying ? "Ambient Music On" : "Play Music"}
          </span>
        </button>

        {isPlaying && (
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute music" : "Mute music"}
            className="ml-1 text-muted-foreground hover:text-foreground transition-colors p-0.5"
          >
            {isMuted ? (
              <IconVolumeOff className="h-3.5 w-3.5 text-rose-400" />
            ) : (
              <IconVolume className="h-3.5 w-3.5 text-emerald-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
