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
  document.getElementById("form").reset(); 
}

// function to display cards
function displayBooks(){ 
  cardHolder.innerHTML="";
  //loop through each item in the display
  myLibrary.forEach(function(book){
  let bookCard = document.createElement('div');
  bookCard.className = "bookCard";
  bookCard.innerHTML = `<span style="font-family: 'Domine', serif;font-size: 1.5em;">${book.name}</span><span><br>Author: ${book.author}<br>Pages: ${book.pages}<br>Read: ${book.whetherRead}</span>`;
  cardHolder.appendChild(bookCard);
 }); 
} // end displayBooks


let addBook = document.getElementById("addButton");
// add event listener
addBook.addEventListener("click", addBookToLibrary);


let myLibrary = [];
  


 


