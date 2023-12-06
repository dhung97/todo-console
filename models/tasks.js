const Task = require("./task");

class Tasks {
    _list = {};

    get list_array() {
        let list = [];
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            list.push(task);
        })
        return list;
    }

    constructor() {
        this._list = {};
    }

    delete(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    create(description) {
        const task = new Task(description);
        this._list[task.id] = task;
    }

    load(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }

    list_tasks() {
        console.log();
        this.list_array.forEach((task, index) => {
            const { description, endedAt } = task
            console.log(`${index + 1}.- ${description} :: ${endedAt ? 'Complete'.green : 'Pending'.red}`)
        })
    }

    list_completed_tasks(condition = true) {
        let counter = 0;
        this.list_array.forEach(task => {
            const { description, endedAt } = task
            const status = endedAt ? 'Completed'.green : 'Pending'.red;

            if (condition) {
                if (endedAt) {
                    console.log(`${(++counter).toString().green}.- ${description} :: ${endedAt}`)
                }

            } else {
                if (!endedAt) {
                    console.log(`${(++counter).toString().red}.- ${description} :: ${status}`)
                }
            }

        })
    }

    set_task_to_complete(ids = []) {
        ids.forEach(id => {
            const task = this._list[id];
            if (!task.endedAt) {
                console.log('Task >>>', task)
                task.endedAt = new Date().toISOString()
            }
        });

        this.list_array.forEach( task => {
            if(!ids.includes(task.id)){
                this._list[task.id].endedAt = null;
            }
        })
    }
}

module.exports = Tasks;