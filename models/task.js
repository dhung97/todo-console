const { v4: uuidv4 } = require('uuid');

class Task {
    id = '';
    description = '';
    endedAt = null;

    constructor(description) {
        this.description = description;
        this.id = uuidv4();
        this.endedAt = null;
    }
}

module.exports = Task;