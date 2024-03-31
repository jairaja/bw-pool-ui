# bw-pool-ui

- Better World Pool => The concept involves developing a simple and free carpooling app tailored to small communities, etc.
- The code in this repo, including any parts of it, can be used, and reproduced for personal, professional, or commercial purposes without needing the consent of the owner.
- Please note that while the code can be freely used, the owner of the code may not be liable for any damages or issues that may arise from its use. It is always recommended to review and test the code thoroughly before using it in any production environment.
- Thank you for using the bw-pool-ui code!

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
Got Expo mobile app from respective app store, scan the QR code (_generated in terminal_) to launch the app

### `Run Tests`

All tests, with watchall and coverage report - Run `npm test`

Directory structure is tricky. For complex (react) component, make a folder and add all component related files (i.e. tests, style, sub-component, etc) there. For simpler/smaller component, single component file should be there and tests can go to **tests** folder in the parent folder.

![screen_grab](https://github.com/jairaja/bw-pool-ui/blob/main/app/assets/screen-20240331-182755.gif)
