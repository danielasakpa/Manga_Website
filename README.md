# YUKI MANGA

Welcome to **YUKI MANGA**, a comprehensive manga exploration platform developed with React, Tailwind CSS, MangaDex API, Node.js, Express.js, and MongoDB. This project was an exciting journey that involved overcoming challenges, implementing innovative solutions, and leveraging cutting-edge technologies.

## Screenshots
<br/>

<p align="center">
  <img src="https://i.ibb.co/7Y2K6jw/Firefox-Screenshot-2024-01-11-T09-58-20-097-Z.png" alt="Alt Text">
</p>

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
- [Explore Manga Server](#explore-auth-server)
- [Contributing](#contributing)
- [License](#license)

## Overview

**YUKI MANGA** is your ultimate destination for immersive manga exploration! Discover, read, and manage your favorite manga seamlessly with this cutting-edge Manga App. Developed with a tech stack that includes React for the frontend, Tailwind CSS for styling, and Node.js and Express.js for the backend, this project is designed to offer a visually captivating and feature-rich experience for manga enthusiasts.

## Tech Stack

- **React:** A JavaScript library for building user interfaces. The entire frontend of **YUKI MANGA** is built with React, enabling a dynamic and responsive user interface.

- **Tailwind CSS:** A utility-first CSS framework used for styling. Tailwind CSS allowed for quick and consistent styling across the application.

- **MangaDex API:** The backbone of the manga content. The application leverages the MangaDex API to fetch and display manga information.

- **Node.js and Express.js:** The backend is powered by Node.js, with Express.js providing a robust and flexible web application framework.

- **MongoDB:** A NoSQL database used for storing user data and reading lists. MongoDB's flexibility and scalability make it an ideal choice for this project.

## What You Can Do

- **Discover Manga:** Explore a vast collection of manga from various genres.

- **Read Manga:** Immerse yourself in an unparalleled reading experience with a user-friendly reader.

- **Manage Reading List:** Create and organize your reading list. Keep track of manga you're currently reading and those on your wishlist.

- **Secure Account:** User authentication ensures the security of your account and reading preferences.

## Project Structure

The project is organized into different modules, each serving a specific purpose:

- **Frontend:** The user interface built with React and styled with Tailwind CSS.

- **Backend:** Node.js and Express.js server handling user authentication, user data management, and reading list operations.

- **Proxy Server:** A custom Node.js proxy server that I built to handle requests to the MangaDex API. This server helps manage API calls and ensures a smooth experience for users.

## Learning Along the Way

### Challenges Faced

1. **API Request Handling:** Managing requests to the MangaDex API efficiently was a challenge. I addressed this by creating a custom proxy server to handle API requests, reducing latency and improving performance.

2. **User Authentication:** Implementing a secure user authentication system required careful consideration. The separate server dedicated to user authentication and data management helped centralize these processes.

### Solutions Implemented

1. **Proxy Server:** The custom proxy server acts as a middleware between the frontend and the MangaDex API, enhancing the overall performance and reliability of the application.

2. **Separate Manga Server:** Isolating user authentication and data management into a separate server improved the project's maintainability and security.

## Repository Structure

- **[YUKI MANGA](https://github.com/danielasakpa/Manga_Website):** The main repository for the YUKI MANGA project.
- **[Manga Server](https://github.com/danielasakpa/manga-server):** Repository for the user authentication and data management server.
- **[Proxy Server](https://github.com/danielasakpa/proxy-server):** Repository for the custom proxy server handling requests to the MangaDex API.

## Getting Started

1. **Clone the repositories:**

    ```bash
    git clone https://github.com/danielasakpa/Manga_Website.git
    git clone https://github.com/danielasakpa/manga-server.git
    git clone https://github.com/danielasakpa/proxy-server.git
    ```

2. **Install dependencies:**

    Navigate to each repository and run:

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the Manga Server repository with the necessary environment variables:

    ```env
    # Example .env content for manga-server
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-secret-key>
    ```

4. **Run the applications:**

    - **Manga Server:**

        ```bash
        cd manga-server
        npm start
        ```

        The server runs on port 5000 if the `PORT` environment variable is not provided.

    - **Proxy Server:**

        ```bash
        cd proxy-server
        npm start
        ```

        The server runs on port 4000 if the `PORT` environment variable is not provided.

    - **YUKI MANGA (React Frontend):**

        ```bash
        cd Manga_Website
        npm start
        ```

        The React frontend runs on port 3000.

5. **Explore and Contribute:**

    Feel free to explore the app and contribute to its development. If you encounter any issues or have suggestions, please open an [issue](https://github.com/danielasakpa/Manga_Website/issues).

## Explore API Documentation

Explore the [MangaDex API documentation](https://api.mangadex.org/docs/) for more details on integrating and working with the MangaDex API.

## Explore Proxy Server

Explore the [Proxy Server repository](https://github.com/danielasakpa/proxy-server) to understand the custom proxy server's inner workings and contribute to its development.

## Explore Manga Server

Explore the [Manga Server repository](https://github.com/danielasakpa/manga-server) for insights into the user authentication and data management server and contribute to its enhancement.

## Contributing

If you'd like to contribute to **YUKI MANGA**, please follow these guidelines:

1. Fork the repository and create a new branch.
2. Make your changes and test thoroughly.
3. Ensure your code follows the project's coding standards.
4. Create a pull request with a clear description of your changes.
5. Participate in discussions and address feedback.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
