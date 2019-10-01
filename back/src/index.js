const dotenv = require('dotenv');
dotenv.config();

import app from './app';
import gallery_videos from './db/gallery_videos.js';
import gallery_images from './db/gallery_images';
// import { isloggedIn, authenticateUser, logout } from "./auth.js";
import path from 'path'
import multer from 'multer'
import { builtinModules } from 'module';
import initializeDatabase_gallery_videos from './db/gallery_videos.js';
import initializeDatabase_gallery_images from './db/gallery_images.js';
import initializeDatabase_team from './db/team.js';
import initializeProducts from './db/products.js';
import initializeDatabase_categories from './db/categories.js';
import initializeUsers from './db/users_accounts.js';
import initializeOrders from './db/orders.js'
import initialize_Orders_products from './db/orders_products.js'

//Please, don't forget to change the directory you are importing the controllers from, accordingly.
const multerStorage = multer.diskStorage({
  destination: path.join(__dirname, '../public/images'),
  // filename: (req, file, cb) => {
  //   const { fieldname, originalname } = file
  //   const date = Date.now()
  //   // filename will be: image-1345923023436343-filename.png
  //   const filename = `${fieldname}-${date}-${originalname}`
  //   cb(null, filename)
  // }
})
const upload = multer({storage: multerStorage})

const start = async () => {
  const controller_gallery_videos = await initializeDatabase_gallery_videos();
  const controller_gallery_images = await initializeDatabase_gallery_images();
  const controller_team = await initializeDatabase_team();
  const controller_products = await initializeProducts();
  const controller_categories = await initializeDatabase_categories();
  const controller_users = await initializeUsers();
  const controller_orders = await initializeOrders();
  const controller_orders_products = await initialize_Orders_products();
  
  
  app.get('/', (req, res) => res.send('ok'));
  
  
  //////////////////////////////////////////////////////////////////////////
  ///////////// Routes for (categories) table
  
  app.get('/categories/list', async (req, res, next) => {
    try {
      
      const result = await controller_categories.getCategories();
      res.json({success: true, result});
      return (result);
      console.log(result)
    } catch (err) {
      next(err);
    }
  });
  
  app.get('/categories/get/:id', async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await controller_categories.getCategory(id);
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  
  app.get('/categories/delete/:id', async (req, res, next) => {
    
    try {
      const {id} = req.params;
      const result = await controller_categories.deleteCategories(id);
      res.json({success: true, result});
      console.log()
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/categories/update/:id', async (req, res, next) => {
    
    try {
      const {id} = req.params;
      const {name} = req.query;
      const result = await controller_categories.updateCategories(id, name);
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/categories/create', async (req, res, next) => {
    const {name} = req.query
    try {
      console.log('route', name);
      const result = await controller_categories.createCategories(name);
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  //// Routs for gallery_videos:
  app.get('/videos/get/:id', async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await controller_gallery_videos.getVideo(id);
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  app.get('/videos/list', async (req, res, next) => {
    try {
      
      const result = await controller_gallery_videos.getGalleryVideos();
      res.json({success: true, result});
      return (result);
      console.log(result)
    } catch (err) {
      next(err);
    }
  });
  
  
  app.get('/videos/delete/:id', async (req, res, next) => {
    
    try {
      const {id} = req.params;
      const result = await controller_gallery_videos.deleteGalleryVideos(id);
      res.json({success: true, result});
      console.log()
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/videos/update/:id', async (req, res, next) => {
    
    try {
      const {id} = req.params;
      const {link} = req.query;
      const result = await controller_gallery_videos.updateGalleryVideos(id, link);
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/videos/create/:link', async (req, res, next) => {
    try {
      const {link} = req.params;
      
      console.log('route', link);
      const result = await controller_gallery_videos.createGalleryVideos(link);
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });


// /////////////////////////////////////////////////////////
//// Routs for gallery_images:
  
  app.get('/images/get/:id', async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await controller_gallery_images.getImage(id);
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  app.get('/images/list', async (req, res, next) => {
    try {
      
      const result = await controller_gallery_images.getGalleryImages();
      res.json({success: true, result});
      return (result);
      console.log(result)
    } catch (err) {
      next(err);
    }
  });
  
  
  app.post('/images/delete/:id', async (req, res, next) => {
    
    try {
      const {id} = req.params;
      const result = await controller_gallery_images.deleteGalleryImages(id);
      res.json({success: true, result});
      console.log()
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/images/update/:id', upload.single('image'), async (req, res, next) => {
    
    try {
      const {id} = req.params;
      const imageName = req.file && req.file.filename;
      const result = await controller_gallery_images.updateGalleryImages(id, imageName);
      res.json({success: true, result});
      return (result);
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/images/create', upload.single('image'), async (req, res, next) => {
    try {
      const imageName = req.file.filename;
      console.log(imageName)
      console.log('route', imageName);
      const result = await controller_gallery_images.createGalleryImages(imageName);
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  
  //////////////////////////////////////////
  // Here are the routes for the table (orders)
  
  app.get('/orders/list', async (req, res, next) => {
    try {
      const result = await controller_orders.getOrdersList();
      res.json({success: true, result});
      return (result);
      console.log(result)
    } catch (err) {
      next(err);
    }
  });
  
  app.get('/orders/get/:id', async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await controller_orders.getOrder(id);
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  
  app.post('/orders/delete/:id', async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await controller_orders.deleteOrders(id);
      res.json({success: true, result});
      console.log()
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/orders/update/:id', async (req, res, next) => {
    try {
      const {id} = req.params;
      const {user_id, status, delivery_date} = req.query;
      const result = await controller_orders.updateOrders(id, {user_id, status, delivery_date});
      res.json({success: true, result});
      return (result);
    } catch (err) {
      next(err);
    }
  });
  
  
  app.post('/orders/create', async (req, res, next) => {
    try {
      const {user_id, status, delivery_date} = req.query;
      const result = await controller_orders.createOrders({user_id, status, delivery_date});
      res.json({done: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  
  ////////////////////////////////
  //  Here, we create the routes for the table (team)
  
  app.get('/team/list', async (req, res, next) => {
    try {
      
      const result = await controller_team.getTeamList();
      res.json({success: true, result});
      return (result);
      console.log(result)
    } catch (err) {
      next(err);
    }
  });
  
  
  app.get('/team/get/:id', async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await controller_team.getTeamMember(id);
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  
  app.post('/team/delete/:id', async (req, res, next) => {
    
    try {
      const {id} = req.params;
      const result = await controller_team.deleteTeamMember(id);
      res.json({success: true, result});
      console.log()
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/team/update/:id', upload.single('image'), async (req, res, next) => {
    
    try {
      const {id} = req.params;
      const {member_name, position, facebook_link, gmail_link} = req.query;
      const image_name = req.file && req.file.filename;
      const result = await controller_team.updateTeamMembers(id, {
        image_name,
        member_name,
        position,
        facebook_link,
        gmail_link,
      });
      res.json({success: true, result});
      return (result);
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/team/create', upload.single('image'), async (req, res, next) => {
    try {
      const {member_name, position, facebook_link, gmail_link} = req.query;
      const image_name = req.file && req.file.filename
      const result = await controller_team.createTeamMember({
        image_name,
        member_name,
        position,
        facebook_link,
        gmail_link,
      });
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  
  //////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////
  // Here we create routs for the table (products)
  
  app.get('/products/list', async (req, res, next) => {
    try {
      const result = await controller_products.getProductsList();
      res.json({success: true, result});
      return (result);
      console.log(result)
    } catch (err) {
      next(err);
    }
  });
  
  app.get('/products/get/:id', async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await controller_products.getProduct(id);
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  
  app.post('/products/delete/:id', async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await controller_products.deleteProducts(id);
      res.json({success: true, result});
      console.log()
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/products/update/:id', upload.single('image'), async (req, res, next) => {
    try {
      const {id} = req.params;
      const {title, price, description, category_id, is_featured} = req.query;
      const image_name = req.file && req.file.filename;
      const result = await controller_products.updateProducts(id, {
        title,
        image_name,
        price,
        description,
        category_id,
        is_featured,
      });
      res.json({success: true, result});
      return (result);
    } catch (err) {
      next(err);
    }
  });
  
  
  app.post('/products/create', upload.single('image'), async (req, res, next) => {
    try {
      const {title, price, description, category_id, is_featured} = req.query;
      const image_name = req.file && req.file.filename;
      const id = await controller_products.createProducts({
        title,
        image_name,
        price,
        description,
        category_id,
        is_featured,
      });
      if (id) {
        res.json({done: true, result: id});
      }
    } catch (err) {
      next(err);
    }
  });
  
  
  /////////////////////////////////////////////////
  ///// Here we create routs for the table (user_accounts)
  
  
  app.get('/users/list', async (req, res, next) => {
    try {
      
      const result = await controller_users.getUsersList();
      res.json({success: true, result});
      return (result);
      console.log(result)
    } catch (err) {
      next(err);
    }
  });
  
  
  app.get('/users/get/:id', async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await controller_users.getUser(id);
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  
  app.post('/users/delete/:id', async (req, res, next) => {
    
    try {
      const {id} = req.params;
      const result = await controller_users.deleteUsers(id);
      res.json({success: true, result});
      console.log()
    } catch (err) {
      next(err);
    }
  });
  
  
  app.post('/users/update/:id', async (req, res, next) => {
    
    try {
      const {id} = req.params;
      const {first_name, last_name, email, password, phone_number, address, postal_code, city} = req.query;
      const result = await controller_users.updateUsers(id, {
        first_name,
        last_name,
        email,
        password,
        phone_number,
        address,
        postal_code,
        city,
      });
      res.json({success: true, result});
      return (result);
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/users/create', async (req, res, next) => {
    try {
      const {first_name, last_name, email, password, phone_number, address, postal_code, city} = req.query;
      const result = await controller_users.createUsers({
        first_name,
        last_name,
        email,
        password,
        phone_number,
        address,
        postal_code,
        city,
      });
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  //////////////////////////////////////////
  /////////// Here we write the routes for the table (orders_prdocuts)
  
  app.get('/orders_details/list', async (req, res, next) => {
    try {
      
      const result = await controller_orders_products.getOrders_details_List();
      res.json({success: true, result});
      return (result);
      console.log(result)
    } catch (err) {
      next(err);
    }
  });
  
  
  app.get('/orders_details/get/:order_id', async (req, res, next) => {
    try {
      const {order_id} = req.params;
      const result = await controller_orders_products.getOrders_details(order_id);
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  
  app.post('/orders_details/delete/:order_id', async (req, res, next) => {
    
    try {
      const {order_id} = req.params;
      const {product_id} = req.query;
      const result = await controller_orders_products.deleteOrders_details(order_id, product_id);
      res.json({success: true, result});
      console.log()
    } catch (err) {
      next(err);
    }
  });
  
  
  app.post('/orders_details/update/:order_id', async (req, res, next) => {
    
    try {
      const {order_id} = req.params;
      const {product_id, quantity} = req.query;
      const result = await controller_orders_products.updateOrders_details(order_id, {product_id, quantity});
      res.json({success: true, result});
      return (result);
    } catch (err) {
      next(err);
    }
  });
  
  app.post('/orders_details/create', async (req, res, next) => {
    try {
      const {order_id, product_id, quantity} = req.query;
      const result = await controller_orders_products.createOrders_details({order_id, product_id, quantity});
      res.json({success: true, result});
    } catch (err) {
      next(err);
    }
  });
  
  
}
start()

app.listen(process.env.APP_PORT, () => console.log(`server listening on port ${process.env.APP_PORT}`))

module.exports = app;
