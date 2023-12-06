const { inquirer_menu, pause, read_input, list_to_delete, confirm, mark_as_complete } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/save_file');
const Tasks = require('./models/tasks');

require('colors');

const main = async () => {
    let opt = '';
    const tasks = new Tasks();

    const tasksDB = readDB();

    if (tasksDB) {
        tasks.load(tasksDB)
    }

    do {
        //Print menu options
        opt = await inquirer_menu();

        switch (opt) {
            case '1':
                const description = await read_input('Description:')
                tasks.create(description);
                break;

            case '2':
                tasks.list_tasks();
                break;

            case '3':
                tasks.list_completed_tasks();
                break;

            case '4':
                tasks.list_completed_tasks(false);
                break;

            case '5':
                const ids = await mark_as_complete(tasks.list_array);
                console.log('IDS >>>', ids)
                tasks.set_task_to_complete(ids)
                break;

            case '6':
                const id = await list_to_delete(tasks.list_array);
                if(id !== '0'){
                    const ok = await confirm('Are you sure yo want to delete?');
                    if (ok) {
                        tasks.delete(id);
                        console.log('Delete succesfully');
                    }
                }
                break;

            default:
                break;
        }

        saveDB(tasks.list_array);

        if (opt !== '0') await pause();

    } while (opt !== '0');

}

main();