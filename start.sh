#!/bin/bash
clear
if [ "$#" -eq 0 ]; then
    echo Usage: $0 environment [mobilePlatform]
    exit
fi

SETTINGSFILE="./settings/${1}.json"
ENVFILE="./env/${1}.json"
APP_ENV="web"

PORT=`meteor node util/get_setting.js ${ENVFILE} PORT`
HOST=`meteor node util/get_setting.js ${ENVFILE} HOST`
PROTOCOL=`meteor node util/get_setting.js ${ENVFILE} PROTOCOL`
ROOT_URL="${PROTOCOL}://${HOST}:${PORT}"

if [ "$2" = "ios" ] || [ "$2" = "android" ]; then
    if [ "$2" = "ios" ]; then
        FLAGS="${FLAGS} ios-device"
        APP_ENV="ios"
    fi
    if [ "$2" = "android" ]; then
        FLAGS="${FLAGS} android-device"
        APP_ENV="android"
    fi
    if [ "$1" = "development" ]; then
        FLAGS="${FLAGS} --mobile-server ${ROOT_URL}"
    fi
    if [ "$1" = "staging" ] || [ "$1" = "production" ]; then
        ROOT_URL=`meteor node util/get_setting.js ${ENVFILE} ROOT_URL`
        FLAGS="${FLAGS} --mobile-server ${ROOT_URL}"
    fi
fi

FLAGS="--port ${PORT}"
FLAGS="${FLAGS} --settings ${SETTINGSFILE}"

echo Using Settings File ${SETTINGSFILE}
echo Using Environment File ${ENVFILE}

# Set Environmental Variables
values=`cat ${ENVFILE}`
for valuePair in $(echo $values | jq -r "to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]" ); do
    export $valuePair
done

# Set ROOT_URL
echo Setting ROOT_URL: ${ROOT_URL}
export ROOT_URL=${ROOT_URL}
# Set APP_ENV to dictate which React Components are used for Front End (anticipating React Native)
export APP_ENV=${APP_ENV}

echo Starting Ostraka Server....
meteor run ${FLAGS}
