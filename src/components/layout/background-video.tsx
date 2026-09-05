"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_082433_69699cf8-444b-4484-93cc-053e57896dfd.mp4";

/**
 * Fixed background video behind the whole app. It is a graceful enhancement:
 * it fades in once it can actually play, and if it errors or stalls (missing
 * codec, slow network) it removes itself so the page never shows a black frame
 * or hangs on decode. The dark gradient on <html> is the reliable base.
 * The dim overlay is lighter on the landing (sharp video behind the hero) and
 * moderate on inner pages (video visible, content still readable).
 */
export function BackgroundVideo() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const onReady = () => setReady(true);
    const onError = () => setFailed(true);
    v.addEventListener("playing", onReady);
    v.addEventListener("canplay", onReady);
    v.addEventListener("error", onError);

    const timer = setTimeout(() => {
      if (v.readyState < 2) setFailed(true);
    }, 4000);

    return () => {
      v.removeEventListener("playing", onReady);
      v.removeEventListener("canplay", onReady);
      v.removeEventListener("error", onError);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {!failed && (
        <video
          ref={ref}
          className="bg-video"
          style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s ease" }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          src={VIDEO_URL}
        />
      )}
      <div className="bg-video-overlay" data-dim={isLanding ? "soft" : "medium"} />
    </>
  );
}
