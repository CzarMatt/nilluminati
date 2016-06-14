var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

// vars this app uses to know who has chatted recently.
var prevUserName = '';
var userName = 'Chicxulub';

// Need this to get user's ip address correctly.
app.enable('trust proxy');

// body parser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

// the bot will interrupt all post requests to this app.
app.post('*', function critical(req, res) {
    var data = req.body;
    var textToParse = req.body.text;
    
    // Protect against unknown sources by checking the token.  401 = unauthorized
    if (process.env.OUTGOING_WEBHOOK_TOKEN && data.token !== process.env.OUTGOING_WEBHOOK_TOKEN) {
        return res.status(401).end();
    }

    // return if slackbot is chatting because we don’t want an infinite loop
    // slack can ban this app for spamming the chatroom.
    if (data.user_name === 'slackbot') {
        return res.status(200).end();
    }

    // return if the incoming user is the same as the previously stored user
    if (data.user_name === userName) {
        return res.status(200).end();
    }

    prevUserName = req.body.user_name === userName ? prevUserName : userName;
    userName = req.body.user_name;

    // sample strings to compare against
    var substrings = ['wfh', 'work at home', 'working at home', 'be in by', 'in the office by',
        'work from home', 'working from home', 'leaving early', 'vacation'];

    // result will be true if any of the sample strings are contained within the incoming text
    var result = containsAny(textToParse.toUpperCase(), substrings);

    if (result) {
        // we have a match!  send the bot's response
        var botResponse = {
            icon_url: 'http://i.imgur.com/eGBcBrA.png',
            username: 'Nilluminati Bot',
            text: ' @' + userName + ', IN THE MIDDLE OF THIS CRITICAL SPRINT!!??!!?!!1'
        };

        // log out some stuff
        console.log('response = ' + textToParse);
        res.json(botResponse);

    } else {
        //reply to the server and don't keep it hanging. Slack might disable this bot if too many timeouts
        console.log('Nothing to parse. ::: textToParse = ' + textToParse);
        return res.status(200).end();
    }
});

// the bot also replies to everyone else doing a get request.  (for testing)
app.get('*', function(req, res) {
    var ip = req.ip;
    res.status(200).send(' ' + ip + ', IN THE MIDDLE OF THIS CRITICAL SPRINT!!??!!?!!1');
});

// error handler
app.use(function(err, req, res) {
    console.error(err.stack);
    res.status(400).send(err.message);
});

app.listen(port, function() {
    console.log('The Illuminati is listening on port ' + port);
});

function containsAny(str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
        var substring = substrings[i].toUpperCase();
        if (str.indexOf(substring) != -1) {
            return substring;
        }
    }
    return null;
}
