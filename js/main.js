import RxPlayer from "rx-player/minimal";
import { SMOOTH } from "rx-player/features/features/list/index.js";

RxPlayer.addFeatures([ SMOOTH ]);
const videoElements = document.getElementsByTagName("video");

if (videoElements.length) {
  const videoElement = videoElements[0];
  const player = new RxPlayer({ videoElement });
  console.log("RxPlayer created on", videoElement);
  window.player = player;
}

window.RxPlayer = RxPlayer;
