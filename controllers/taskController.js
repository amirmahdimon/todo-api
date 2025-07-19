const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            title: req.body.title,
            user: req.userId
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: 'خطا در ساخت تسک', error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'خطا در گرفتن تسک‌ها', error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { title: req.body.title },
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'خطا در ویرایش', error: err.message });
    }
};

exports.completeTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { completed: true },
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'خطا در کامل کردن', error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
        res.json({ message: 'تسک حذف شد' });
    } catch (err) {
        res.status(500).json({ message: 'خطا در حذف', error: err.message });
    }
};
