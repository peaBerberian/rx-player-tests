import RxPlayer from "rx-player/minimal";
import {
  BIF_PARSER,
  DASH,
  DIRECTFILE,
  EME,
  HTML_SAMI_PARSER,
  HTML_SRT_PARSER,
  HTML_TEXT_BUFFER,
  HTML_TTML_PARSER,
  HTML_VTT_PARSER,
  IMAGE_BUFFER,
  NATIVE_SAMI_PARSER,
  NATIVE_SRT_PARSER,
  NATIVE_TEXT_BUFFER,
  NATIVE_TTML_PARSER,
  NATIVE_VTT_PARSER,
  SMOOTH,
} from "rx-player/features";
import { METAPLAYLIST } from "rx-player/experimental/features";
import {
  IAudioTrackPreference,
  IConstructorOptions,
  IDefaultAudioTrackOption,
  IDefaultTextTrackOption,
  IKeySystemOption,
  ILoadVideoOptions,
  INetworkConfigOption,
  IStartAtOption,
  ISupplementaryImageTrackOption,
  ISupplementaryTextTrackOption,
  ITextTrackPreference,
  ITransportOptions,
} from "rx-player/types";
import RxPlayer2 from "rx-player";
import {
  mediaCapabilitiesProber,
  parseBifThumbnails,
} from "rx-player/experimental/tools";
import TextTrackRenderer, {
  TTML_PARSER,
  VTT_PARSER,
  SRT_PARSER,
  SAMI_PARSER,
} from "rx-player/experimental/tools/TextTrackRenderer";
import logger from "rx-player/logger";

console.log(parseBifThumbnails(new Uint8Array([])));

const videoElement = document.querySelector("video");
const textTrackElement = document.querySelector(".text-track-element") as HTMLElement;
if (videoElement === null || textTrackElement === null) {
  throw new Error("No video element available");
}
(window as any).logger = logger;
logger.setLevel("DEBUG");

export type ITest =
  IAudioTrackPreference |
  IConstructorOptions |
  IDefaultAudioTrackOption |
  IDefaultTextTrackOption |
  IKeySystemOption |
  ILoadVideoOptions |
  INetworkConfigOption |
  IStartAtOption |
  ISupplementaryImageTrackOption |
  ISupplementaryTextTrackOption |
  ITextTrackPreference |
  ITransportOptions;

mediaCapabilitiesProber.LogLevel = "DEBUG";

RxPlayer.addFeatures([
  BIF_PARSER,
  DASH,
  DIRECTFILE,
  EME,
  HTML_SAMI_PARSER,
  HTML_SRT_PARSER,
  HTML_TEXT_BUFFER,
  HTML_TTML_PARSER,
  HTML_VTT_PARSER,
  IMAGE_BUFFER,
  METAPLAYLIST,
  NATIVE_SAMI_PARSER,
  NATIVE_SRT_PARSER,
  NATIVE_TEXT_BUFFER,
  NATIVE_TTML_PARSER,
  NATIVE_VTT_PARSER,
  SMOOTH,
]);

const a = new RxPlayer2();
console.log(a.version);

// Add the needed parsers to the TextTrackRenderer
TextTrackRenderer.addParsers([ TTML_PARSER, VTT_PARSER, SRT_PARSER, SAMI_PARSER ]);

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
