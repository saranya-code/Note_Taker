const  titleEl = $('.note-title ');
const  textEl = $('.note-textarea');
const  listEl = $('.list-group');
const  saveButtonEl = $('.save-note')
const newNoteEl = $('.new-note')

titleEl.val() ==="" ? saveButtonEl.hide(): saveButtonEl.show();

// saveButtonEl.hide();

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

const saveNewNote = note =>{
  return $.ajax({
    url: '/api/notes',
    data: note,
    method:'POST',
  })
}

// Get notes from Database and display in list
const renderList = () => {
  listEl.html('')
  getNotes().then(notes => {
    $.each(notes,function(index, note){
      createListEl(note)
    })
  })
}

const createListEl = note => {
  const noteList = $(`<li class="list-group-item d-flex justify-content-between align-items-center"><div class="note"> ${note.title} </div><i class="delete fas fa-trash-alt text-left"></i></li>`)
  noteList.on("click", function () {
    textEl.val(note.text);
    titleEl.val(note.title)
  });
  noteList.children('.delete').on("click", function () {              // Delete from the list
    event.stopPropagation();
    deleteNote(note.id).then(data => renderList())
    titleEl.val("")
    textEl.val("")
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
  saveNewNote(data)
  renderList()
  saveButtonEl.hide();
  titleEl.val("")
  textEl.val("")
})

// writing newnote
newNoteEl.on("click",function(){
  titleEl.val("")
  textEl.val("")
  
  
})

//Save button hide and show
textEl.on("input", function(){
  textEl.val() !== '' ? saveButtonEl.show() : saveButtonEl.hide()
});

renderList()
