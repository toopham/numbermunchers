# numbermunchers
Number Munchers game 

## Installation

To install, fork and then clone to your local machine.
```
git clone https://github.com/toopham/numbermunchers.git
```
Go inside folder and install all dependencies within folder
```
cd numbermunchers
npm install
```
bundle react app with webpack by using the command
```
npm run build
```

*Database*:
You will need a MongoDB URI. You can go to www.mongodb.com and register for an account. 
Create a file secret.js at the path server/data/secret.js and include in the URI you want to use.
Your secret.js file should look something like this
```
const URI = 'YOUR MONGODB URI HERE';

module.exports = URI;
```
Start server with game running 
```
npm start
```
----
#Num Munchers

**Description**: A classic game that I played when I was a kid in the 90's. This is an open source project with the goal of reinventing the game with a few new rules. My hope is to get the younger generation to be excited about math and have fun at the same time. 

**Technology Stack**


**Status** : Beta 0.0.5 

##Getting involved
This is a personal project that I would love to get feedback/contributions from other developers. You can reach out to me through Github or email me at toopham at gmail dot com.


## Open source licensing info
[MIT License](https://github.com/toopham/numbermunchers/blob/main/LICENSE)
