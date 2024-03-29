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
import { StringUtils } from "rx-player/tools";
import {
  DASH_WASM,
  METAPLAYLIST,
} from "rx-player/experimental/features";
import {
  IAudioTrack,
  IAudioTrackPreference,
  IBitrateEstimate,
  IConstructorOptions,
  IDecipherabilityUpdateContent,
  IDefaultAudioTrackOption,
  IDefaultTextTrackOption,
  IKeySystemOption,
  ILoadVideoOptions,
  INetworkConfigOption,
  IPositionUpdate,
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
  VideoThumbnailLoader,
} from "rx-player/experimental/tools";
import TextTrackRenderer, {
  TTML_PARSER,
  VTT_PARSER,
  SRT_PARSER,
  SAMI_PARSER,
} from "rx-player/tools/TextTrackRenderer";
import VideoThumbnailLoader2, {
  DASH_LOADER,
  MPL_LOADER,
} from "rx-player/experimental/tools/VideoThumbnailLoader";
import logger from "rx-player/logger";
import { config } from "rx-player/experimental";

config.update({});

console.log(StringUtils.strToUtf8("hello😀"));
console.log(parseBifThumbnails(new Uint8Array([])));
VideoThumbnailLoader.addLoader(DASH_LOADER);
VideoThumbnailLoader.addLoader(MPL_LOADER);
VideoThumbnailLoader2.addLoader(DASH_LOADER);
VideoThumbnailLoader.addLoader(MPL_LOADER);

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

DASH_WASM.initialize({ wasmUrl: "toto" });
RxPlayer.addFeatures([
  BIF_PARSER,
  DASH,
  DASH_WASM,
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
a.addEventListener("bitrateEstimationChange", (args: IBitrateEstimate) => {
  console.log("new bitrate estimate", args);
});

a.addEventListener("audioBitrateChange", (arg) => {
  console.log("audio bitrate changed", arg);
});

a.addEventListener("videoBitrateChange", (arg) => {
  console.log("video bitrate changed", arg);
});

a.addEventListener("availableAudioBitratesChange", (args: number[]) => {
  console.log("availableAudioBitratesChange", args);
});

a.addEventListener("availableVideoBitratesChange", (args: number[]) => {
  console.log("availableVideoBitratesChange", args);
});

a.addEventListener("availableAudioTracksChange", (args: IAudioTrack[]) => {
  console.log("availableAudioTracksChange", args);
});

a.addEventListener("positionUpdate", (args: IPositionUpdate) => {
  console.log("positionUpdate", args);
});

a.addEventListener("decipherabilityUpdate", (arg: IDecipherabilityUpdateContent[]) => {
  console.log("decipherabilityUpdate", arg);
});

a.addEventListener("audioTrackChange", (a: IAudioTrack | null) => {
  console.log("audioTrackCHange", a);
})

a.setAudioTrack("5");
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
