// main.go
package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/rs/cors"

	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

type User struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Surname string `json:"surname"`
	Email   string `json:"email"`
}

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
	router.HandleFunc("/api/users", getUsers).Methods("GET")
	router.HandleFunc("/api/users/{id}", getUserByID).Methods("GET")
	router.HandleFunc("/api/users", createUser).Methods("POST")
	router.HandleFunc("/api/users/{id}", updateUser).Methods("PUT")
	router.HandleFunc("/api/users/{id}", deleteUser).Methods("DELETE")

	// Enable CORS
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

// REST API handlers...

func getUsers(w http.ResponseWriter, r *http.Request) {
	users := fetchUsers()
	sendJSONResponse(w, users)
}

func getUserByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	user := fetchUserByID(id)
	sendJSONResponse(w, user)
}

func createUser(w http.ResponseWriter, r *http.Request) {
	var user User
	decodeJSONRequest(r, &user)

	id := insertUser(user)
	sendJSONResponse(w, map[string]int{"id": id})
}

func updateUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	var user User
	decodeJSONRequest(r, &user)

	updateUserByID(id, user)
	sendJSONResponse(w, map[string]string{"message": "User updated successfully"})
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	deleteUserByID(id)
	sendJSONResponse(w, map[string]string{"message": "User deleted successfully"})
}

// Database operations...

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

func fetchUserByID(id string) User {
	var user User
	err := db.QueryRow("SELECT id, name, surname, email FROM users WHERE id = ?", id).Scan(&user.ID, &user.Name, &user.Surname, &user.Email)
	if err != nil {
		log.Fatal(err)
	}
	return user
}

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

func updateUserByID(id string, user User) {
	_, err := db.Exec("UPDATE users SET name=?, surname=?, email=? WHERE id=?", user.Name, user.Surname, user.Email, id)
	if err != nil {
		log.Fatal(err)
	}
}

func deleteUserByID(id string) {
	_, err := db.Exec("DELETE FROM users WHERE id=?", id)
	if err != nil {
		log.Fatal(err)
	}
}

// Helper functions...

func sendJSONResponse(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func decodeJSONRequest(r *http.Request, v interface{}) {
	err := json.NewDecoder(r.Body).Decode(v)
	if err != nil {
		log.Fatal(err)
	}
}
