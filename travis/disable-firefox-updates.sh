#!/bin/bash

if [[ $TRAVIS_OS_NAME == "linux" ]]; then
	profilePath=$(find ~/.mozilla/firefox -name "*.default")
	prefsPath="$profilePath/prefs.js"
	echo $prefsPath
	echo -e "user_pref(\"app.update.enabled\", false);\n" >> $prefsPath
fi
