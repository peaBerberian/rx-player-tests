// This file would be the application defined worker-wrapper

// A worker class is now exposed by the RxPlayer through a new optional path
import RxPlayerWorker from "rx-player/experimental/worker";

// The application can/should now import the streaming protocols it wants
import { DASH } from "rx-player/experimental/worker/features";

// Worker initialization stuff
RxPlayerWorker.addFeatures([DASH]);
const rxPlayerWorker = new RxPlayerWorker();

// Object relyied on by our example code here which introduces height and width limits
// to video contents.
const limitsObject = { height: null, width: null };

// Here's how a message is received worker-side. This is basically a fancy `onmessage`
// event listener which only communicates application-defined messages
rxPlayerWorker.addMessageListener("update-limits", function (newLimits) {
  limitsObject.height = newLimits.height;
  limitsObject.width = newLimits.width;
});

// In this example I chose to defined an actual `representationFilter`, but the logic
// stays the same for a `segmentLoader` and `manifestLoader`.
rxPlayerWorker.registerRepresentationFilter("limit-based-filter", representationFilter);

// For the sake of the example, let's define a `manifestLoader` and `segmentLoader` which
// only logs the request
rxPlayerWorker.registerManifestLoader("default-loader", (infos, cbs) => {
  console.warn("Requesting Manifest", infos);
  cbs.fallback();
});
rxPlayerWorker.registerSegmentLoader("default-loader", (infos, cbs) => {
  console.warn("Requesting Segment", infos);
  cbs.fallback();
});

// Just to show a worker-originated message, send a counter every seconds
let i = 0;
setInterval(() => {
  i++;
  rxPlayerWorker.sendMessage("feedback", i);
}, 1000);

// This representationFilter filters on both height and width as an example,
// depending on limits provided through the `limits` object.
function representationFilter(representationInfo, infos) {
  if (infos.trackType === "video") {
    if (
      limitsObject.height != null &&
      representationInfo.height != null &&
      limitsObject.height < representationInfo.height
    ) {
      return false;
    }
    if (
      limitsObject.width != null &&
      representationInfo.width != null &&
      limitsObject.width < representationInfo.width
    ) {
      return false;
    }
  }
  return true;
  }
