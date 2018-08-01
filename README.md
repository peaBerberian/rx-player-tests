# rx-player-tests ##############################################################

Test repository for the [RxPlayer](https://github.com/canalplus/rx-player).

This is a repository where we test the packaging of the "rx-player" module.

More specifically, we test here that versions deployed - or versions that will
be soon deployed, doesn't have any issue that could arise at packaging time
like:

  - non-exported APIs

  - size of the bundles too big

  - issues when installing the module

  - absence of type definitions


Having this separate repository also allows us to perform true end-to-end tests
to compare possible issues users have with our library.
