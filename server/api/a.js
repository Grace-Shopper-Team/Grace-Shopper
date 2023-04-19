const router = require('express').Router();

router.get('/', async (req, res, next) => {
    res.send("hello oki")
});

router.post('/', async (req, res, next) => {});

router.put('/:aId', async (req, res, next) => {});

router.delete('/:aId', async (req, res, next) => {});

module.exports = router;
