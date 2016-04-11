![The Nilluminati][logo]

[logo]: http://i.imgur.com/YMQs6UO.png "The Nilluminati"

# Nilluminati


This Slack Bot will appear and remind you just how dire your contributions are in this critical sprint.

## Add it on your Slack channel in three steps!
### Step 1 - Create an Outgoing Webhook integration
You'll need to go to https://my.slack.com/services/new/outgoing-webhook and add a new Outgoing Webhook integration. 

Select a channel where you want The Nilluminati to hang out.  Additionaly, there is a Token on the Integration Settings section. Copy that value. You'll need it later.

Keep this browser tab open, because we will come back to it later.

![Outgoing Webhook Token](http://i.imgur.com/tn6Kfgzl.png)

### Deploy this app to Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/czarmatt/critical-sprint/tree/master)

Use that button to deploy this app to Heroku. Before you deploy the app, add the Outgoing Webhook Token for the config variable. Also, give your app a name.

![Outgoing Webhook Token config variable](http://i.imgur.com/iIcRr5yl.png)

### Add the app's URL on the Outgoing Webhook Integration.
Your app should have a URL. If you don't know it, you can find it on Heroku under your app's settings. Take note of it.

Now go back to the integration settings. Add the URL. Save your settings.
