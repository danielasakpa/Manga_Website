# YUKI MANGA

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![React](https://img.shields.io/badge/React-17.0.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Latest-blueviolet)
![Node.js](https://img.shields.io/badge/Node.js-Latest-green)
![Express.js](https://img.shields.io/badge/Express.js-Latest-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-brightgreen)

Welcome to **YUKI MANGA**, a comprehensive manga exploration platform developed with React, Tailwind CSS, MangaDex API, Node.js, Express.js, and MongoDB. This project was an exciting journey that involved overcoming challenges, implementing innovative solutions, and leveraging cutting-edge technologies.

## Screenshots
<br/>

<table align="center">
  <tr>
    <td>
      <p align="center">
        <img src="https://i.ibb.co/MCh4Rk6/Yuki-Manga.png" alt="Alt Text">
      </p>
    </td>
    <td>
      <p align="center">
        <img src="https://i.ibb.co/d2k2mW8/Yuki-Manga-2.png" alt="Alt Text">
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p align="center">
        <img src="https://i.ibb.co/9HwSLsK/Yuki-Manga-3.png" alt="Alt Text">
      </p>
    </td>
    <td>
      <p align="center">
        <img src="https://i.ibb.co/VVp5Fpn/Yuki-Manga-1.png" alt="Alt Text">
      </p>
    </td>
  </tr>
</table>

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [What You Can Do](#what-you-can-do)
- [Project Structure](#project-structure)
- [Learning Along the Way](#learning-along-the-way)
- [Repository Structure](#repository-structure)
- [Getting Started](#getting-started)
- [Explore API Documentation](#explore-api-documentation)
- [Explore Proxy Server](#explore-proxy-server)
- [Explore Manga Server](#explore-manga-server)
- [Contributing](#contributing)
- [License](#license)

## Overview

**YUKI MANGA** is your ultimate destination for immersive manga exploration! Discover, read, and manage your favorite manga seamlessly with this cutting-edge Manga App. Developed with a tech stack that includes React for the frontend, Tailwind CSS for styling, and Node.js and Express.js for the backend, this project is designed to offer a visually captivating and feature-rich experience for manga enthusiasts.

## Tech Stack

- **React**: Frontend framework for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Node.js**: JavaScript runtime environment for server-side development.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Netlify Serverless Functions**: Serverless compute service provided by Netlify for deploying APIs and other server-side functions.
- **Passport**: Authentication middleware for Node.js, widely used for implementing authentication strategies.
- **Express-session**: Middleware for Express.js to manage session data, useful for implementing user sessions in web applications.
- **Sharp**: High-performance image processing library for Node.js, commonly used for resizing, cropping, and other image transformations.

## What You Can Do

- **Discover Manga:** Explore a vast collection of manga from various genres.

- **Read Manga:** Immerse yourself in an unparalleled reading experience with a user-friendly reader.

- **Manage Reading List:** Create and organize your reading list. Keep track of manga you're currently reading and those on your wishlist.

- **Secure Account:** User authentication ensures the security of your account and reading preferences.

## Project Structure

The project is organized into different modules, each serving a specific purpose:

- **Frontend:** The user interface built with React and styled with Tailwind CSS.

- **Backend:** An efficient serverless backend for manga website, offering user authentication, data storage, and reading list functionalities.

- **Proxy Server:** A custom proxy server for manga websites using mangaDex API, serving images and resources efficiently using Netlify serverless functions.

## Learning Along the Way

### Challenges Faced

- **Direct API Access**: The MangaDex API has strict anti-abuse policies, including not sending CORS responses for external websites and serving incorrect responses for hotlinked images.

- **Proxying API Requests**: Direct access to the MangaDex API was not possible due to anti-abuse policies, necessitating the development of a custom proxy server.

- **Cold Start Time**: Initially, setting up the proxy server on Render resulted in significant delays due to cold start times.

- **Image Processing Performance**: Processing large images caused serverless functions on Netlify to exceed their execution time limit.

### Solutions Implemented

- **Custom Proxy Server**: Built a custom proxy with Netlify's serverless function to handle user requests and image fetching from the MangaDex API while adhering to the platform's anti-abuse policies.

- **Netlify Serverless Functions**: Leveraged Netlify's serverless functions for efficient and scalable solutions.

- **Stream Processing**: Implemented stream processing to optimize image processing within the serverless function's execution time limit.

- **Caching**: Implemented caching mechanisms using `memory-cache` to improve performance and reduce response times.

## Repository Structure

- **[YUKI MANGA](https://github.com/danielasakpa/Manga_Website):** The main repository for the YUKI MANGA project.
- **[Netlify-Serverless-Manga-Server repository](https://github.com/danielasakpa/Netlify-Serverless-Manga-Server):** Repository for the user authentication and data management server.
- **[Netlify-Serverless-Manga-Proxy repository](https://github.com/danielasakpa/Netlify-Serverless-Manga-Proxy):** Repository for the custom proxy server handling requests to the MangaDex API.

## Getting Started

1. **Clone the repositories:**

   ```bash
   git clone https://github.com/danielasakpa/Manga_Website.git
   git clone https://github.com/danielasakpa/Netlify-Serverless-Manga-Server
   git clone https://github.com/danielasakpa/Netlify-Serverless-Manga-Proxy
   ```

2. **Set up environment variables:**

   Create a `.env` file in the root directory of the project and set the following variables:
   * `REACT_APP_MANGA_SERVER_URL=http://localhost:9999`
   * `REACT_APP_PROXY_SERVER_URL=http://localhost:8888`

   These variables specify the **Manga Server** and **Proxy Server** URLs for development.

3. **Run the applications:**

   * **Manga Server** (Backend server for authentication and data management):
     ```bash
     cd Netlify-Serverless-Manga-Server
     npm install
     netlify dev
     ```
     This will run the server locally, listening on `http://localhost:9999`.

   * **Proxy Server** (Server to handle requests to the MangaDex API and serve manga images):
     ```bash
     cd Netlify-Serverless-Manga-Proxy
     npm install
     netlify dev
     ```
     This will run the proxy server locally, listening on `http://localhost:8888`.

   * **YUKI MANGA** (React Frontend):
     ```bash
     cd Manga_Website
     npm install
     npm start
     ```

4. **Explore and Contribute:**

   Feel free to explore the app and contribute to its development. If you encounter any issues or have suggestions, please open an issue.

## Explore API Documentation
Explore the MangaDex API documentation for more details on integrating and working with the MangaDex API.

## Explore Proxy Server
Explore the [Netlify-Serverless-Manga-Proxy repository](https://github.com/danielasakpa/Netlify-Serverless-Manga-Proxy) to understand the custom proxy server's inner workings and contribute to its development.

## Explore Manga Server
Explore the [Netlify-Serverless-Manga-Server repository](https://github.com/danielasakpa/Netlify-Serverless-Manga-Server) for insights into the user authentication and data management server and contribute to its enhancement.

## Contributing
If you'd like to contribute to **YUKI MANGA**, please follow these guidelines:

1. Fork the repository and create a new branch.
2. Make your changes and test thoroughly.
3. Ensure your code follows the project's coding standards.
4. Create a pull request with a clear description of your changes.
5. Participate in discussions and address feedback.

## License
This project is licensed under the MIT License.
