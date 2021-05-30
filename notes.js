const fs = require('fs')
const chalk = require('chalk')


const getNotes = () => 'Your notes...'



const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}



const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}



const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({ title, body })
        saveNotes(notes);
        console.log(chalk.green('Note added!'))
    } else {
        console.log(chalk.red('Note title taken'))
    }
}



const removeNote = (title) => {
    const notes = loadNotes();
    const newNotes = notes.filter((note) => note.title !== title)

    if (notes.length !== newNotes.length) {
        saveNotes(newNotes);
        console.log(chalk.green('Note removed!'))
    } else {
        console.log(chalk.red('Note not found'))
    }
    
}



const listNotes = () => {
    const notes = loadNotes();
    let count = 1;

    console.log(chalk.magenta.underline.bold('Your notes:'))

    notes.forEach((note) => {
        console.log(`${count}. ${note.title}`)
        count++;
    })
}



const readNote = (title) => {
    const notes = loadNotes();
    const noteToRead = notes.find((note) => note.title === title)

    if (noteToRead) {
        console.log(`${chalk.bold(noteToRead.title)}: ${noteToRead.body}`)
    } else {
        console.log(chalk.red('Note not found'))
    }
}



module.exports = { getNotes, addNote, removeNote, listNotes, readNote }