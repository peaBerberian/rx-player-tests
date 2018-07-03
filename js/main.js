import { mediaCapabilitiesProber } from "rx-player/experimental/tools";
import RxPlayer from "rx-player/minimal";
import {
  DASH,
  DIRECTFILE,
  EME,
  HTML_SAMI_PARSER,
  HTML_TEXT_BUFFER,
  HTML_TTML_PARSER,
  HTML_VTT_PARSER,
  HTML_SRT_PARSER,
  IMAGE_BUFFER,
  BIF_PARSER,
  NATIVE_SAMI_PARSER,
  NATIVE_SRT_PARSER,
  NATIVE_TEXT_BUFFER,
  NATIVE_TTML_PARSER,
  NATIVE_VTT_PARSER,
  SMOOTH,
} from "rx-player/features";

RxPlayer.addFeatures([
  DASH,
  DIRECTFILE,
  EME,
  HTML_SAMI_PARSER,
  HTML_TEXT_BUFFER,
  HTML_TTML_PARSER,
  HTML_VTT_PARSER,
  HTML_SRT_PARSER,
  IMAGE_BUFFER,
  BIF_PARSER,
  NATIVE_SAMI_PARSER,
  NATIVE_SRT_PARSER,
  NATIVE_TEXT_BUFFER,
  NATIVE_TTML_PARSER,
  NATIVE_VTT_PARSER,
  SMOOTH,
]);
const videoElements = document.getElementsByTagName("video");

if (videoElements.length) {
  const videoElement = videoElements[0];
  const player = new RxPlayer({ videoElement });
  console.log("RxPlayer created on", videoElement);
  window.player = player;
}

window.RxPlayer = RxPlayer;
window.mediaCapabilitiesProber = mediaCapabilitiesProber;
