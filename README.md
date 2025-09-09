# Army Modeling Exercise

This project is built with Node.js and TypeScript.  
Below you’ll find the steps to install dependencies, initialize the project, and run the logs defined in index.ts.

## Prerequisites
Make sure you have installed:
- Node.js v16 or higher
- npm or yarn

## Installation
Clone the repository and install dependencies:

    git clone https://github.com/MarianoBaeza/armies-ts.git

From the installation directory:

    npm install

## Running the Project
To run the project in development mode:

    npm run dev

To build and run the compiled JavaScript version:

    npm run build  
    npm start

## Logs in index.ts
Inside src/index.ts there are several commented console.log statements that help test the exercise’s functionality.  
To enable them:

1. Open the file src/index.ts  
2. Uncomment the log lines you want to run, for example:

// Get Army total points:  
console.log("Chinese Army points:", a.totalPoints, "gold:", a.gold);

3. Save the file  
4. Restart the project:

npm run dev

You should now see the log messages in your terminal.
