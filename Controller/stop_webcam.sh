#!/bin/bash

sudo pkill -f mjpg_streamer
pkill -f raspistill
rm -rf /tmp/stream/