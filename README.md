# Note-Taker 
This is the application that can write, save, and delete notes. This application will use an express backend and save and retrieve note data from a JSON file. When we click on the stored data listed on the left side it will show the details in the right side . When we click the delete icon it will delete the data and when we add the data and save, it will save in the database db.json file.

##Getting Started

### Prerequisites

1. *HTML*
2. *CSS*
3. *Bootstrap*
4. *Javascript*
5. *jQuery*
6. *Nodejs*
7. *Express*

## Project Detail

* The following HTML routes have been made in this project:

  * GET `/notes` - return the `notes.html` file.

  * GET `*` - return the `index.html` file

* The application have a `db.json` file on the backend that will be used to store and retrieve notes using the `fs` module.

* The following API routes have been created:

  * GET `/api/notes` - read the `db.json` file and return all saved notes as JSON.

  * POST `/api/notes` - recieve a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.

  * DELETE `/api/notes/:id` - recieve a query paramter containing the id of a note to delete.
  
  By default "/" route is opened which is a starting point of my application.

My Portfolio Website Link ->  (https://notesrecord.herokuapp.com/)

![NoteTaker Demo](notetakerdemo.gif)









