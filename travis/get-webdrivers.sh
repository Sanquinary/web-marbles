#!/bin/bash

if [[ $TRAVIS_OS_NAME == "linux" ]]; then
	echo ">>> Get the chrome driver"
	chromeVersionUrl="http://chromedriver.storage.googleapis.com/LATEST_RELEASE"
	chromeVersion=$(curl -s -L $chromeVersionUrl)
	echo ">>> Driver version ${chromeVersion}"
	chromeDriverUrl="http://chromedriver.storage.googleapis.com/${chromeVersion}/chromedriver_linux64.zip"
	curl $chromeDriverUrl -s -o chromedriver.zip
	unzip -o -qq chromedriver.zip
	chmod ugo+x chromedriver

	echo ">>> Get the firefox driver"
	firefoxVersionUrl="https://github.com/mozilla/geckodriver/releases/latest"
	firefoxVersion=$(curl -L -I -s -o /dev/null -w %{url_effective} $firefoxVersionUrl)
	firefoxVersionNumber=`expr "${firefoxVersion}" : '.*/tag/\(.*\)'`
	echo ">>> Driver version ${firefoxVersionNumber}"
	firefoxDriverUrl="https://github.com/mozilla/geckodriver/releases/download/${firefoxVersionNumber}/geckodriver-${firefoxVersionNumber}-linux64.tar.gz"
	curl $firefoxDriverUrl -L -s -o geckodriver.tar.gz
	tar xzf geckodriver.tar.gz
	chmod ugo+x geckodriver
else
	echo "osx not yet configured"
fi
