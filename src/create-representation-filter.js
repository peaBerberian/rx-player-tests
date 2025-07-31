// file: create-representation-filter.js

// This is an example of a file declaring a simple `representationFilter`
// function that can be used both in the RxPlayer worker and in the
// application in main thread.
export default function createRepresentationFilter(limits) {
  // This representationFilter filters on both height and width as an example,
  // depending on limits provided through the `limits` argument.
  return function representationFilter(representationInfo, infos) {
    if (infos.trackType === "video") {
      if (
        limits.height != null &&
        representationInfo.height != null &&
        limits.height < representationInfo.height
      ) {
        return false;
      }
      if (
        limits.width != null &&
        representationInfo.width != null &&
        limits.width < representationInfo.width
      ) {
        return false;
      }
    }
    return true;
  };
}
