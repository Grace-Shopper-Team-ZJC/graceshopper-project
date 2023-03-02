const router = require('express').Router()
const { models: { User, Order, Product }} = require('../db')
module.exports = router




////products////////
//Reminder: these are placeholders route. Sequelize commands may need adjustments 
// --- updated: 3/2/23. changed paths to match router.use in index.js


//GET all products
router.get('/', async (req, res, next)=>{
    try{
      res.send(await Product.findAll());
    }
    catch(err){
      next(err)
    }
  })
  
  //GET single product
  router.get('/:id', async (req, res, next)=>{
    try{
      res.send(await Product.findByPk(req.params.id));
    }
    catch(err){
      next(err)
    }
  });
  
  //POST product
  router.post('/', async (req,res, next)=>{
    try{
      res.send(await Product.create(req.body));
    }
    catch(err){
      next(err);
    }
  })
  // PUT product
  router.put('/:id', async (req, res, next)=>{
    try{
        const product = await Product.findByPk(req.params.id);
        res.send(await product.update(req.body));
    }
    catch(err){
        next(err);
    }
  })


  //DELETE product
  router.delete('/:id',async (req, res, next)=>{
    try{
      const product = await Product.findByPk(req.params.id);
      await product.destroy();
      res.send(product); 
    }
    catch(err){
      next(err);
    }
  })
  