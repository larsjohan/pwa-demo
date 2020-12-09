# Welcome to PWA Demo
The intention of this project is to learn how PWAs work using an 
application that represents a somewhat real scenario. The app is a default ReactJS-app (created using create-react-app, or CRA), 
and your task is to turn it into a PWA. Some suggestions to what you can do can be found under [Tasks](#tasks).

## Modules
This app consists of a server (express) and a client (ReactJS). 

The main functions of this app are: 
* Recording a collection of geographical coordinates and save these as a [GeoFence](https://en.wikipedia.org/wiki/Geo-fence).
* Retrieving and displaying stored GeoFences. 

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

The app follows the latest recommendations.

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
    * If it worked, you should be able to [connect your mobile device](#accessing-the-client-on-a-mobile-device) 
    and be prompted to add the app to your home screen. 
2. Add appropriate caching-rules
3. Use the `background-sync` API to be able to create GeoFences while offline.
4. Use the `notification` API to notify the user when he/she crosses the boundary of a GeoFence. 