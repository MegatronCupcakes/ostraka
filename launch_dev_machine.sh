#!/bin/bash
docker run \
    -v /home/dhoward/Projects/Ostraka:/Projects/Ostraka \
    -v /home/dhoward/Projects/Exif-Stripper:/Projects/Exif-Stripper \
    -v /home/dhoward/Data/Ostraka/user_images:/home/dhoward/Data/Ostraka/user_images \
    --add-host dx1.local:127.0.0.1 \
    --add-host tinyhoorse.local:192.168.4.102 \
    -it galacticwidgets/meteor-dev:latest /bin/bash
