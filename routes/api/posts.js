const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validatePostInput = require('../../validator/post');

// @route   POST api/posts
// @desc    Create post
// @access  Private

router.get('/',(req, res) =>{
  Post.find() 
  .sort({date: -1})
  .then(posts => res.json(posts))
  .catch(err => res.status(404));
});

router.get('/:id', (req,res) => {
  Post.findById(req.params.id)
  .then(post => res.json(post))
  .catch(err => res.status(404).json({Nopostfound: "No post found by that id"}));
});


router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

router.delete('/:id', passport.authenticate('jwt', {session: false}) ),
(req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
      PostfindById(req.params.id)
      .then(post => {
        if(post.user.toString() !== req.user.id) {
          return res.status(401).json({ notAutgorized: "usr not authorized"});

        }
        post.remove().then(() => res.json({success : true}));
      })
    })
    .catch(err => res.status(404).json({postnotfound:"Not post found"}));
}



module.exports = router;