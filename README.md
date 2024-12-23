# Getting Started with HealthStrap

Welcome to the HealthStrap project! This guide will walk you through the steps to set up and run the application.

## Prerequisites

### Node.js and npm
Make sure you have Node.js and npm installed on your system. If not, download and install them from [Node.js](https://nodejs.org/).

### Node-RED
Install Node-RED on your machine. Follow the [official installation guide](https://nodered.org/docs/getting-started/local).

---

## Steps to Set Up HealthStrap

### 1. Running the Application
In the project directory, run the following command to start the app:

```bash
npm start
```

### 2. Configuring MQTT Credentials
Retrieve your username and password from the end of the report provided. Add these credentials to the `mqttOptions` constant located in the `src/App.js` file.

```javascript
const mqttOptions = {
  username: "your_username",
  password: "your_password",
  // other configurations
};
```

### 3. Setting Up Node-RED

#### Install and Launch Node-RED
- Download and install Node-RED following [this guide](https://nodered.org/docs/getting-started/local).
- Once installed, start Node-RED by running the following command in your terminal:

```bash
node-red
```

- Open your browser and navigate to `http://localhost:1880` to access the Node-RED workspace.

#### Importing Node-RED Configuration
1. In the Node-RED workspace, click on the menu in the top right corner and select **Import**.

   ![Import Menu](https://github.com/user-attachments/assets/fcaf5751-e7ba-490c-9ca6-a1cdf41e4e63)

2. In the overlay that appears, paste or import the JSON configuration file located at `src/node-red/ConfigurationHealthStrap.json`.

   ![JSON Import Overlay](https://github.com/user-attachments/assets/8873854a-5eb2-40b9-888f-1258e48df012)

3. Validate the import and ensure the configuration is correctly loaded. Deploy the flow and verify that all connections are established successfully.

---

## Arduino Code Setup
Once the hardware setup is complete and data is being transmitted to the TTN server, no further actions are required on this side.

---

## Final Steps
At this stage, everything should be functional. If you encounter any issues, refer to the documentation or contact support.

Enjoy using HealthStrap!

