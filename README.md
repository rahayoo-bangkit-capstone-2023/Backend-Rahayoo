# Backend-Rahayoo

This is the backend repository for the Rahayoo Bangkit Capstone 2023 project. This repository contains the backend code used to develop features for the Rahayoo project.

## Installation

Here are the steps to install and run the Rahayoo backend:

1. Make sure you have [Node.js](https://nodejs.org/) installed on your system.
2. Clone this repository to your local directory: `git clone https://github.com/rahayoo-bangkit-capstone-2023/Backend-Rahayoo.git`.
3. Open a terminal and navigate to the repository directory: `cd Backend-Rahayoo`.
4. Install the required dependencies by running: `npm install`.
5. Create a `serviceaccountkey.json` file and populate it with a valid access key. This file is required for authenticating with Firebase.
6. Ensure you have a MySQL database available and adjust the connection settings in the `database.js` file.
7. Start the backend by running: `npm start`.

## Usage

Once you have successfully installed and started the Rahayoo backend, you can access the following endpoints:

- `/` (GET): Returns the message "Hello World!".
- `/api/auth` (all methods): Endpoint for user authentication. This endpoint requires JWT authentication.
- `/api/stress` (all methods): Endpoint for the stress level feature.

Example HTTP request:

```
GET /
```

Response:

```
HTTP/1.1 200 OK
Content-Type: text/html

Hello World! it is on
```

## Contribution

If you would like to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create a new branch for the feature or fix you want to work on: `git checkout -b my-feature`.
3. Make the necessary changes and commit your changes: `git commit -m "Add my feature"`.
4. Push your branch to your repository: `git push origin my-feature`.
5. Submit a pull request in this repository.

## License

This project does not have a license mentioned in the README. If you intend to use or contribute to this project, it is recommended to contact the developers through the provided contact information below.

## Contact

If you have any questions or would like to communicate with the project developers, please contact:

- Rizky Pramudita
- Fanisa Nimastiti

Please email either of them to get more information about the Rahayoo project.
