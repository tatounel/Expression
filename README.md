# Expression

CUNY Tech Prep Fall 2019 Project: Team WIT

#Windows User Installation Guide:
Please do the following:
-npm install
-npm install -g yarn
-npm install react-native-picker-select
-npm install react-navigation
-npm install react-navigation-stack
-npm install react-native-scalable-image --save
-react-native@{{version}}: select 0.59.8
-react@{{version}}: select 0.16.11 (latest version)
-npm i react-native-modal-dropdown -save
-Please download datagrip for software and select postgresSQL as a database and enter the infomation under the server/api/config/config.json

#New Update needs to be installed as of 11/29/2019
-expo install expo-image-picker
-yarn add react-native-image-view
-yarn add react-native-cn-richtext-editor

#Mac User Installation Guide:

#Instructions to open the Projects
1)Open Terminal -> Go into Expression folder -> cd server
2)yarn start (always let it run)
3)Open Another Terminal -> Go into the Expression folder -> cd server
4)yarn run seed (do it once and then you can close the terminal)
5)Open Another Terminal ->Expression folder -> yarn start

#Errors(any errors you get for development either on emulator or smartphone devices):
1st Choice:
-npm install
-yarn install

2nd Choice:
-Delete package.json.lock
-Delete node modules: rm -rf node_modules
-Then yarn install

3rd Choice:
#If error continues make sure you have set up your emulator before you start your deployment.

#Errors on database
-Please do yarn add express
then follow the instructions above on how to open the project

#Errors when starting up your emulator
-Do a cold Boot on your emulator (If it doesn't work proceed to the next bullet)
-Wipe the data on your emulator
