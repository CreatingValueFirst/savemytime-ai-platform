import { useState, useRef, useEffect } from "react";
import { Play, Pause, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoiceCardProps {
  name: string;
  gender: "male" | "female";
  description: string;
  audioSrc: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function VoiceCard({
  name,
  gender,
  description,
  audioSrc,
  isSelected = false,
  onSelect,
}: VoiceCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "group relative rounded-2xl p-6 transition-all duration-500",
        "border-2",
        isSelected
          ? "border-primary bg-primary/10 glow-gold"
          : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
      )}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
          <Check className="w-5 h-5 text-primary-foreground" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
            isPlaying ? "glow-gold pulse-gold" : "",
            gender === "female"
              ? "bg-gradient-to-br from-pink-500/20 to-purple-500/20"
              : "bg-gradient-to-br from-blue-500/20 to-cyan-500/20"
          )}
        >
          <User
            className={cn(
              "w-8 h-8",
              gender === "female" ? "text-pink-400" : "text-blue-400"
            )}
          />
        </div>
        <div>
          <h3 className="text-xl font-display font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">
            {gender === "female" ? "Женски глас" : "Мъжки глас"}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
        {description}
      </p>

      {/* Audio Player - Highlighted */}
      <div
        className={cn(
          "rounded-xl p-4 mb-6 transition-all duration-300",
          "border-2 border-primary/30 bg-primary/5",
          isPlaying && "border-primary bg-primary/10 glow-gold-sm"
        )}
      >
        <div className="flex items-center gap-4">
          {/* Play Button */}
          <button
            onClick={togglePlay}
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
              "bg-primary text-primary-foreground hover:scale-105",
              isPlaying && "glow-gold pulse-gold"
            )}
            aria-label={isPlaying ? "Пауза" : "Пусни"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </button>

          {/* Progress */}
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>{formatTime((progress / 100) * duration)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-gold-light rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Sound Wave Animation */}
          {isPlaying && (
            <div className="sound-wave">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
      </div>

      {/* Select Button */}
      <Button
        onClick={onSelect}
        variant={isSelected ? "default" : "outline"}
        className={cn(
          "w-full transition-all duration-300",
          isSelected
            ? "bg-primary text-primary-foreground"
            : "border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
        )}
      >
        {isSelected ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Избран глас
          </>
        ) : (
          "Избери този глас"
        )}
      </Button>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </div>
  );
}
