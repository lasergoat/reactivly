
![reactivly-logo](https://cloud.githubusercontent.com/assets/15964/23580177/75dfe62e-00ca-11e7-96a2-db29c87529ab.png)

Daniel Walker

------

####Goal:

To build a chrome extension which allows a presenter to revieve audience interactions and engagements during the presentation. Will also serve as an easy way for users to request the slides.

-----

Running Locally:
=====

**Run `npm start`**

- This will start redis and a socket server


-----

Overview:
=====

The chrome extension will receive data from the API (this PHP project) and display them on the screen. Meanwhile, another React project (a SPA) will be the frontend for the presentation audience to open on their mobile devices. A link will appear on the presentation and upon visiting it audience members will see a screen with emojis and clicking one will make it flow across the screen of the presentation itself. They will also be able to get a link to the slides and ask questions (stretch goal).


Goals vs Progress:
----

- [ ] Backend Allows Multiple Instances
- [x] Backend Records Presentation URL
- [x] Frontend Allows Spamming Emojis
- [x] Frontend Allows Copying Slide URL
- [ ] Frontend Allows Asking Questions
- [ ] Frontend Allows Emoji Intensity
- [x] Chrome Extension Shows Emojis
- [x] Emojis Animate Across Screen
- [ ] Slides done for my actual presentation
- [ ] App Deployed to Prod Server for Use

-----

Detail Overview:
=====

**Chrome Extension:**

NOTE: _[link to repo here](https://github.com/lasergoat/reactivlyext)_

- runs in background
- places url notification on screen for viewers
- modifies page css with emjois and questions
- listens for responses from PHP api socket

**PHP Api**

- Recieves "interactions" from audience members
- Pushes to a socket in chrome extension
- Uses MySQL for data store (might not be needed)
- stores slides url for distribution
- in order to push events to the socket, will also need a node script to listen for Redis pushes

_The php will use these socket.io events:_

- `Interact` (pushed from spa)
    - emoji type
    - "intensity"
- `Question` (pushed from spa)
    - includes question text
    - stretch goal: include audience member name
- `BeginSlides` _new presentation_ (pushed from api)
    - includes slides url

**React SPA**

NOTE: _[link to repo here](https://github.com/lasergoat/reactivlyspa)_

- This is the mobile responsive page audience members will visit during a presentation
- Will show the slides url with a copy option
- Will show a grid of emojis
    - stretch goal: emjois, if held will change size when the show up on the presenter screen - as if they were being "charged up"
- Will allow rapid tapping for spewing icons to presenter

**Slides**

- I plan to make a slide show if I have time to document this stuff
- This will also dog food my app during my presentation

----

Requirements
====

- homebrew
- `brew install redis`
- node js
- composer
