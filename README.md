# bw-pool-ui (_work in progress, current completion: 30-40%_)

- Better World Pool => The concept involves developing a simple and free carpooling app tailored to office goers, daily commuters, weekend travelers, communities, etc.
- The code in this repo, including any parts of it, can be used, and reproduced for personal, professional, or commercial purposes without needing the consent of the owner.
- Please note that while the code can be freely used, the owner of the code may not be liable for any damages or issues that may arise from its use. It is always recommended to review and test the code thoroughly before using it in any production environment.
- Thank you for using the bw-pool-ui code!

### `Clone the Project`
Clone the project on your local machine: `git clone git@github.com:jairaja/bw-pool-ui.git`

### `Install the Project Dependencies`
Run the `npm install` command in your terminal in the project's root directory to install the project's dependencies.

### `Run mock data server`
Only for Web - Mock Data Server - Open another window in the terminal and run `npm run server`.
For mobile, get mock data from - https://mocki.io/v1/cf332720-3b21-4c42-952a-aa41cd212520 (_already in code as of now, no need to do anything here_)

### `Run app(expo)`
Start Expo bundler for Android, IOS apps, and web - Run `npm start`
Got Expo mobile app from Android and/or IOS app store, scan the QR code (_generated in terminal_) to launch the app

### `Run Tests`
All tests, with watch-all and coverage report - Run `npm test`

### `Code Directory Structure`
The directory structure is a balanced blend of function-based and feature-based structures.
- At the high level, code is organized in directories following a feature-based structure.
  - Within these directories, the structure again follows a feature- or function-based approach.
- For complex components, create a dedicated folder for and include all related elements such as the component itself, tests, styles, and sub-components.
- For simpler or smaller components, a single file suffices, with tests placed in the parent folder's test directory.

### `Tech Stack`
- Frontend - React Native, Expo, React, Typescript, Javascript
- Backend and DB - Node.js, GraphQL, MongoDB

### `Preview`
![screen_grab](https://github.com/jairaja/bw-pool-ui/blob/main/app/assets/screen-20240331-182755.gif)
