# Backend-Based Todolist
A good-old todolist, built with NodeJS and Express, and connected to MongoDB through Mongoose.

This project is made as homework in my course "dynamisk webbutveckling" at Medieinstitutet, and includes the following features:

 - Fully functional server that's capable of CRUD operations
 - Ability to create accounts with unique, separate todo-items
 - Ability to modify account passwords by clicking on a "forget password" link, entering an email address, and receiving a reset link by email
- Secure MongoDB database where passwords and reset tokens are encrypted by the bcrypt hashing function. Information is never stored in plain-text, but instead always salted and hashed by bcrypt before being stored in the database.
- User validation by using JWT cookies and express session middleware (used both packages in order to learn more about how each of them work, and the differences between them).
 - Result pagination, ability to sort by date
 - Night Mode, CSS toggle made completely from scratch!
 - Real-time clock, tells day of week, date of year, and displays a greeting based on time of day.

To install, download the codebase, open in your code editor of choice, open your terminal and install all dependencies by typing `npm install`, then type in `npm start` to start running the application. 

Note that the URI to my database is stored in a hidden `.env` file that is ***not*** included in this repository, and you will therefore need your own MongoDB Atlas account to use this todo app. Visit the MongoDB [website](https://www.mongodb.com/cloud/atlas) to register a new account.
