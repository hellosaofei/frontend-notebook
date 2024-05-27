#!/bin/bash

info="$1"

git add .
git commit -m "${info}"

git push github develop0227
