const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const task = new Task({ 
            title: req.body.title, 
            content: req.body.content 
        });

        await task.save();
        res.status(201).json({ message: 'Task saved', task });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    const { title, completed, page = 1, limit = 10 } = req.query;
    let filter = {};

    if (title) filter.title = new RegExp(title, 'i');
    if (completed !== undefined) filter.completed = completed === 'true';

    try {
        const tasks = await Task.find(filter);
        const total = await Task.countDocuments(filter);
        res.json({ tasks, total: tasks.length });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { title, content, completed } = req.body;
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { title, content, completed }, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;