Overview The Reel World Movie App is a Website Application powered by React, Material UI and the TMDB API. This application allows users to explore top-rated, trending, upcoming movies and more while providing functionalities such as a must-watch list, movie reviews etc. This application integrates Firebase for user authentication and local storage for storing data.

Features -Browse Movies: Explore trending, top-rated, upcoming, and other movie categories. Movie page details containing information about the cast, production costs, country of production, production companies etc.

-Favourites and Must-Watch lists: Functionality to add and remove movies from a list of favourites or a list of must watch. These lists persist between sessions through local storage.

-Search, filter and sort: App allows for searching movies by title, filter by genres or sort movies by popularity, release date or highest rating.

-Review System: A user may display reviews for any movies as well as leave a review themselves through the implementation of review form.

-Actor Pages: View details about an actor such as their biography and the movies they have starred in.

-Production Page: View list of movies based on the production company.

-Firebase Authentication: User login, signup and forgot password functionalities (With fully working password reset email link)

-Cached with React Query

-Dark and Orange theme for simplistic clean design.

Main Pages:

-Home (Displays popular movies and navigation options such as a dropdown box, arrows and tabs on the top of the site header.

-Trending Movies (Highlights the most popular movies of the day)

-Top Rated Movies (Lists movies with the highest ratings of all time)

-Upcoming movies (A sneak peek into upcoming releases)

-Favourites Page: Add movies from any other part of the website into a favourite list.

-Must Watch Page: Add movies from any other part of the website into a must-watch list.

-Movie Details Page: Displays movie details about a specific movie, clicking on the movie directs to this page.

-Actor Details Page: Displays details about a specific actor which can be chosen from the movie details page.

-Movie by production company page: Displays a list of movies which the specific production company has produced.

Used Technologies: -React

-Context API

-TMDB API

-Firebase

-Material UI

-React Query

-React Router

-Local Storage

Static Endpoints: /trending/movie/day

/movie/upcoming

/movie/top_rated

Parameterized Endpoints

/movie/:id

/movie/:id/credits

/movie/:id/recommendations

/person/:id

/person/:id/movie_credits

How to use the app: Sign up or log in using a valid email address (If you use an invalid one, it will allow to register but no way to reset the password)

Explore movies by using the various navigation methods.

Manage your list of favourite movies and must-watch movies.

Click on movie titles and other things on the website to find out more details about specific things such as movies, actors or production details.

Submit a review or view official reviews.

Known issues and future improvements:

-Favourites and must-watch lists are stored locally and are not tied to user accounts (This can be implemented with premium firebase account)

-Improved error handling for API failures could be implemented.

-Pagination for movie listings to enhance scalibility (Top 20 only display currently)

SETUP: git clone https://github.com/MarcinBudzinski26/webdev-react-assignment.git

-Inside Movies Folder run these commands-

npm install

npm install --save-dev @babel/plugin-proposal-private-property-in-object

npm install @fontsource/lexend

npm install firebase

npm install @mui/material @emotion/react @emotion/styled @mui/icons-material --save

npm install react-router-dom

npm install --save react-query

npm install react-firebase-hooks

npm install react-hook-form

npm start
