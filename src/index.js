import RxPlayer from "rx-player";
import { MULTI_THREAD } from "rx-player/experimental/features";

// Initialization code:
RxPlayer.addFeatures([MULTI_THREAD]);
const player = new RxPlayer({ videoElement: document.querySelector("video") });

// RxPlayer API to attach its worker, here with our own application-defined wrapper
player.attachWorker({ workerUrl: "./worker.js" });

// `getWorkerInterface` gives a simple interface to our worker. It's here to
// facilitate things like message-passing by transforming it into a named-event
// system
const workerIfc = player.getWorkerInterface();
if (workerIfc) {
  // Send a message with the name `"update-limits"` (see ./worker-entry.js) to see
  // how it is handled.
  workerIfc.sendMessage("update-limits", {
    height: 250,
    width: null,
  });

  // Example of handling a worker-originating message
  workerIfc.addMessageListener("feedback", (payload) => {
    console.warn("FEEDBACK:", payload);
  });
}

// The API to load contents stay roughly the same, but with some supplementary features
player.loadVideo({
  // Usual stuff
  url: "https://www.bok.net/dash/tears_of_steel/cleartext/stream.mpd",
  autoPlay: true,
  transport: "dash",

  // Now `manifestLoader`, `segmentLoader` and `representationFilter` can be objects

  manifestLoader: {
    // `id` defined in `./worker-entry.js`
    workerId: "default-loader",
  },
  segmentLoader: {
    // `id` defined in `./worker-entry.js`
    workerId: "default-loader",
  },
  representationFilter: {
    // `id` defined in `./worker-entry.js`
    workerId: "limit-based-filter",

    // Note: for each of those three, it is also possible to provide a main-side
    // function as a potential fallback through an `fn` property.
    // Example here:
    //
    // ```
    // fn: representationFilter,
    // ```
    //
    // I did not include that here because it complexifies the code for not much
    // gain in what is just an example. Real-life scenarios for applications would
    // just be to declare a common external file (which e.g. defines a
    // `representationFilter` callback here) that is imported both worker-side and
    // main-thread-side for this fallback.
  },
});

// Put the player in window for easier debugging
window.player = player;
