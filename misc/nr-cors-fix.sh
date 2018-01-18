#!/bin/bash

sed -i '.bak' -E "s/https:\/\/lite/http:\/\/217\.182\.252\.207:32612\/lite/g" ./node_modules/national-rail-darwin/index.js