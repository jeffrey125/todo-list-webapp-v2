# React-TS-Todo-App

Link: https://todo-list-webapp-v2.vercel.app/

Repo Link on Todo-list-webapp version 1: https://github.com/jeffrey125/todo-list-webapp

This is an upgrade to my first To-do app which is built on Vanilla JS with an MVC architecture, I decided to re-create it in React + Typescript. This project is a simple To-Do CRUD app that is built on React and Typescript

## Techs Used

- React
- Typescript
- uuid
- Tailwind
- Heroicons
- Haikei
- Framer-motion
- pwa-assets-generator

### Journey for this project

- (06/06/2022) I first initialized the project as a test practice for my React-TS, so I set the global CSS setting, support for CSS module for TS and added a reusable Card component to be used by my Todo App, at this time I also added the new todo functionality

- (06/07/2022) I created the button for each to-do and style my card component, but this time I decided that this To-do-app will be the upgrade for my very first project which is my to-do app that is made on Vanilla JS with a MVC architecture. So I decided to ramp it up and migrated my style to tailwind-css and my animation to framer-motion, I also downloaded the UUID for each to-do to have a unique ID so that I can select them on my LocalStorage. I also implemented the mobile query for this app as a mobile first design.

- (06/08/2022) I decided to revamp my business logic of my to-do app and use the useContext hook for it, I made the context and provider component with it and also the useReducer function to update the state of the context.

- (06/09/2022) The business logic is already done this app has now complete CRUD functionality and it is connected in localStorage already, I also change the font color to have a better accessiblity for it, also I made a reusable Todo Button to make my code DRY. By this time I'm starting to implement the animations for my to-do-app, I also implemented the Theme switcher for this app.

- (06/10/2022) I added the animation using framer-motion and I planned to add the reorder animation using it.

- (06/11/2022) I added a scrollIntoView functionality whenever a todo data is added/rendered, I made a dummy div and put it in the bottom part of my unordered list and put a useRef on it so that whenever a user enters a new data it will point to that empty div. So I lifted up the useRef and passed it down onto my NewTodo component and on my submitHandler I utilized the async/await keyword so that my scrollIntoView will wait the data component to render so that it will scroll in to the latest data.

- (06/12/2022) I finally finished my Todo APP I included all of the features to be implemented in the future on my To-do-app-v1, I also encountered a bug in framer motion on reorder lists is that when you make the dragListener to false on Reorder.Item it will highlight all of the contents of the list while you drag and also the drag event is not working on mobile devices so I decided to make the whole list draggable and not depend on a button The github opened issue can be found here: https://github.com/framer/motion/issues/1579

- (06/13/2022) Today I learned about PWA and turned this app into a PWA, I utilized pwa-assets-generator for making a simple splash screen and logo screen to be compatible to any devices, although my PWA knowledge is still basic I will continue myself to learn on this technology, because It interest me on building stuff like this.
