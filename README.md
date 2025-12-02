# Test for worker-side plugins-simple

**NOTE: This is a modification of the `worker-side plugins` branch to just show
a worker-side implementation (instead of a more complex hybrid one) for simplification
reason**

This is a real-life test for https://github.com/canalplus/rx-player/pull/1719 in another
project depending on the RxPlayer.

This allows to test it and to show a preview of what an application will need to do.

To test it:

1. clone the corresponding RxPlayer branch (`misc/importable-worker`) and `cd` into it.

   ```bash
   git clone --single-branch -b misc/importable-worker --depth 1 https://github.com/canalplus/rx-player.git
   cd rx-player
   ```

2. call `npm link` there.

3. In another directory, clone this `rx-player-tests` repo and this branch and `cd` into it:

   ```bash
   git clone --single-branch -b worker-side-plugins-simple --depth 1 https://github.com/peaBerberian/rx-player-tests.git
   cd rx-player-tests
   ```

4. call `npm install` then `npm link rx-player` in it. You now linked your local rx-player
   to this repo.

5. call `npm run build && npm run serve` to build and serve the app on a local http server.

6. Go on the advertised URL in a web browser, the corresponding test runs
