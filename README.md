# Pendulum App

The Pendulum App features a React frontend and a Node.js backend. You can run the backend either locally on your machine or within Minikube with multiple instances for testing. Hot reloading is enabled through Skaffold to streamline development.

## Overview

- **Frontend:** Built with React (not included in the hot-reloading setup).
- **Backend:** Built with Node.js.
- **Deployment:** The backend can be deployed with up to 5 instances along with a Mosquitto instance for messaging.

## Prerequisites

Before you begin, ensure you have the following tools installed:

1. **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
2. **Minikube**: [Install Minikube](https://minikube.sigs.k8s.io/docs/start/)
3. **Skaffold**: [Install Skaffold](https://skaffold.dev/docs/install/)

## Project Structure

- **`/frontend`**: Contains the React application code.
- **`/backend`**: Contains the Node.js application code along with `Dockerfile` and `skaffold.yaml` for building and deploying the backend locally and server via port-forwarding.
- **`/k8s`**: Contains Kubernetes manifests for deploying the application, including a ConfigMap for Mosquitto, deployment YAML, and service YAML.

## Running the Backend Locally with Skaffold

1. **Start Minikube**

Open a terminal and start Minikube:

```sh
minikube start
```

2. **Navigate to the backend directory of the Pendulum App:**

```sh
 cd /backend
```

2. **Run the app with Skaffold and port forwarding**

This will deploy the backend instances and set up port forwarding for local access.

```sh
 skaffold dev -p port-forwarding
```

## Frontend Setup

The frontend is not included in the deployment for local development. To develop or run the frontend locally:

1. **Navigate to the frontend directory:**

```sh
 cd /frontend
```

2. **Install Dependencies:**

```sh
 yarn install
```

1. **Start the Frontend:**

```sh
 yarn start
```

The frontend application will be available at http://localhost:3000 by default.

## Backend Api endpoints

**Get status**
GET http://127.0.0.1:3001/status

**Configure pendulum**
POST http://127.0.0.1:3001/configure with body example :

```JSON
{
  "angle": 1.5, //Length: Should be between 5 and 15
  "length": 10,  // Should be between -1.57 and 1.57
}
```

## TODO

| Task                                                                         | Status      |
| ---------------------------------------------------------------------------- | ----------- |
| Add pause feature in frontend                                                | Not Started |
| Implement comprehensive tests for frontend and backend                       | Not Started |
| Review and configure deployment limits                                       | Not Started |
| Introduce Data Transfer Objects (DTO)                                        | Not Started |
| Improve TypeScript typings for better type safety                            | Not Started |
| Implement drag and drop functionality                                        | Not Started |
| Add conflict handling with toaster notifications                             | Not Started |
| Add API Gateway for better management of API requests                        | Not Started |
| Replace static pendulum parameters with dynamic ones                         | Not Started |
| Make API type-safe using tools like TRPC                                     | Not Started |
| Make the UI responsive across different devices                              | Not Started |
| Implement conversion between degrees and radians                             | Not Started |
| Handle min/max constraints for length and angle in both backend and frontend | Not Started |
