#!/bin/sh
echo ' ----------------------------------------------------------'
echo '|               checkout on develop branch                 |'
echo ' ----------------------------------------------------------'
git checkout develop 
echo ' ----------------------------------------------------------'
echo '|                push to origin develop                    |'
echo ' ----------------------------------------------------------'
git push origin develop
echo ' ----------------------------------------------------------'
echo '|               checkout on master branch                  |'
echo ' ----------------------------------------------------------'
git checkout master
echo ' ----------------------------------------------------------'
echo '|           merging develop branch into master             |'
echo ' ----------------------------------------------------------'
git merge develop -m 'Merge develop into master'
echo ' ----------------------------------------------------------'
echo '|               push to origin master                      |'
echo ' ----------------------------------------------------------'
git push origin master
echo ' ----------------------------------------------------------'
echo '|                   push to Heroku                         |'
echo ' ----------------------------------------------------------'
git push heroku master
echo ' ----------------------------------------------------------'
echo '|               checkout on develop branch                 |'
echo ' ----------------------------------------------------------'
git checkout develop
