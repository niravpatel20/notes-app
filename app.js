const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

//setting the version
yargs.version('1.1.0');

//Adding an 'add' command
yargs.command({
    command: 'add',
    describe: 'Add a Note!',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body);
    }
});

//Adding a 'remove' command
yargs.command({
    command: 'remove',
    describe: 'Remove a Note!',
    builder:{
        title:{
            describe: 'Note title to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
});

//Adding a 'list' command
yargs.command({
    command: 'list',
    describe: 'List notes',
    handler(){
        notes.listNotes();
    }
});

//Adding a 'read' command
yargs.command({
    command: 'read',
    describe: 'Read a Note by title',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: String
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
});

yargs.parse();
//console.log(yargs.argv);



