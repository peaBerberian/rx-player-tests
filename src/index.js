import RxPlayer from "rx-player";
import { MULTI_THREAD } from "rx-player/experimental/features";
import createRepresentationFilter from "./create-representation-filter";

RxPlayer.addFeatures([MULTI_THREAD]);
const player = new RxPlayer({ videoElement: document.querySelector("video") });

player.attachWorker({ workerUrl: "./worker.js" });

const workerIfc = player.getWorkerInterface();
if (workerIfc) {
  workerIfc.sendMessage("update-limits", {
    height: 250,
    width: null,
  });

  workerIfc.addMessageListener("feedback", (payload) => {
    console.warn("FEEDBACK:", payload);
  });
}

player.loadVideo({
  url: "https://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd",
  autoPlay: true,
  transport: "dash",

  manifestLoader: {
    workerId: "default-loader",
  },
  segmentLoader: {
    workerId: "default-loader",
  },
  representationFilter: {
    workerId: "limit-based-filter",
    // In case we fallback on monothread, also provide the equivalent here:
    fn: createRepresentationFilter({ height: 1080, width: null }),
  },
});
window.player = player;
