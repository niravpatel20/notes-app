const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => note.title === title);
    
    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.black.bgGreenBright('Note added successfully!!'));
    }
    else{
        console.log(chalk.white.bgRed("Error : ") + "Note title taken!\nPlease add note with some another title.");
    }
};

const removeNote = function(title){
    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => note.title != title);

    if(notes.length > notesToKeep.length){
        console.log(chalk.black.bgGreenBright('Note removed successfully!!'));
    }
    else{
        console.log(chalk.white.bgRed('No note found!'));
    }

    saveNotes(notesToKeep);

};

const listNotes = () => {
    const notes = loadNotes();

    if(notes.length !== 0){
        console.log(chalk.bgMagenta('Your Notes...'));
        notes.forEach((note) => console.log(note.title));
    }
    else{
        console.log(chalk.bgRed('No note found!'));
    }
}

const readNote = (title) =>{
    const notes = loadNotes();

    const note = notes.find((note) => note.title === title);

    if(note){
        console.log(chalk.bgMagenta(note.title));
        console.log(note.body);
    }
    else{
        console.log(chalk.white.bgRed('No note found!'));
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
};

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        const data = JSON.parse(dataJSON);
        return data;
    }
    catch(e){
        return [];
    }    
};



module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};