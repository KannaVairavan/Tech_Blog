
const router = require('express').Router();

const {User, Posts, Comments } = require('../models');
const withAuth = require('../utils/auth');


// login route
router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  console.log( req.session.logged_in );
  if ( req.session.logged_in ) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// signup route
router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if ( req.session.logged_in ) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

    // get all posts
    router.get('/', async(req,res)=>{
      try{
        const postData= await Posts.findAll({
          include:[
            {
              model: User,
              attributes: ['username'],
            }
          ]
        
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);
        res.render('homepage', {
          posts, 
          loggedIn:req.session.logged_in,

        });
      }catch (err){
        console.log(err);
        res.status(500).json(err);
      }
    });


router.get('/post/:id', withAuth, async(req,res)=>{
  try{
    const dbPostData= await Posts.findByPk(req.params.id,
      {
        include:[
          {
            model:Comments,
            attributes:[
              'id',
              'comment',
              'post_id',
              'user_id',
              'date_created',
            ],
            include:{
                model:User,
                attributes:['username']
            }
          },
          {
              model:User,
              attributes:['username']
          }
        ]
      } );
    const postDetail = dbPostData.get({ plain: true });
    console.log(postDetail);
    res.render('singlePost', {
      postDetail, 
      loggedIn:req.session.logged_in,

    });
  }catch (err){
    res.status(500).json(err);
  }
});

// get comment by id
router.get('/comment/:id', async(req, res)=>{
  try{
    const dbCommentsData=await Comments.findByPk(req.params.id, {
      include:[
        {
          model: User,
          attributes: ['username'],
        }
      ]
    });

    const comment=dbCommentsData.get({plain:true});
    console.log(comment);
    res.render('dashboard', {comment, loggedIn: req.session.logged_in })
    // res.status(200).json(dbCommentsData);
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})


module.exports = router;
