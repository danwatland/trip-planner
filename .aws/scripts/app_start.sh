#!/bin/bash
cd /home/ec2-user/trip-planner-ui
npm start
pm2 start npm --name "trip-planner-ui" -- start
pm2 startup
pm2 save
pm2 restart all
