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
import { mediaCapabilitiesProber } from "rx-player/experimental/tools";

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
const a = new RxPlayer2();
console.log(a.version);
  
