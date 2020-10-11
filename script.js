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

// Addds creates book from form input, adds to library
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
}
// new comment
let addBook = document.getElementById("addButton");
// add event listener
addBook.addEventListener("click", addBookToLibrary);

let firstPlaceHolder = new Book ("Lord of the Flies", "William Golding", "216 pages", "yes");
let myLibrary = [firstPlaceHolder];
  
// function to display cards
function displayBooks(){ 
  let cardHolder = document.createElement('div');
  cardHolder.id='cardHolder';
  cardHolder.className = 'cardHolder';
  document.body.appendChild(cardHolder);

  //loop through each item in the display
  myLibrary.forEach(function(book){
  let bookCard = document.createElement('div');
  bookCard.className = "bookCard";
  bookCard.innerHTML = `Title: ${book.name}<br>Author: ${book.author}<br>No. of Pages: ${book.pages}<br>Previously read: ${book.whetherRead}`;
  cardHolder.appendChild(bookCard);
 }); 
} // end displayBooks

 



