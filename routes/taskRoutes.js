const express = require('express');
const router = express.Router();
const {
    createTask,
    getTasks,
    updateTask,
    completeTask,
    deleteTask
} = require('../controllers/taskController');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // همه این مسیرها نیاز به توکن دارند

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.patch('/:id/complete', completeTask);
router.delete('/:id', deleteTask);

module.exports = router;
