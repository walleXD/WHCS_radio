import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "remote-redux-devtools"
import { reactReduxFirebase, getFirebase } from "react-redux-firebase"
import { reduxFirestore, getFirestore } from "redux-firestore"
import withRedux from "next-redux-wrapper"
import thunk from "redux-thunk"
import firebase from "firebase"
import "firebase/firestore"

import reducers from "../reducers"

const apiKey = process.env.apiKey
const authDomain = process.env.authDomain
const databaseURL = process.env.databaseURL
const projectId = process.env.projectId
const storageBucket = process.env.storageBucket
const messagingSenderId = process.env.messagingSenderId
const __DEV__ = process.env.NODE_ENV === "development"

// initialize firebase & firestore instance
const config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  firebase.firestore()
}

// react redux firebase config
const rrfConfig = {
  userProfile: "users"
}

export default (preloadedState = {}) => {
  const rootReducer = combineReducers(reducers)

  const devMiddlewares = [require("redux-immutable-state-invariant").default()]

  const prodMiddlewares = [thunk.withExtraArgument(getFirebase, getFirestore)]

  const createStoreWithMiddleware = composeWithDevTools(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
    applyMiddleware(...prodMiddlewares, ...(__DEV__ && devMiddlewares))
  )(createStore)

  return createStoreWithMiddleware(rootReducer, preloadedState)
}
