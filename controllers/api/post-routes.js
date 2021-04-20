const router = require('express').Router();
const { Posts, User } = require('../../models');

 


router.post('/', async (req, res) => {
 
    try {
      const newPost= await Posts.create({
        title:req.body.title,
        content:req.body.content,
        date_created:req.body.date_created,
        user_id: req.session.user_id,
      });
      console.log(newPost);
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.put('/:id', async(req, res) => {
    // update a category by its `id` value
    Posts.update(
      {
        // All the fields you can update and the data attached to the request body.
        title: req.body.title,
        content: req.body.content,
        
      },
      {
        // Gets a book based on the book_id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    ) .then((updatedPost) => {

      res.status(200).json(updatedPost);
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  });

  
  router.delete('/:id', async (req, res) => {
    try {
      const postData = await Posts.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  module.exports = router;