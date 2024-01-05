# userManagement

Q4) Write a user management project which will include;
• A master view which will list all users in a data grid. This screen will assist
users with all CRUD operations. User will be able to press 3 buttons
(New,Edit,Delete). Edit and Delete operations will require row selection from the data grid.
• A detailed view which will show the fields as form. Form will have 2 buttons (Action,
Back). Text of the action button will change according to the
operation opened the detail view. For example if the “New” operation is selected from
the master, the detailed view action button text will be “Create”. Please see the
mappings below.
▪ New: Create
▪ Edit: Save
▪ Delete: Delete
• A REST service to support functions below. Please note that API paths and HTTP methods
and HTTP Statuses are important for us. Please follow REST API standards.
▪ Returns all users
▪ Return the user with the desired “id”
▪ Save the given user.
▪ Update data of the user with the desired “id”
▪ Delete the user with the desired “id”
• Backend must be written with Go. Please use sqlite for the database and include the file in
the project folder. Remember all operations must be persistent.
• Frontend must be written with TS using React & Nextjs.

# User Management

This project combines a Go backend with SQLite for storage and a TypeScript React frontend using Next.js. It offers a user-friendly interface with features like creating, editing, and deleting users. The backend follows RESTful API standards for fetching, creating, updating, and deleting users. To run the project, execute the Go backend and Next.js frontend, accessible at http://localhost:3000.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)

## Prerequisites

List any prerequisites or dependencies required to run the project. For example:

- Go (go1.21.5)
- SQLite

## Getting Started

    ```bash
    cd userManagement

    go run main.go
    ```
    backend will run on http://localhost:8080

    open new terminal

    ```bash
    cd frontend

    npx run dev
    ```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-project.git
   cd userManagement
   ```

2. Install dependencies:

   ```bash
   go get -u ./...
   ```

3. Run the project:

   ```bash
    cd userManagement

    go run main.go
   ```

   open new terminal

   ```bash
   cd frontend

   npx run dev
   ```

### API Endpoints

    GET /api/users: Get all users.
    GET /api/users/{id}: Get user by ID.
    POST /api/users: Create a new user.
    PUT /api/users/{id}: Update user by ID.
    DELETE /api/users/{id}: Delete user by ID.
