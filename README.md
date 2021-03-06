# Welcome to PWA Demo
The intention of this project is to learn how PWAs work using an application that represents a somewhat real scenario. 
The app is a default [ReactJS](https://reactjs.org/docs/hello-world.html)-app (created using [create-react-app, or CRA](https://create-react-app.dev/)), 
and your task is to turn it into a PWA. Some suggestions to what you can do can be found under [Tasks](#tasks).

The main purpose of this app is to manage [GeoFences](https://en.wikipedia.org/wiki/Geo-fence), and the app is separated into the following pages:
* **Home-page**: Displaying a list of stored GeoFences, and render these visually relative to the device's current position.
* **Fence-page**: Renders the selected fence. Just the shape.
* **Create-fence-page**: Lets the user record a set of points, name these, and store them to the server as a GeoFence.
   * The points will be rendered relative to the device's current position

## Disclaimers
* Limited iOS support
* The codebase is provided as is, and is not thoroughly tested, therefore bugs may appear.
* This app is intended for testing-/demo purposes only. Usage happens at the user's discretion.
* The accuracy of the device's position may vary, as it is determined by the available hardware on the device.

## Modules
This app consists of a server ([express](https://expressjs.com/)) and a client ([ReactJS](https://reactjs.org/docs/hello-world.html)). 

### Server
The server is a single file, providing a simple API that stores the GeoFences in memory. 
(A restart will remove all data "stored" through the API)

The API provides a few simple endpoints:
* `GET /api`: The API-root. Has no function, other than greeting you. May be useful for debugging connectivity.
* `GET /api/fences`: Retrieves a list of all stored GeoFences.
* `POST /api/fences`: Adds a GeoFence (provided in the request body).
* `GET /api/fence/:fenceId`: Retrieve the fence with the specified `fenceId`

### Client
The client is responsible for creating and displaying the GeoFences.

The sourcecode is structures like this:
* `./client/src/components`: Contains all "standalone" React components
* `./client/src/declarations`: Contains all interfaces, types and classes
* `./client/src/framework`: Contains all components used to "scaffold" the app. E.g the component rendering the header of the app
* `./client/src/hooks`: Contains all custom hooks
* `./client/src/services`: Contains all logic that does not render anything, and is not a hook
* `./client/src/views`: Contains all component that are responsible for rendering a "page" in the application. E.g the "Home" page.
* `./client/src`: Root: Contains configuration files and globals, including `index`

## Setup and Installation
1. Clone this repo
2. `cd pwa-demo`
3. Run `npm install` in both `./server` and `./client`

**IMPORTANT! Make sure to run both the client and the server on the same host**

## Running the server
1. Open a new terminal 
2. `cd ./server`
3. `npm start`

This will start the server on the port 8080. 
This can be changed either by setting the `PORT` environment variable, 
or changing the default-port in the `./server/server.js` file. 
**Then change the port in `./client/package.json` (the proxy-param) accordingly** 

## Running the client
1. Open a new terminal
2. `cd ./client`
3. Start the client dev-server using HTTPS (See [ReactJS docs](https://create-react-app.dev/docs/using-https-in-development/) for more info):
    * linux/mac: `HTTPS=true npm start`
    * windows: `set HTTPS=true&&npm start`

### Accessing the client on a mobile device
1. Find the URL to your client. It will be logged once you start the React development server.
    * It should be something like: `https://<host-ip-here>:3000`
2. Connect your device to the same network as your host
3. Navigate to the URL found in step 1
    
# Tasks
1. Enable "PWA support":
    * Update the manifest: `./client/public/manifest.json`
    * Register the ServiceWorker
        * This is mostly done by `create-react-app`. See `./client/src/index.tsx`
    * If it worked, you should be able to [connect your mobile device](#accessing-the-client-on-a-mobile-device) 
    and be prompted to add the app to your home screen. 
2. Add appropriate caching-rules
    * See `./client/src/service-worker.ts` and [the Workbox documentation on caching and caching strategies](https://developers.google.com/web/tools/workbox/guides/get-started#routing_and_caching_strategies)
3. Use the `background-sync` API to be able to create GeoFences while offline.
    * See [the WorkBox documentation on background-sync](https://developers.google.com/web/tools/workbox/modules/workbox-background-sync)
4. Use the `notification` API to notify the user when he/she crosses the boundary of a GeoFence.
