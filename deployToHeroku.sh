#!/bin/sh
git checkout develop 
git push origin develop
git checkout master
git merge develop
git push origin master
git push heroku master
