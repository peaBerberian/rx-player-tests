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
import {
  StringUtils,
  parseBifThumbnails,
} from "rx-player/tools";
import {
  METAPLAYLIST,
} from "rx-player/experimental/features";
import {
  IAudioTrack,
  IConstructorOptions,
  IKeySystemOption,
  ILoadVideoOptions,
  IRequestConfig,
  IPositionUpdate,
  IStartAtOption,
  IRepresentationListUpdateContext,
} from "rx-player/types";
import RxPlayer2 from "rx-player";
import {
  mediaCapabilitiesProber,
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
  IConstructorOptions |
  IKeySystemOption |
  ILoadVideoOptions |
  IRequestConfig |
  IStartAtOption;

mediaCapabilitiesProber.LogLevel = "DEBUG";

DASH_WASM.initialize({ wasmUrl: "toto" });
RxPlayer.addFeatures([
  DASH,
  DASH_WASM,
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
]);

const a = new RxPlayer2();
console.log(a.version);
a.addEventListener("audioRepresentationChange", (arg) => {
  console.log("audio representation changed", arg);
});
a.addEventListener("representationListUpdate", (evt: IRepresentationListUpdateContext) => {
  console.log("Representation list update", evt);
})

a.addEventListener("videoRepresentationChange", (arg) => {
  console.log("video representation changed", arg);
});

a.addEventListener("availableAudioTracksChange", (args: IAudioTrack[]) => {
  console.log("availableAudioTracksChange", args);
});

a.addEventListener("positionUpdate", (args: IPositionUpdate) => {
  console.log("positionUpdate", args);
});

a.addEventListener("audioTrackChange", (a: IAudioTrack | null) => {
  console.log("audioTrackCHange", a);
})

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
