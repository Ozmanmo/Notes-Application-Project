//references
const notesContainer = document.querySelector("#app");
const addNoteButton = document.querySelector(".addnote");

// declaring all functions
// local storage functions
// 1.save a note 
// 2. get an existing note 

//save note 
//JSON.stringify converts the objects into a string 
const saveNotes=(notes)=>{
localStorage.setItem("sticky-note", JSON.stringify(notes));
};

//get note 
//JSON.parse converts the string into an object 
const getNotes=()=>{
return JSON.parse(localStorage.getItem("sticky-note") || "[]");
};

// a function to create the the textarea element and add styling 
const createNoteElement=(id, content)=>{
  const element= document.createElement("textarea");
  // class
  element.classList.add("note");
  element.value= content || "";
  element.placeholder="Enter New Note";
  element.id=id
  notesContainer.appendChild(element);


  updateNote(id,element.value);


  element.addEventListener("dblclick", ()=>{
    const doDelete = confirm("Are you sure you want to delete your note");
  
    if (doDelete){
      deleteNote(id, element)
    }
  });
  element.addEventListener("change", () =>{
      updateNote(element.id, element.value) 
  });


  return element;
  // 
};
// a function to add the element to the DOM once the button is clicked 
addNoteButton.addEventListener("click", ()=> addNote())

// a function that references all existing notes 
const addNote = ()=>{
  const notes= getNotes();
  const noteObject = {
    id:Math.floor(Math.random()*100000),
    content:""
  }
  notes.push(noteObject);
  saveNotes(notes);
  const noteElement = createNoteElement(noteObject.id, noteObject.content)
}

const updateNote = (id,newText)=>{
  const notes = getNotes();
  
  const targetNote = notes.filter(note => note.id==id)[0];
  targetNote.content=newText;
  saveNotes(notes);
}


const deleteNote = (id, element) => {
  const notes = getNotes().filter((note)=> note.id!==id );

  saveNotes(notes);
  notesContainer.removeChild(element);
}

//const notes = getNotes();
//notes.forEach(note => createNoteElement(note.id, note.content));



const notes = getNotes();
notes.forEach(note => createNoteElement(note.id, note.content));










