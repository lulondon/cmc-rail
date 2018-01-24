#!/bin/bash

CORSPROXY='http:\/\/217\.182\.252\.207:32612'

sed -i '.bak' -E "s/https:\/\/lite/$CORSPROXY\/lite/g" ./node_modules/national-rail-darwin/index.js