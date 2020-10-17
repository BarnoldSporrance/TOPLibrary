
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
      console.log("whetherRead yes before:" + this.whetherRead);
      this.whetherRead = "no";
      console.log("whetherRead yes after:" + this.whetherRead);
    } else if (this.whetherRead=== "no"){
      console.log("whetherRead no before:" + this.whetherRead);
      this.whetherRead = "yes";
      console.log("whetherRead yes after:" + this.whetherRead);
    }
    displayBooks();
}

// Creates book from form input, adds to library
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
  // create a new object using the values form the form
  let bookHolder = new Book(nameFromForm, authorFromForm, pageNumberFromForm, whetherReadFromForm);
  myLibrary.push(bookHolder);
  // run the display function
  displayBooks();
  // run a clear form function
  document.getElementById("form").reset(); 
  closeForm();
} // end add book to library

function toggleReadData (){
  let readToggleButtonList = document.getElementsByClassName("toggleReadButton");
  for (let togglebutton of readToggleButtonList) {
    togglebutton.addEventListener('click', function(e){
    let toggleTargettoSlice = e.target.id;
   // alert("toggleTarget:"  +toggleTargettoSlice);
    let toggleTargetSliced = toggleTargettoSlice.slice(7);
   // alert("toggleTargetSliced:"  + toggleTargetSliced);
   myLibrary[toggleTargetSliced].whetherReadToggle();
    displayBooks();
    });
  }  // end for
} // end toggleReadData

//function to delete cards
function deleteBook(){
let deleteButtonList = document.getElementsByClassName("bookCardButton");
for (let deleteButton of deleteButtonList){
  deleteButton.addEventListener('click', function(e){
  let slicer = e.target.id;
  let sliced = slicer.slice(3);
  let slicedNum = parseInt(sliced); 
  myLibrary.splice(slicedNum,1);
  displayBooks();
  });
 }
}

// function to display cards
function displayBooks(){
  bookCounter = 0; 
  cardHolder.innerHTML="";
  //loop through each item in the display
  myLibrary.forEach(function(book){
  //create bookcard for each object in library array
  let bookCard = document.createElement('div');
  bookCard.className = "bookCard";
  bookCard.id = "book" + bookCounter;
  bookCard.innerHTML = `<span style="font-family: 'Domine', serif;font-size: 1.5em;">${book.name}</span><span><br>Author: ${book.author}<br>Pages: ${book.pages}<br>Read: ${book.whetherRead}</span>`;
  // create delete button for each card
  let bookCardButton = document.createElement("button");
  bookCardButton.id="but"+bookCounter;
  bookCardButton.className = "bookCardButton";
  bookCardButton.innerText = "Delete";
  bookCard.appendChild(bookCardButton);
  cardHolder.appendChild(bookCard);

  //create a read /not read toggle button for each card
  let toggleReadButton = document.createElement("button");
  toggleReadButton.id="readBut" + bookCounter;
  toggleReadButton.className = "toggleReadButton";
  toggleReadButton.innerHTML = `Read Toggle`;
  bookCard.appendChild(toggleReadButton);
  bookCounter++;
 });
  deleteBook();
  toggleReadData();
} // end displayBooks

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

let myLibrary = [];
closeForm();
displayBooks();













