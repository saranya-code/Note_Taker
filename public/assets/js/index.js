const  titleEl = $('.note-title ');
const  textEl = $('.note-textarea');
const  listEl = $('.list-group');
const  saveButtonEl = $('. save-note')

const addNewNote = () =>{

}

//API call for  GET, DELETE, POST
const getNotes = () => {
  return $.ajax({
    url: '/api/notes',
    method: 'GET'
  })
}

const deleteNote = id => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

const newNotes = note =>{
  return $.ajax({
    url: '/api/notes',
    data: note,
    method:'POST',
  })
}

// Get notes from Database and display in list
getNotes().then(notes => {
  $.each(notes,function(index, note){
    createListEl(note)
  })
})

const createListEl = note => {
  const noteList = $(`<li class="list-group-item d-flex justify-content-between align-items-center"><div class="note"> ${note.title} </div><i class="delete fas fa-trash-alt text-left"></i></li>`)
  noteList.on("click", function () {
    textEl.val(note.text);
    titleEl.val(note.title)
  });
  noteList.children('.delete').on("click", function () {              // Delete from the list
    event.stopPropagation();
    deleteNote(note.id).then(data => console.log(data))
  })
  listEl.append(noteList); 
}


//Creating a new note by generating random Id
$('.save-note').on("click", function () {
  const data = {
    'title': titleEl.val(),
    'text': textEl.val(),
    'id': Math.floor(Math.random()*999)
  }
  newNotes(data)
})

//New note-->Title and text will be empty  
const  emptyNote =()  =>{
  saveButtonEl.hide();
  if(addNewNote.id){

    titleEl.val(addNewNote.title)
    textEl.val(addNewNote.text)
  } else{
    titleEl.val("")
    textEl.val("")
  }
}