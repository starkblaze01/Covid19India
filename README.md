## :warning: The CORS has been disabled by GOV site, so client-side API would fail, trying setting it up locally and replace the API end-points on [client-side](https://github.com/starkblaze01/Covid19India/tree/main/client/src/config) with the [server-side function](https://github.com/starkblaze01/Covid19India/blob/main/index.js)

# Statistis of Covid 19 in India
- This website uses the end-point from gov site to take the data and show it in our custom UI.
- This is a custom setup of [React](https://react.dev/) using [Webpack](https://webpack.js.org/) without any boilerplate
- This repo has implemented [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) on client side for cache, and apicache for server side caching

# Covid-19_Tracker
To serve static file from backend:
- Install dependencies
    - yarn install 
    - cd client/ && yarn install

- In the root folder run:
    - `node index.js`

To serve with wepback:
- cd client && yarn start
