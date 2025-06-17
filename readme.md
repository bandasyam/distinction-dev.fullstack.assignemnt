## PROJECT SETUP

1. Clone the repository
2. Install all the node-modules using the command `npm install`
3. To start the project use the command `npm start`

> **Note:** MongoDB must be installed locally **with replica set configuration enabled** to support sessions (including **multi-document transactions**).  
> Alternatively, you can use **MongoDB Atlas** or any cloud-hosted MongoDB instance by providing the appropriate connection URI.

```
├── backend/
│ ├── src/
│   ├── repositories/
│   ├── routes/          # All the routes of backend
│   ├── controllers/     # All the controllers of backend
│   ├── utils/           # All the helpers functions of backend
│   ├── middlewares/     # All the middlewares of backend
│   ├── bodyschemas/     # All the joi body validation schemas of backend
│   ├── utils/           # All the helpers functions of backend
|   └── index.ts         # Entry point for backend
│   └── app.ts           # Express app code for backend
│
├── frontend/ # Frontend application code
│ ├── src/
│   ├── Components/          # All the components of react
│   ├── Pages/               # All the pages of react
│   ├── utils/               # All the helpers of react
│ ├── public/
│ └── package.json
│
├── package.json
└── README.md
```
