# twitter-bot-environment

This library is meant to be a simple means of setting up a bot-by-bot authorization environment for Twitter. 

The library looks for a `auth.js` file in the root of your project (or can be changed by passing auth_file as a prop to the constructor). It then reads it into memory and provides an environment that can be passed to modules such as [twode](https://github.com/PunkChameleon/twode).

## Sample `auth.js`

It's best to add `auth.js` to your `.gitignore` file.

```javascript
module.exports = {
	consumer_key: 'sample consumer key',
	consumer_secret: 'sample consumer secret',
	access_token_key: 'sample access token key',
	access_token_secret: 'sample access token secret'
};
```

## Usage

```javascript
var BotEnvironment = require('twitter-bot-environment');
var twitter = require('twode');

var be = new BotEnvironment({
	auth_file: 'auth.js' // This is the default value and doesn't need to be passed
});

var twitter_client = new twitter(be.getEnvironment());
```