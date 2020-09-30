const url = 'http://localhost:3000/notes'
const noteInput = document.querySelector('#note-input').value

document.addEventListener('submit', function (event) {
  event.preventDefault()
  createNote()
  renderNoteItem()
  deleteNote()
renderNoteList()
  
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


function renderNoteItem (note) {
  const noteList = document.querySelector('#note-list')
  const noteItemEl = document.createElement('li')
  noteItemEl.dataset.id = note.id
  noteItemEl.id = `item-${note.id}`
  noteItemEl.innerText = note.noteItem
  const deleteIcon = document.createElement('span')
  deleteIcon.classList.add('fas', 'fa-times', 'mar-l-xs', 'delete')
  noteItemEl.appendChild(deleteIcon)
  noteList.appendChild(noteItemEl)
}

function createNote () {
  const noteInput = document.querySelector('#note-input').value
  console.log(noteInput)

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      noteItem: noteInput,
      created_at: moment().format()
    })
  })
    .then(res => res.json())
    .then(data => {
      const noteList = document.querySelector('#note-list')
      const noteItemEl = document.createElement('li')
      noteItemEl.innerText = data.noteItem
      noteList.appendChild(noteItemEl)
    })
}



function deleteNote (noteId) {
  fetch(url + '/' + noteId, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      const itemToRemove = document.querySelector(`li[data-id='${noteId}']`)
      itemToRemove.remove()
    })
}