//references 

const notesContainer=document.querySelector("#app");
const addNoteButton=document.querySelector(".addnote");

// declaring all functions  

/* function getNotes will retrieve 
all the existing notes from our local storage in the clients browser*/

const getNotes=()=>{
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
};


/* this function will take in an array of notes and save them 
in the local storage in the clients browser*/


const saveNotes=(notes)=>{
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
};



/*this function will allow us to build and add 
a new element to represent a note*/


const newNote=(id, content)=>{
const element =document.createElement("textarea");


element.classList.add("note");
element.value = content;
element.placeholder = "Empty Sticky Note";

element.addEventListener("change", ()=>{
    updateNote(id, content);
});

element.addEventListener("dblclick",()=>{
const doDelete = confirm("Are you sure you want to delete this note?");
if(doDelete){
    deleteNote(id,element);
}
});

return element;


};


/* this function will add a new note not only 
to the HTML but also it will save it to the local
storage*/

const addNote=()=>{
    /*first step is to get a reference to all 
    the existing notes within local storage*/

    const notes = getNotes();
    const noteObject = {
        id:Math.floor(Math.random() * 100000),
        content:""
    };
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
};


/* a function to update the notes */

const updateNote=(id, newContent)=>{
console.log("Updating Note...");
console.log(id, newContent);
};

/* a function to delete notes*/

const deleteNote=(id, element)=>{
console.log("Deleting Note...");
console.log(id, element);

};




// This displays the notes when they page is loaded
getNotes().forEach((note) => {
    const noteElement = newNote(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

//add a tect content when the add note button is clicked
addNoteButton.addEventListener("click", ()=>{
 addNote()});
