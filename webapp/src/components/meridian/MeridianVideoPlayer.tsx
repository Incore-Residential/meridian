import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { LoaderCircle, Maximize, Minimize, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const VIDEO_SRC = "/videos/meridian-construction-update.mp4";
const POSTER_SRC = "/videos/meridian-construction-poster.jpg";
const FILM_DURATION = 39.1;

type SafariVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitSupportsFullscreen?: boolean;
};

function formatTime(seconds: number) {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, "0")}`;
}

export default function MeridianVideoPlayer() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [canFullscreen, setCanFullscreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(FILM_DURATION);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const onFullscreenChange = () => setIsFullscreen(document.fullscreenElement === frameRef.current);
    const onVisibilityChange = () => {
      if (document.hidden) video?.pause();
    };
    setCanFullscreen(Boolean(document.fullscreenEnabled || (video as SafariVideo)?.webkitEnterFullscreen));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      return;
    }
    setError(null);
    setIsWaiting(true);
    if (hasEnded) video.currentTime = 0;
    try {
      await video.play();
    } catch (playError) {
      if (playError instanceof Error && playError.name === "AbortError") return;
      setIsWaiting(false);
      setError("The film couldn't play. Please try again.");
    }
  }

  function toggleMute() {
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
  }

  function seek(time: number) {
    const video = videoRef.current;
    if (!video || video.readyState === 0) return;
    video.currentTime = Math.min(duration, Math.max(0, time));
    setCurrentTime(video.currentTime);
    setHasEnded(false);
  }

  async function toggleFullscreen() {
    const video = videoRef.current as SafariVideo | null;
    try {
      if (document.fullscreenElement === frameRef.current) {
        await document.exitFullscreen();
      } else if (document.fullscreenEnabled && frameRef.current?.requestFullscreen) {
        await frameRef.current.requestFullscreen();
      } else if (video?.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    } catch {
      // Inline playback remains available if the browser disallows fullscreen.
      setCanFullscreen(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    // Native buttons and the seek slider retain their standard keyboard behavior.
    if (event.target !== event.currentTarget) return;
    switch (event.key.toLowerCase()) {
      case " ":
      case "k": event.preventDefault(); void togglePlayback(); break;
      case "m": event.preventDefault(); toggleMute(); break;
      case "f": event.preventDefault(); void toggleFullscreen(); break;
      case "arrowleft": event.preventDefault(); seek(currentTime - 5); break;
      case "arrowright": event.preventDefault(); seek(currentTime + 5); break;
    }
  }

  function retryPlayback() {
    videoRef.current?.load();
    void togglePlayback();
  }

  const playLabel = hasEnded ? "Replay construction update" : isPlaying ? "Pause construction update" : "Play construction update";
  const progressStyle = { "--video-progress": `${(currentTime / duration) * 100}%` } as CSSProperties;

  return (
    <div
      ref={frameRef}
      className="construction-player"
      role="region"
      aria-label="Construction update video player"
      aria-describedby="construction-video-help"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      data-playing={isPlaying}
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        preload="none"
        playsInline
        aria-label="The Meridian construction update, a tour of the grounds and apartment interiors"
        onLoadedMetadata={(event) => {
          if (Number.isFinite(event.currentTarget.duration)) setDuration(event.currentTarget.duration);
        }}
        onPlay={() => { setIsPlaying(true); setHasStarted(true); setHasEnded(false); }}
        onPlaying={() => setIsWaiting(false)}
        onPause={() => { setIsPlaying(false); setIsWaiting(false); }}
        onWaiting={() => setIsWaiting(true)}
        onCanPlay={() => setIsWaiting(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onVolumeChange={(event) => setIsMuted(event.currentTarget.muted || event.currentTarget.volume === 0)}
        onEnded={() => { setHasEnded(true); setIsPlaying(false); setIsWaiting(false); }}
        onError={() => { setError("The film couldn't load. Please check your connection and try again."); setIsWaiting(false); setIsPlaying(false); }}
      />
      <p id="construction-video-help" className="sr-only">
        When the player is focused, press Space to play or pause, left or right arrow
        to seek five seconds, M to toggle sound, or F for fullscreen.
      </p>

      {!hasStarted ? (
        <div className="construction-player-heading" aria-hidden="true">
          <span>A closer look</span>
          <span>{formatTime(duration)}</span>
        </div>
      ) : null}

      {!error ? (
        <Button
          variant="ghost"
          className="construction-stage-toggle"
          onClick={() => void togglePlayback()}
          aria-label={playLabel}
          disabled={isWaiting}
        >
          <span className="construction-play-disc" data-visible={!isPlaying || isWaiting}>
            {isWaiting ? <LoaderCircle className="construction-spinner" aria-hidden="true" /> : hasEnded ? <RotateCcw aria-hidden="true" /> : isPlaying ? <Pause aria-hidden="true" /> : <Play className="construction-play-icon" aria-hidden="true" />}
          </span>
          {!hasStarted ? <span className="construction-play-caption">Watch the film</span> : null}
        </Button>
      ) : (
        <div className="construction-video-error" role="alert">
          <p>{error}</p>
          <Button onClick={retryPlayback} className="bg-zenith-gold text-meridian-charcoal hover:bg-zenith-gold/90">
            <RotateCcw aria-hidden="true" /> Try again
          </Button>
          <a href={VIDEO_SRC}>Open video directly</a>
        </div>
      )}

      <div className="construction-controls" aria-label="Playback controls">
        <input
          className="construction-seek"
          type="range"
          aria-label="Video progress"
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          onChange={(event) => seek(Number(event.target.value))}
          disabled={!hasStarted || Boolean(error)}
          style={progressStyle}
        />
        <div className="construction-controls-row">
          <Button variant="ghost" size="icon" className="construction-control" onClick={() => void togglePlayback()} aria-label={isPlaying ? "Pause video" : hasEnded ? "Replay video" : "Play video"} disabled={Boolean(error)}>
            {isPlaying ? <Pause aria-hidden="true" /> : hasEnded ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}
          </Button>
          <span className="construction-time" aria-hidden="true">{formatTime(currentTime)} <span>/ {formatTime(duration)}</span></span>
          <div className="construction-controls-spacer" />
          <Button variant="ghost" size="icon" className="construction-control" onClick={toggleMute} aria-label={isMuted ? "Unmute video" : "Mute video"}>
            {isMuted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
          </Button>
          {canFullscreen ? (
            <Button variant="ghost" size="icon" className="construction-control" onClick={() => void toggleFullscreen()} aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
              {isFullscreen ? <Minimize aria-hidden="true" /> : <Maximize aria-hidden="true" />}
            </Button>
          ) : null}
        </div>
      </div>
      <span className="sr-only" role="status">{isWaiting ? "Loading video" : hasEnded ? "Video ended. Replay is available." : ""}</span>
    </div>
  );
}
