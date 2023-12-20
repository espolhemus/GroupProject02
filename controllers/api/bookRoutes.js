const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
        console.log(req.body.array);
        const info = JSON.parse(req.body);
        console.log(info);
        // const bookData = await Book.create({
        //     bookTitle: info[0],
        //     bookAuthor: info[1],
        //     bookImageUrl: info[2],
        //     bookDescription: info[3],
        //     eBookUrl: info[4]
        // });

        res.status(200).json(req.body);

    } catch (err) {
        res.status(400).json(err)
    }


})




module.exports = router;