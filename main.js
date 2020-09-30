const url = 'http://localhost:3000/notes'
const noteList = document.querySelector('#note-list')
document.addEventListener('submit', function (event) {
  event.preventDefault()
  createnote()
})

noteList.addEventListener('click', function (e) {
  if (e.target.matches('.delete')) {
    console.log(e.target.parentElement.dataset.id)
    deletenote(e.target.parentElement.dataset.id)
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
      const itemToRemove = document.querySelector(`li[data-id='${noteId}']`)
      itemToRemove.remove()
    })
}

renderNoteList()