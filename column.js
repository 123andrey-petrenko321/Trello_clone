const Column = {
    dropped: null,
    dragged: null,
    idCounter: 4,
    process(columnElement) {
        const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')
        spanAction_addNote.addEventListener('click', function (event) {
            const noteElement = Note.create()
            columnElement.querySelector('[data-notes]').append(noteElement)
            noteElement.setAttribute('contenteditable', 'true')
            noteElement.focus()
        })
        const headerElement = columnElement.querySelector('.column-header')
        headerElement.addEventListener('dblclick', function (event) {
            headerElement.setAttribute('contenteditable', 'true')

        })
        headerElement.addEventListener('blur', function (event) {
            headerElement.removeAttribute('contenteditable', 'true')
        })

        columnElement.addEventListener('dragstart', Column.dragstart)
        columnElement.addEventListener('dragend', Column.dragend)

        // columnElement.addEventListener('dragenter', Column.dragenter)
        columnElement.addEventListener('dragover', Column.dragover)
        // columnElement.addEventListener('dragleave', Column.dragleave)
        columnElement.addEventListener('drop', Column.drop)
    },
    dragstart(event) {
        Column.dragged = this
        Column.dragged.classList.add('dragged')
        event.stopPropagation();

        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.removeAttribute('draggable'))
    },
    dragend(event) {
        Column.dragged.classList.remove('dragged')
        Column.dragged = null
        Column.dropped = null
        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.setAttribute('draggable', true))
    },
    // dragenter(event) {
    //     if (!Column.dragged || Column.dragged === this) {
    //         return
    //     }
    //     this.classList.add('under')
    // },
    dragover(event) {
        event.preventDefault();
        event.stopPropagation()

        if (Column.dragged === this) {
            if (Column.dropped) {
                Column.dropped.classList.remove('under')
            }
            Column.dropped = null
        }

        if (!Column.dragged || Column.dragged === this) {
            return
        }
        Column.dropped = this
        document
            .querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'))

        this.classList.add('under')
    },
    // dragleave(event) {
    //     if (!Column.dragged || Column.dragged === this) {
    //         return
    //     }
    //     this.classList.remove('under')
    // },
    drop(event) {
        if (Note.dragged) {
            return this.querySelector('[data-notes]').append(Note.dragged)
        } else if (Column.dragged) {
            const children = Array.from(document.querySelector('.columns').children)
            const indexA = children.indexOf(this)
            const indexB = children.indexOf(Column.dragged)

            if (indexA < indexB) {
                document.querySelector('.columns').insertBefore(Column.dragged, this)
            } else {
                document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSiblimg)
            }
            document
                .querySelectorAll('.column')
                .forEach(columnElement => columnElement.classList.remove('under'))
        }
    }
}