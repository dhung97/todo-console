const inquirer = require('inquirer');
require('colors');

const menu_options = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1.-'.green} Create new task`
            },
            {
                value: '2',
                name: `${'2.-'.green} List task(s)`
            },
            {
                value: '3',
                name: `${'3.-'.green} List completed task(s)`
            },
            {
                value: '4',
                name: `${'4.-'.green} List pending task(s)`
            },
            {
                value: '5',
                name: `${'5.-'.green} Complete task(s)`
            },
            {
                value: '6',
                name: `${'6.-'.green} Delete task`
            },
            {
                value: '0',
                name: `${'0.-'.green} Exit`
            },
        ]
    }
]

const inquirer_menu = async () => {
    console.clear()
    console.log('==========================='.green);
    console.log('     Choose an option'.white);
    console.log('=========================== \n'.green);

    const { option } = await inquirer.prompt(menu_options);
    return option;
}

const pause = async () => {
    const question = {
        type: 'input',
        name: 'enter',
        message: `Press ${'ENTER'.green} to continue`
    };

    console.log('\n')
    await inquirer.prompt(question);
}

const read_input = async (message) => {
    const question = {
        type: 'input',
        name: 'description',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Please enter a value';
            }
            return true;
        }
    }

    const { description } = await inquirer.prompt(question);
    return description;
}

const list_to_delete = async (tasks = []) => {
    
    const choices = tasks.map((task, i) => {
        const index = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${index} ${ task.description}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]

    const { id } = await inquirer.prompt(question);
    return id
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }

    ]

    const { ok } = await inquirer.prompt(question);
    return ok;

}

const mark_as_complete = async (tasks = []) => {
    
    const choices = tasks.map((task, i) => {
        const index = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${index} ${ task.description}`,
            checked: (task.endedAt) ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Choices',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirer_menu,
    pause,
    read_input,
    list_to_delete,
    confirm,
    mark_as_complete
}