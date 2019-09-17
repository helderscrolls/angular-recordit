#!/usr/bin/env bash

pushd node_modules/robotjs
  sudo nw-gyp configure --target=0.37.2
  sudo nw-gyp build --target=0.37.2
popd
