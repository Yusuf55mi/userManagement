package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rs/cors"
)

// User data structure
type User struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Surname string `json:"surname"`
	Email   string `json:"email"`
}

var db *sql.DB

// initialize the database and create "users" table if not exists
func init() {
	var err error
	db, err = sql.Open("sqlite3", "users.db")
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			surname TEXT NOT NULL,
			email TEXT NOT NULL
		);
	`)
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	router := mux.NewRouter()

	// Define routes and their corresponding handler functions
	router.HandleFunc("/api/users", getUsers).Methods("GET")
	router.HandleFunc("/api/users/{id}", getUserByID).Methods("GET")
	router.HandleFunc("/api/users", createUser).Methods("POST")
	router.HandleFunc("/api/users/{id}", updateUser).Methods("PUT")
	router.HandleFunc("/api/users/{id}", deleteUser).Methods("DELETE")

	// Enable CORS for all routes
	c := cors.AllowAll()
	handler := c.Handler(router)

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server is running on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

// getUsers handles the GET request for retrieving all users
func getUsers(w http.ResponseWriter, r *http.Request) {
	users := fetchUsers()
	sendJSONResponse(w, users)
}

// getUserByID handles the GET request for retrieving a user by ID
func getUserByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	user := fetchUserByID(id)
	sendJSONResponse(w, user)
}

// createUser handles the POST request for creating a new user
func createUser(w http.ResponseWriter, r *http.Request) {
	var user User
	decodeJSONRequest(r, &user)

	id := insertUser(user)
	sendJSONResponse(w, map[string]int{"id": id})
}

// updateUser handles the PUT request for updating a user by ID
func updateUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	var user User
	decodeJSONRequest(r, &user)

	updateUserByID(id, user)
	sendJSONResponse(w, map[string]string{"message": "User updated successfully"})
}

// deleteUser handles the DELETE request for deleting a user by ID
func deleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	deleteUserByID(id)
	sendJSONResponse(w, map[string]string{"message": "User deleted successfully"})
}

// fetchUsers retrieves all users from the database
func fetchUsers() []User {
	rows, err := db.Query("SELECT id, name, surname, email FROM users")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var users []User
	for rows.Next() {
		var user User
		err := rows.Scan(&user.ID, &user.Name, &user.Surname, &user.Email)
		if err != nil {
			log.Fatal(err)
		}
		users = append(users, user)
	}

	return users
}

// fetchUserByID retrieves a user from the database by ID
func fetchUserByID(id string) User {
	var user User
	err := db.QueryRow("SELECT id, name, surname, email FROM users WHERE id = ?", id).Scan(&user.ID, &user.Name, &user.Surname, &user.Email)
	if err != nil {
		log.Fatal(err)
	}
	return user
}

// insertUser inserts a new user into the database
func insertUser(user User) int {
	result, err := db.Exec("INSERT INTO users (name, surname, email) VALUES (?, ?, ?)", user.Name, user.Surname, user.Email)
	if err != nil {
		log.Fatal(err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		log.Fatal(err)
	}

	return int(id)
}

// updateUserByID updates a user in the database by ID
func updateUserByID(id string, user User) {
	_, err := db.Exec("UPDATE users SET name=?, surname=?, email=? WHERE id=?", user.Name, user.Surname, user.Email, id)
	if err != nil {
		log.Fatal(err)
	}
}

// deleteUserByID deletes a user from the database by ID
func deleteUserByID(id string) {
	_, err := db.Exec("DELETE FROM users WHERE id=?", id)
	if err != nil {
		log.Fatal(err)
	}
}

// Helper functions...

// sendJSONResponse sends a JSON response to the client
func sendJSONResponse(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

// decodeJSONRequest decodes the JSON request body into a given structure
func decodeJSONRequest(r *http.Request, v interface{}) {
	err := json.NewDecoder(r.Body).Decode(v)
	if err != nil {
		log.Fatal(err)
	}
}
