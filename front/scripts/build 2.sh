#!/usr/bin/env bash

ng build && (ng build --watch & npm run dev)
