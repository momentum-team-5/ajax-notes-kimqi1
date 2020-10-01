const url = 'http://localhost:3000/notes'
const noteList = document.querySelector('#notelist')
document.addEventListener('submit', function (event) {
  event.preventDefault()
  createnote()
})

noteList.addEventListener('click', function (e) {
  if (e.target.matches('.delete-box')) {
    console.log(e.target.dataset.noteId)
    deletenote(e.target.dataset.noteId)
  }
})
function renderNoteList () {
  fetch(url)
    .then(res => res.json())
    .then(noteData => {
      for (const note of noteData) {
        rendernoteItem(note)
      }
    })
}
function rendernoteItem (note) {
  const noteList = document.querySelector('#notelist')
  // create a grid-container div 
  // set the innerHTML of that container using a template literal string
  // so that I can insert JS values easily
  const notelistBox = document.createElement("div")
  notelistBox.id = `note-${note.id}`
  notelistBox.classList.add("grid-container")
  notelistBox.innerHTML = ` 
    <div class="grid-item note-box">${note.noteItem}</div>
    <div class="grid-item delete-box" data-note-id=${note.id}>Delete</div>
  `
  noteList.appendChild(notelistBox)
}

function createnote () {
  const noteInputField = document.querySelector('#note-input')
  const requestData = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      noteItem: noteInputField.value,
      created_at: moment().format()
    })
  }
  fetch(url, requestData)
    .then(res => res.json())
    .then(data => {
      noteInputField.value = ''
      rendernoteItem(data)
    })
}
function deletenote (noteId) {
  fetch(url + '/' + noteId, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      const itemToRemove = document.querySelector(`#note-${noteId}`)
      itemToRemove.remove()
    })
}

renderNoteList()