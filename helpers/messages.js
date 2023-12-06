require('colors');

const show_menu = () => {
    
    return new Promise((resolve, reject) => {
        console.clear()
        console.log('==========================='.green);
        console.log('     Choose an option'.green);
        console.log( '=========================== \n'.green);

        console.log(`${'1.-'.green} Create new task`);
        console.log(`${'2.-'.green} List task`);
        console.log(`${'3.-'.green} List completed task`);
        console.log(`${'4.-'.green} List pending task`);
        console.log(`${'5.-'.green} Complete task(s)`);
        console.log(`${'6.-'.green} Delete task`);
        console.log(`${'0.-'.green} Exit \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Choose an option: ', (opt) => {
            readline.close();
            resolve(opt)
        });
    })
}

const pause = () => {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPress ${'ENTER'.green} to continue\n`, (opt) => {
            readline.close();
            resolve(opt)
        });
    })
}

module.exports = {
    show_menu,
    pause
}