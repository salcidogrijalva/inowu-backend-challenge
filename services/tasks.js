const db = require('../services/db');

function getMultiple(page = 1) {
    const offset = (page - 1) * 10;
    const data = db.query(`SELECT * FROM tasks LIMIT ?,?`, [offset, 10]);
    const meta = { page };

    const tasks = data.map((task) => {
        return {
            createdAt: task.created_at,
            isCompleted: task.is_completed,
            task: task.task,
            title: task.title,
            id: task.id
        }
    })

    return {
        data: tasks,
        meta
    }
}

function getTaskById(id) {
    const data = db.query(`SELECT * FROM tasks WHERE id=?`, [id]);

    return {
        data
    }
}

function updateTask(id, title, description, isCompleted) {
    try {
        db.update(`UPDATE tasks SET title = ?, task = ?, is_completed = ? WHERE id = ?`, [title, description, isCompleted, id]);
    } catch (error) {
        console.error(error)
        throw Error(error)
    }

    return true;
}

function deleteTask(id) {
    try {
        db.update(`DELETE FROM tasks WHERE id = ?`, [id]);
    } catch (error) {
        console.error(error)
        throw Error(error)
    }

    return true;
}

function addTask(title, task) {
    try {
        db.update(`INSERT INTO tasks (title, task) VALUES (@title, @task)`, {title, task});
    } catch (error) {
        console.error(error)
        throw Error(error)
    }

    return true;
}

module.exports = {
    getMultiple,
    getTaskById,
    updateTask,
    deleteTask,
    addTask
}