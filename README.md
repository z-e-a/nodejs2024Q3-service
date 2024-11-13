# Home Library Service

## Description
Simple REST-API service using Nest.js for home media library application.
 `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!  
 Created as a homework at course [NodeJS 2024Q3](https://rs.school/courses/nodejs).

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/z-e-a/nodejs2024Q3-service.git
```

## Installing NPM modules
⚠️ **It's important to use `--force` option to avoid errors trow installation process** ⚠️
```
npm install --force
```

## Running application
Specify the port in the `.env` file (can be copied from `.env.example`) 

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

To run application in development mode

```
npm start:dev
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
