# 🦉 Owlback

**Owlback** est un projet développé dans le cadre de l'obtention du titre RNCP **Concepteur Développeur d'Applications** à l'école [LaPlateforme\_](https://laplateforme.io).

Owlback est une application mobile pensée pour simplifier le suivi de vos **factures** et **notes de frais** au quotidien. Elle s'adresse particulièrement aux personnes souhaitant automatiser et fluidifier leur gestion administrative — de l'archivage des documents jusqu'à la transmission à leur comptable.

L'intelligence artificielle, bien que discrète dans l'interface, joue un rôle clé dans l'automatisation des traitements et l'amélioration de votre productivité.

---

> Ce repository couvre l'**application mobile** uniquement.

---

### Auteurs

- 👦🏾ZANAGLIA Michael & 👦 GASS Mathéo

## 🚀 Features

- ⚛️ **React Native** with TypeScript, Zod, useQuery, Formik...
- 🎨 **React Native Reusables** powered by [Nativewind](https://www.nativewind.dev/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+**

## 🛠️ Tech Stack

- React Native 0.81+
- Expo
- React 19+
- TypeScript
- Nativewind
- React Native Reusables
- Zod (Schema validation)
- useQuery
- ShadCN UI components

# 🚀 Installation

This is a React Native project built with [Expo](https://expo.dev/) and [React Native Reusables](https://reactnativereusables.com).

It was initialized using the following command:

```bash
npx @react-native-reusables/cli@latest init -t owlback-mobile
```

## Getting Started

### 0. 🐋 Docker

If you want to run it from docker you don't have to follow the next steps. All you have to do is :

```bash
docker compose up --build
```

You can also interact with expo dev server in your IDE with `docker compose attach <CONTAINER_NAME>`.

### 1. Run server

To run the development server:

```bash
    npx expo run --tunnel -c
```

This will start the Expo Dev Server. Open the app in:

- **iOS**: press `i` to launch in the iOS simulator _(Mac only)_
- **Android**: press `a` to launch in the Android emulator
- **Web**: press `w` to run in a browser

You can also scan the QR code using the [Expo Go](https://expo.dev/go) app on your device. This project fully supports running in Expo Go for quick testing on physical devices.

> ⚠️ Make sure to have ngrok for the `--tunnel` flag otherwise you can install it by the following command : `npm install -g @expo/ngrok@^4.1.0`.

### 2. Copy the .env config

`cp .env.example .env`

### 3. Adding components

You can add more reusable components using the CLI:

```bash
npx react-native-reusables/cli@latest add [...components]
```

> e.g. `npx react-native-reusables/cli@latest add input textarea`

If you don't specify any component names, you'll be prompted to select which components to add interactively. Use the `--all` flag to install all available components at once.

## Potential errors that may occur

## Learn More

To dive deeper into the technologies used:

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [Nativewind Docs](https://www.nativewind.dev/)
- [React Native Reusables](https://reactnativereusables.com)

## Deploy with EAS

The easiest way to deploy your app is with [Expo Application Services (EAS)](https://expo.dev/eas).

- [EAS Build](https://docs.expo.dev/build/introduction/)
- [EAS Updates](https://docs.expo.dev/eas-update/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)

---

If you enjoy using React Native Reusables, please consider giving it a ⭐ on [GitHub](https://github.com/founded-labs/react-native-reusables). Your support means a lot!
