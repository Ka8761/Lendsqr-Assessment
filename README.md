What I Used

React for building the UI

React Router for navigation

TypeScript in some files (mainly in the pages folder) to add better type safety where it made sense

Sass (SCSS) for styling some pages, especially where nesting helped keep styles cleaner

LocalStorage to cache user data and handle a simple mock login

=> Search Context

A global search context was created using React Context.
The idea was to represent a general admin search that could later work across multiple sections of the app.

For now:

The context is set up and wrapped around the layout

It’s not fully connected to all pages

Only the Dashboard and Users pages were implemented, so I left the search as a foundation for future work possibly lol


=> To install all dependencies, run:

npm install


To start the development server:

npm start

