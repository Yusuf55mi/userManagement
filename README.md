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
