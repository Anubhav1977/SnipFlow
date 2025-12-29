# SnipFlow

SnipFlow is a full-stack web application designed for developers to create, manage, and share code snippets effortlessly. It features a modern, intuitive interface for writing and organizing code, coupled with a robust backend to store and retrieve data efficiently.

## Features

- **Full CRUD for Snippets**: Create, read, update, and delete your code or text snippets.
- **Centralized Snippet Library**: Browse all your saved snippets in a clean, easy-to-navigate list.
- **Powerful Search**: Quickly find snippets by title using the search functionality.
- **Integrated Code Editor**: Utilizes React CodeMirror for a smooth editing experience with syntax highlighting.
- **Visibility Control**: Mark snippets as "public" or "private" to manage access.
- **One-Click Copy & Share**: Easily copy snippet content or share a direct link to a snippet with others.
- **Modern Tech Stack**: Built with React, Redux Toolkit, and .NET 8 for a performant and scalable solution.
- **User-Friendly Feedback**: Employs toast notifications for a non-intrusive user experience.

## Tech Stack

- **Frontend**:
  - **Framework/Library**: React, Vite
  - **State Management**: Redux Toolkit
  - **Routing**: React Router
  - **Styling**: Tailwind CSS
  - **HTTP Client**: Axios
  - **Code Editor**: React CodeMirror

- **Backend**:
  - **Framework**: .NET 8, ASP.NET Core Web API
  - **ORM**: Entity Framework Core

- **Database**:
  - Microsoft SQL Server

## Project Structure

The repository is a monorepo containing two main projects:

-   **/client**: The frontend application built with React and Vite. It handles all user interface elements, client-side routing, and state management.
-   **/server**: The backend service built with .NET Core. It provides a RESTful API for all CRUD operations, connects to the database, and contains the core business logic.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- .NET 8 SDK
- Node.js (v18 or later) and npm
- An instance of Microsoft SQL Server (e.g., SQL Server Express)

### Backend Setup

1.  **Navigate to the server directory**:
    ```bash
    cd server
    ```

2.  **Configure the database connection**:
    Open `server/appsettings.json` and update the `DefaultConnection` string to point to your SQL Server instance.

    ```json
    "ConnectionStrings": {
      "DefaultConnection": "Server=YOUR_SERVER_INSTANCE;Database=SnipflowDB;Trusted_connection=true;TrustServerCertificate=true;"
    }
    ```

3.  **Apply database migrations**:
    Run the following command to create the necessary tables in your database.
    ```bash
    dotnet ef database update
    ```

4.  **Run the backend server**:
    ```bash
    dotnet run
    ```
    The API will be running on `https://localhost:7201`.

### Frontend Setup

1.  **Navigate to the client directory**:
    In a new terminal window, change to the client directory.
    ```bash
    cd client
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Access the application**:
    Open your browser and go to `http://localhost:5173`.

## API Endpoints

The API is structured around the `Snip` resource. All endpoints are prefixed with `/api/snips`.

| Method   | Endpoint          | Description                         |
|----------|-------------------|-------------------------------------|
| `GET`    | `/`               | Retrieves all snippets.             |
| `GET`    | `/{id}`           | Retrieves a single snippet by its ID. |
| `POST`   | `/`               | Creates a new snippet.              |
| `PUT`    | `/{id}`           | Updates an existing snippet.        |
| `DELETE` | `/{id}`           | Deletes a specific snippet.         |
