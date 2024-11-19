const express = require('express');
const authenticateUser = require('../controllers/login_controller');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const result = await authenticateUser(username, password);
    if (result.success){
        res.status(200).json(result);
    } else {
        res.status(401).json(result);
    }
});

module.exports = router;