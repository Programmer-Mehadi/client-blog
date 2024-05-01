"use client"
import { store } from "./store"
import { Provider, useDispatch } from "react-redux"

// import { PersistGate } from "redux-persist/integration/react"

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  )
}
