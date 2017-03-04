
Reactiv.ly
======

Daniel Walker


####Goal:

To build a chrome extension which allows a presenter to revieve audience interactions and engagements during the presentation. Will also serve as an easy way for users to request the slides.


####Overview:

The chrome extension will receive data from the API (this PHP project) and display them on the screen. Meanwhile, another React project (a SPA) will be the frontend for the presentation audience to open on their mobile devices. A link will appear on the presentation and upon visiting it audience members will see a screen with emojis and clicking one will make it flow across the screen of the presentation itself. They will also be able to get a link to the slides and ask questions (stretch goal).

###Detail Overview:

**Chrome Extension:**

- runs in background
- places url notification on screen for viewers
- modifies page css with emjois and questions
- listens for responses from PHP api socket

**PHP Api**

- Recieves "interactions" from audience members
- Pushes to a socket in chrome extension
- Uses MySQL or Redis for data store (not sure yet)
- stores slides url for distribution

**React SPA**

- This is the mobile responsive page audience members will visit during a presentation
- Will show the slides url with a copy option
- Will show a grid of emojis
    - stretch goal: emjois, if held will change size when the show up on the presenter screen - as if they were being "charged up"
- Will allow rapid tapping for spewing icons to presenter

**Slides**

- I plan to make a slide show if I have time to document this stuff
- This will also dog food my app during my presentation

