let dbRefObject;
  //Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBIHHbAuRXycPcap1tkQNVTTnlfi2jQ1aw",
    authDomain: "toplibrary-d0d0b.firebaseapp.com",
    databaseURL: "https://toplibrary-d0d0b.firebaseio.com",
    projectId: "toplibrary-d0d0b",
    storageBucket: "toplibrary-d0d0b.appspot.com",
    messagingSenderId: "880572782365",
    appId: "1:880572782365:web:65e6fe54f4b172430a73f4",
    measurementId: "G-TTV79HFR01"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//Get elements - use the below line to display the contents of the databse on the page as a string - for testing purposes
//const preObject = document.getElementById("objectContainer");

// Create references
  dbRefObject = firebase.database().ref().child('books');
   
// book contructor based on input from form
function Book(name, author, pages, whetherRead) {
  // get name
  this.name = name;
  // get author
  this.author = author;
  // get pages
  this.pages = pages;
  // get whether read or not
  this.whetherRead = whetherRead;
}

// book protoype containing read toggle function
Book.prototype.whetherReadToggle = function(){
    if(this.whetherRead === "yes") {
      this.whetherRead = "no";
    } else if (this.whetherRead=== "no"){
      this.whetherRead = "yes";
    }
    displayBooks();
}

//Synch object changes
dbRefObject.on('value', snap => {
// below lines places the contents of the databse on the page as a string (live)  
//preObject.innerText = JSON.stringify(snap.val(), null, 3);

snap.forEach(function(childNodes){

// function to display cards
function displayBooks(){
  bookCounter = 0; 
  cardHolder.innerHTML="";

  //loop through each item in the display
  snap.forEach(function(childNodes){

  //create bookcard for each object in library array
  let bookCard = document.createElement('div');
  bookCard.className = "bookCard";
  bookCard.id = bookCounter + "book" + childNodes.key;
  //put the given firebase record into the dynamically generated book "card"
  bookCard.innerHTML = `<span style="font-family: 'Domine', serif;font-size: 1.5em;">${childNodes.val().name}</span><span><br>Author: ${childNodes.val().author}<br>Pages: ${childNodes.val().pages}<br>Read: ${childNodes.val().read}</span>`;

  // create delete button for each card
  let bookCardButton = document.createElement("button");
  bookCardButton.id="delete"+childNodes.key;  /// Jonathan's input ***************
  bookCardButton.className = "bookCardButton";
  bookCardButton.innerText = "Delete";
  bookCard.appendChild(bookCardButton);
  cardHolder.appendChild(bookCard);

  //create a read /not read toggle button for each card
  let toggleReadButton = document.createElement("button");
  toggleReadButton.id="readBut" + childNodes.key;
  toggleReadButton.className = "toggleReadButton";
  toggleReadButton.innerHTML = `Read Toggle`;
  bookCard.appendChild(toggleReadButton);
  bookCounter++;
 });
  deleteBook();
  toggleReadData();
} // end displayBooks

//function to delete cards
function deleteBook(){
  let deleteButtonList = document.getElementsByClassName("bookCardButton");
  for (let deleteButton of deleteButtonList){
    deleteButton.addEventListener('click', function(e){
    let slicer = e.target.id;
    let sliced = slicer.slice(6);
    // get a reference to a given key (i.e. record) in the database
    let ref = firebase.database().ref(dbRefObject.key + "/" + sliced); 
    ref.on('value', function (snapshot){
      snapshot.ref.remove();
      location.reload();
      return false;
    });
    displayBooks();
    });
   }
  } 

displayBooks();
});// end for each (iterate over childnodes)
}); // end databse synch changes

// function to take inout from form and put them into variables
function addBookToLibrary() {
  // get all the values from the form
  let nameFromForm = document.getElementById("name").value;
  let authorFromForm = document.getElementById("author").value;
  let pageNumberFromForm = document.getElementById("pages").value;
  let radios = document.getElementsByName('read');
  let whetherReadFromForm="";
  for (let i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      whetherReadFromForm = radios[i].value;
      break;
    }
  }

// create function to write new Book object to FireBase
function writeUserData(nameFromForm, authorFromForm, pageNumberFromForm, whetherReadFromForm) {
  firebase.database().ref().child('books').push().set({
    name: nameFromForm,
    author: authorFromForm,
    pages: pageNumberFromForm,
    read: whetherReadFromForm
  });
}

// Send new book to Firebase
writeUserData(nameFromForm, authorFromForm, pageNumberFromForm, whetherReadFromForm);
 
// run a clear form function
document.getElementById("form").reset(); 
closeForm();
} // end add book to library

function toggleReadData (){
  let readToggleButtonList = document.getElementsByClassName("toggleReadButton");
  for (let togglebutton of readToggleButtonList) {
    togglebutton.addEventListener('click', function(e){
    let toggleTargettoSlice = e.target.id;
    let toggleTargetSliced = toggleTargettoSlice.slice(7);
    // reference Firebase to grab the individual record
    let refRead = firebase.database().ref(dbRefObject.key + "/" + toggleTargetSliced); 
    refRead.once('value', snap =>{
     if (snap.val().read ==="yes") {
       refRead.update({
         read: "no"
       })
     } else if (snap.val().read ==="no") {
       refRead.update({
         read: "yes"
       })
     }
    });    
    }); // end event listener
  }  // end for
} // end toggleReadData

function openForm(){
  document.getElementById("sidebar").style.visibility = "visible";
  document.getElementById("openMenu").style.display = "none";
}
function closeForm(){
  document.getElementById("sidebar").style.visibility = "hidden";
  document.getElementById("openMenu").style.display = "block";
}

let addBook = document.getElementById("addButton");
// add event listener
addBook.addEventListener("click", addBookToLibrary);

let openMenu = document.getElementById("openMenu");
openMenu.addEventListener("click", openForm);
closeForm();














