For debugging we can use "React Native Debugger"

1. Install [React Native Debugger](https://github.com/jhen0409/react-native-debugger)

2. Add the following to the createStore as parameter in order to debug redux store

    ```js
        export const store = createStore(
          persistedReducer,
          // TODO: To be removed before production as it is for debugging!
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    ```

3. Open React Native Degugger, hit cmd+t to initiate a new debugger

4. run  `npm run ios` to run the project on ios simulator

5. Shake device and enable debugging

6. Start debugging