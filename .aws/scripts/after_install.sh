#!/bin/bash
cd /home/ec2-user/trip-planner-ui
npm install
npm run build
npm install pm2 -g
