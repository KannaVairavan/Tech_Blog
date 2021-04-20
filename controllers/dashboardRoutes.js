
const router = require('express').Router();

const {User, Posts, Comments } = require('../models');
const withAuth = require('../utils/auth');


// withAuth
// get all posts
router.get('/',   withAuth, async(req,res)=>{
  console.log(req.session.user_id);
 
  try{
    const postData= await Posts.findAll({
      where: {
          user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'content',
        'date_created'
      ],
       include: [{
                    model: Comments,
                    attributes: ['id', 'comment', 'post_id', 'user_id', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
      ]
    });
      const postDetail =  postData.map((post) => post.get({ plain: true }));
      console.log(postDetail);
      // res.status(200).json(postDetail);
      res.render('dashboard', {      postDetail,       loggedIn:req.session.logged_in,    });

      
      
    
   
  }catch (err){
    res.status(500).json(err);
  }
});

    // router.get('/dashboard',  async(req,res)=>{
    //     try{
    //       const postData= await Posts.findAll({
    //         where: {
    //             user_id: req.session.user_id
    //         },
            
    //         include:[
    //           {
    //             model:comm,
    //             attributes:[
    //               'id',
    //               'comment',
    //               'post_id',
    //               'user_id',
    //               'date_created',
    //             ],
    //             include:{
    //                 model:User,
    //                 attributes:['username']
    //             }
    //           },
    //           {
    //               model:User,
    //               attributes:['username']
    //           }
    //         ]
          
    //       });
    //       const postDetail = postData.map((post) => post.get({ plain: true }));
    //       console.log(postDetail);
    //       res.render('dashboard', {
    //         postDetail, 
    //         loggedIn:req.session.logged_in,
      
    //       });
    //     }catch (err){
    //       res.status(500).json(err);
    //     }
    //   });
  
// get  post by id
router.get('/edit/:id', withAuth, async(req,res)=>{
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

      res.render('editpost', {
        postDetail, 
        loggedIn:req.session.logged_in,
  
      });
    }catch (err){
      res.status(500).json(err);
    }
  });

  router.get("/new",  withAuth, (req,res)=>{
    res.render('create-post',{loggedIn:req.session.logged_in});
  });
  
  module.exports = router;