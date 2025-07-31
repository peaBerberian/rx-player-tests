import createRepresentationFilter from "./create-representation-filter";
import RxPlayerWorker from "rx-player/experimental/worker";
import { DASH } from "rx-player/experimental/worker/features";

RxPlayerWorker.addFeatures([DASH]);

const rxPlayerWorker = new RxPlayerWorker();

const limitsObject = { limit: null, width: null };
rxPlayerWorker.registerRepresentationFilter(
  "limit-based-filter",
  createRepresentationFilter(limitsObject),
);

rxPlayerWorker.registerManifestLoader("default-loader", (infos, cbs) => {
  console.warn("Requesting Manifest", infos);
  cbs.fallback();
});

rxPlayerWorker.registerSegmentLoader("default-loader", (infos, cbs) => {
  console.warn("Requesting Segment", infos);
  cbs.fallback();
});
rxPlayerWorker.addMessageListener("update-limits", function (newLimits) {
  limitsObject.height = newLimits.height;
  limitsObject.width = newLimits.width;
});

let i = 0;
setInterval(() => {
  i++;
  rxPlayerWorker.sendMessage("feedback", i);
}, 1000);
