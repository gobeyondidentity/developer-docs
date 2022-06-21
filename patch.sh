#!/bin/bash

set -eu pipefail

if [ "$(uname)" = "Darwin" ]; then
  if ! command -v gsed &> /dev/null
  then
      echo "gsed could not be found. Please \"brew install gsed\""
      exit
  fi
  grep -rl '#fff' ./build/ | xargs gsed -i 's/#fff\+/#ffffff/g'
  echo "RUNNING!!!"
else
  grep -rl '#fff' ./build/ | xargs sed -i 's/#fff\+/#ffffff/g'
  echo "LINUX RUNNING@@@@!!1"
fi
