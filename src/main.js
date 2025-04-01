import {
  mediaCapabilitiesProber,
  createMetaplaylist,
} from "rx-player/experimental/tools";
import { StringUtils } from "rx-player/tools";
import TextTrackRenderer, {
  TTML_PARSER,
  VTT_PARSER,
  SRT_PARSER,
  SAMI_PARSER,
} from "rx-player/tools/TextTrackRenderer";
import RxPlayer from "rx-player/minimal";
import {
  DASH,
  DIRECTFILE,
  EME,
  HTML_SAMI_PARSER,
  HTML_SRT_PARSER,
  HTML_TEXT_BUFFER,
  HTML_TTML_PARSER,
  HTML_VTT_PARSER,
  NATIVE_SAMI_PARSER,
  NATIVE_SRT_PARSER,
  NATIVE_TEXT_BUFFER,
  NATIVE_TTML_PARSER,
  NATIVE_VTT_PARSER,
  SMOOTH,
  DASH_WASM,
} from "rx-player/features";
import { METAPLAYLIST } from "rx-player/experimental/features";
import { config } from "rx-player/experimental";

config.update({});

console.log(StringUtils.strToUtf8("hello😀"));

DASH_WASM.initialize({ wasmUrl: "toto" });
RxPlayer.addFeatures([
  DASH,
  DIRECTFILE,
  EME,
  HTML_SAMI_PARSER,
  HTML_SRT_PARSER,
  HTML_TEXT_BUFFER,
  HTML_TTML_PARSER,
  HTML_VTT_PARSER,
  METAPLAYLIST,
  NATIVE_SAMI_PARSER,
  NATIVE_SRT_PARSER,
  NATIVE_TEXT_BUFFER,
  NATIVE_TTML_PARSER,
  NATIVE_VTT_PARSER,
  SMOOTH,
  DASH_WASM,
]);

const videoElements = document.getElementsByTagName("video");

console.log(createMetaplaylist);

if (videoElements.length) {
  const videoElement = videoElements[0];
  const player = new RxPlayer({ videoElement });
  console.log("RxPlayer created on", videoElement);
  window.player = player;
}

window.RxPlayer = RxPlayer;
window.mediaCapabilitiesProber = mediaCapabilitiesProber;

TextTrackRenderer.addParsers([
  TTML_PARSER,
  VTT_PARSER,
  SRT_PARSER,
  SAMI_PARSER,
]);

const textTrackRenderer = new TextTrackRenderer({
  videoElement,
  textTrackElement,
});

// example: a ".srt" track
const exampleSRT = `1
00:00:01,600 --> 00:00:04,200
English (US)

2
00:00:05,900 --> 00:00:07,999
This is a subtitle in American English

3
00:00:10,000 --> 00:00:14,000
Adding subtitles is very easy to do
`;

textTrackRenderer.setTextTrack({
  data: exampleSRT,
  type: "srt", // or "ttml" / "vtt" / "sami"
  timeOffset: 2.3, // optional offset in seconds to add to the subtitles
});
// textTrackRenderer.removeTextTrack();
