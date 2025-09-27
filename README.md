# 🚗 Better World Pool UI (bw-pool-ui)

![Expo](https://img.shields.io/badge/built%20with-Expo-blue)
![React Native](https://img.shields.io/badge/React%20Native-✅-green)
![License](https://img.shields.io/badge/license-MIT-blue)

> A work-in-progress carpooling app (completion: 30–40%)  
> Free and simple ride-sharing for daily commuters, office-goers, and communities.

---

## 📌 Overview

**Better World Pool** is a lightweight, mobile-first carpooling solution built with **React Native**, **Expo** and **Firebase**. The goal is to connect commuters, allowing them to share rides efficiently, save fuel, reduce traffic, help the environment and network while travelling together.

### 💡 Use Cases of Eco-Friendly ride matching
- Daily office commutes  
- Intercity travels  
- Community/society ridesharing    

---

## 🧰 Tech Stack

| Layer        | Stack                            |
|--------------|----------------------------------|
| **Frontend** | React Native, Expo, TypeScript, JavaScript, Recoil |
| **BAAS**     | Firebase                         |

---

## 📦 Installation

Follow the steps below to set up the project locally:

### 1. **Clone the Repository**
```bash
git clone git@github.com:jairaja/bw-pool-ui.git
cd bw-pool-ui
````

### 2. **Install Dependencies**

```bash
npm install
```

### 3. **Run the Mock Data Server (Web Only)**

In a separate terminal window, run:

```bash
npm run server
```

> ✅ Mobile apps already use mock data from:
> [https://mocki.io/v1/cf332720-3b21-4c42-952a-aa41cd212520](https://mocki.io/v1/cf332720-3b21-4c42-952a-aa41cd212520)
> No setup needed for mobile mock data.

### 4. **Run the App (Expo Bundler)**

Start the Expo server:

```bash
npm start
```

Then:

* Scan the QR code using the **Expo Go** app on Android/iOS
* Or press `w` in the terminal to open in the web browser

---

## 🧪 Running Tests

To run all unit tests with watch mode and coverage reporting:

```bash
npm test -- --watchAll --coverage
```

> Test files are placed alongside components or in a central `/tests` directory.

---

## 📁 Project Structure

The project follows a hybrid **feature-based** and **function-based** structure.

<details>
<summary>Example directory layout</summary>

```
src/
├── components/
│   └── RideCard/
│       ├── RideCard.tsx
│       ├── RideCard.test.tsx
│       ├── RideCard.styles.ts
│       └── index.ts
├── screens/
│   └── Home/
│       ├── HomeScreen.tsx
│       ├── HomeScreen.test.tsx
│       └── HomeScreen.styles.ts
├── graphql/
│   └── queries/
├── utils/
├── assets/
```

</details>

* **Complex components**: Use folders (with component, test, styles).
* **Simple components**: Use a single file + shared test directory.

---

## 🛣️ Roadmap

* [x] Project scaffold and UI starter
* [x] Mock data for development
* [ ] Full ride listing and booking flow
* [ ] Real-time ride matching
* [ ] In-app messaging
* [ ] Push notifications (Expo)
* [ ] Production backend integration

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repo
2. Create a new branch (`feature/my-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

Please write clean code and include tests where applicable.

---

## 📄 License & Usage

This project is licensed for free use:

* ✅ Personal
* ✅ Commercial
* ✅ Professional

> ⚠️ **Disclaimer**
> The code is provided “as-is” with no warranties.
> Use at your own risk. Test thoroughly before deploying to production.
> The authors are not liable for any damages or issues caused by its use.

---

## 🙏 Acknowledgments

Thanks for checking out **Better World Pool**. We hope this helps you build smarter and greener transportation solutions.

---

```

Let me know if you want this as a downloadable file, or if you'd like a shorter or lighter version (for GitHub or npm package use).
```


## ✅ Preview
![screen_grab](https://github.com/jairaja/bw-pool-ui/blob/main/app/assets/screen-20240331-182755.gif)
