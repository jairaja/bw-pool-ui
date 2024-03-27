# bw-pool-ui

### `Clone the Project`

Clone the project on your local machine.
git clone git@github.com:jairaja/bw-pool-ui.git

### `Install the Project Dependencies`

Run the `npm install` command in your terminal to install the project's dependencies.

### `Run mock data server`

Only for Web - Mock Data Server - Open another window in terminal and run 'npm run server'.
For mobile, get mock data from - https://mocki.io/v1/cf332720-3b21-4c42-952a-aa41cd212520 (_already in code as of now, no need to do anything here_)

### `Run app(expo)`

Start Expo bundler for android, ios apps and web - Run `npm start`

### `Run Tests`

All tests, with watchall and coverage report - Run `npm test`

Directory structure is tricky. For complex (react) component, make a folder and add all component related files (i.e. tests, style, sub-component, etc) there. For simpler/smaller component, single component file should be there and tests can go to **tests** folder in the parent folder.
