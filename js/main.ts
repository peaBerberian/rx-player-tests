import RxPlayer from "rx-player/minimal";
import {
  DASH
} from "rx-player/features";
import RxPlayer2 from "rx-player";

RxPlayer.addFeatures([DASH]);
const a = new RxPlayer2();
console.log(a.version);
