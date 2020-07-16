# Todo Firebase

A simple todo app, built on [Firebase](https://console.firebase.google.com/)

# Prerequisites

- Node
- [Firebase CLI](https://firebase.google.com/docs/emulator-suite)
- Yarn
- API Key for Firebase (use a .env file to set this)

Example .env file:

```
REACT_APP_FIREBASE_API_KEY=YOUR_SECRET_HERE
```

# Debug on local

In one terminal, you should run:

```sh
yarn emulator
```

And in another, run:

```sh
yarn start
```

# Deploy

To create a new build, publish it to Firebase as static content, and then delete the build output, run:

```sh
yarn deploy
```

If you just want to review the build output, run:

```sh
yarn build
```
