import app from "./app";
import gallery_videos from "./db/gallery_videos.js";
import gallery_images from "./db/gallery_images";
// import { isloggedIn, authenticateUser, logout } from "./auth.js";
import path from 'path'
import multer from 'multer' 
import { builtinModules } from "module";
import initializeDatabase_gallery_videos from "./db/gallery_videos.js";
import initializeDatabase_gallery_images from "./db/gallery_images.js";
import initializeDatabase_team from "./db/team.js"; 
import initializeProducts from "./db/products.js";
// import initializeDatabase_categories from "./db/categories.js";
import initializeUsers from "./db/users_accounts.js"; 

//Please, don't forget to change the directory you are importing the controllers from, accordingly.
const multerStorage = multer.diskStorage({
  destination: path.join( __dirname, '../public/images'),
  // filename: (req, file, cb) => {
  //   const { fieldname, originalname } = file
  //   const date = Date.now()
  //   // filename will be: image-1345923023436343-filename.png
  //   const filename = `${fieldname}-${date}-${originalname}` 
  //   cb(null, filename)
  // }
})
const upload = multer({ storage: multerStorage  })

const start = async () => {
    const controller_gallery_videos = await initializeDatabase_gallery_videos();
    const controller_gallery_images = await initializeDatabase_gallery_images();
    const controller_team = await initializeDatabase_team();
    const controller_products = await initializeProducts();
    const controller_categories = await initializeDatabase_categories();
    const controller_users = await initializeUsers();

 
    app.get( '/', (req, res) => res.send("ok") );

    //// Routs for gallery_videos:
    app.get("/videos/get/:id", async (req, res, next) => {
        try {
          const { id } = req.params;
          const result = await controller_gallery_videos.getVideo(id);
          res.json({ success: true, result });
        } catch (err) {
          next(err);
        }
      });

      app.get("/videos/list", async (req, res, next) => {
        try {
          
          const result = await controller_gallery_videos.getGalleryVideos();
          res.json({ success: true, result });
          return (result);
          console.log(result)
        } catch (err) {
          next(err);
        }
      });
    
  
      app.get("/videos/delete/:id", async (req, res, next) => {
        
        try {
            const { id } = req.params;
          const result = await controller_gallery_videos.deleteGalleryVideos(id);
          res.json({ success: true, result });
          console.log()
        } catch (err) {
          next(err);
        }
      });

      app.post("/videos/update/:id", async (req, res, next) => {
        
        try {
            const { id } = req.params;
            const {link} =req.query;
          const result = await controller_gallery_videos.updateGalleryVideos(id, link);
          res.json({ success: true, result });
        } catch (err) {
          next(err);
        }
      });

      app.post("/videos/create/:link", async (req, res, next) => {
        try {
          const { link } = req.params;
         
          console.log("route",link);
          const result = await controller_gallery_videos.createGalleryVideos(link);
          res.json({ success: true, result });
        } catch (err) {
          next(err);
        }
      });


// /////////////////////////////////////////////////////////
//// Routs for gallery_images:

        app.get("/images/get/:id", async (req, res, next) => {
          try {
            const { id } = req.params;
            const result = await controller_gallery_images.getImage(id);
            res.json({ success: true, result });
          } catch (err) {
            next(err);
          }
        });
  
        app.get("/images/list", async (req, res, next) => {
          try {
            
            const result = await controller_gallery_images.getGalleryImages();
            res.json({ success: true, result });
            return (result);
            console.log(result)
          } catch (err) {
            next(err);
          }
        });
      
    
        app.get("/images/delete/:id", async (req, res, next) => {
          
          try {
              const { id } = req.params;
            const result = await controller_gallery_images.deleteGalleryImages(id);
            res.json({ success: true, result });
            console.log()
          } catch (err) {
            next(err);
          }
        });
  
        app.post("/images/update/:id",upload.single('image'), async (req, res, next) => {
          
          try {
              const { id } = req.params;
              const imageName = req.file && req.file.filename;
            const result = await controller_gallery_images.updateGalleryImages(id, imageName);
            res.json({ success: true, result });
            return (result);
          } catch (err) {
            next(err);
          }
        });
  
        app.post("/images/create",upload.single('image'), async (req, res, next) => {
          try {
            // const { imageName } = req.params;
            // const image = req.file && req.file.filename
            const imageName = req.file.filename;
            console.log(imageName)
            console.log("route", imageName);
            // console.log(err.field);
            const result = await controller_gallery_images.createGalleryImages(imageName);
            res.json({ success: true, result });
          } catch (err) {
            next(err);
          }
        });


      ////////////////////////////////
      //  Here, we create the routes for the table (team)

      app.get("/team/list", async (req, res, next) => {
        try {
          
          const result = await controller_team.getTeamList();
          res.json({ success: true, result });
          return (result);
          console.log(result)
        } catch (err) {
          next(err);
        }
      });


      app.get("/team/get/:id", async (req, res, next) => {
        try {
          const { id } = req.params;
          const result = await controller_team.getTeamMember(id);
          res.json({ success: true, result });
        } catch (err) {
          next(err);
        }
      });
    
  
      app.post("/team/delete/:id", async (req, res, next) => {
        
        try {
            const { id } = req.params;
          const result = await controller_team.deleteTeamMember(id);
          res.json({ success: true, result });
          console.log()
        } catch (err) {
          next(err);
        }
      });


      // app.post("/team/create",upload.single('image'), async (req, res, next) => {
      //   try {
      //     const {member_name, position, facebook_link, gmail_link } = req.query;
      //     const image_name = req.file && req.file.filename
      //     // const imageName = req.file.filename;
      //     // console.log(imageName)
      //     // console.log("route", imageName);
      //     // console.log(err.field);
      //     const result = await controller_team.createTeamMember({image_name ,member_name, position, facebook_link, gmail_link});
      //     res.json({ success: true, result });
      //   } catch (err) {
      //     next(err);
      //   }
      // });


      app.post("/team/update/:id",upload.single('image'), async (req, res, next) => {
        
        try {
            const { id } = req.params;
            const {member_name, position, facebook_link, gmail_link } = req.query;
            const image_name = req.file && req.file.filename;
          const result = await controller_team.updateTeamMembers(id, {image_name ,member_name, position, facebook_link, gmail_link});
          res.json({ success: true, result });
          return (result);
        } catch (err) {
          next(err);
        }
      });

      app.post("/team/create",upload.single('image'), async (req, res, next) => {
        try {
          const {member_name, position, facebook_link, gmail_link } = req.query;
          const image_name = req.file && req.file.filename
          // const imageName = req.file.filename;
          // console.log(imageName)
          // console.log("route", imageName);
          // console.log(err.field);
          const result = await controller_team.createTeamMember({image_name ,member_name, position, facebook_link, gmail_link});
          res.json({ success: true, result });
        } catch (err) {
          next(err);
        }
      });


  //////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////
  // Here we create routs for the table (products)

  app.get("/products/list", async (req, res, next) => {
    try {
      const result = await controller_products.getProductsList();
      res.json({ success: true, result });
      return (result);
      console.log(result)
    } catch (err) {
      next(err);
    }
  });

  app.get("/products/get/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await controller_products.getProduct(id);
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });


  app.get("/products/delete/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
      const result = await controller_products.deleteProducts(id);
      res.json({ success: true, result });
      console.log()
    } catch (err) {
      next(err);
    }
  });

  app.post("/products/update/:id",upload.single('image'), async (req, res, next) => {
    try {
      const {id} = req.params;
        const { title, price, description, category_id, is_featured} = req.query;
        const image_name = req.file && req.file.filename;
      const result = await controller_products.updateProducts(id, {title, image_name, price, description, category_id, is_featured});
      res.json({ success: true, result });
      return (result);
    } catch (err) {
      next(err);
    }
  });
        
 
  app.post("/products/create", upload.single('image'), async (req, res, next)=>{
    try {
    const { title, price, description, category_id, is_featured} = req.query;
   // console.log(req.query);
   // console.log(req.file);
    const image_name = req.file && req.file.filename;
   // console.log(req.file.filename);
    const id = await controller_products.createProducts({ title, image_name, price, description, category_id, is_featured});
   // console.log(id);
    if(id){
      res.json({ done: true, result:id});
    } 
  } catch (err) {
    next(err);
  }
  });


 


  /////////////////////////////////////////////////
  ///// Here we create routs for the table (user_accounts)


  app.get("/users/list", async (req, res, next) => {
    try {
      
      const result = await controller_users.getUsersList();
      res.json({ success: true, result });
      return (result);
      console.log(result)
    } catch (err) {
      next(err);
    }
  });


  app.get("/users/get/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await controller_users.getUser(id);
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });


  app.post("/users/delete/:id", async (req, res, next) => {
    
    try {
        const { id } = req.params;
      const result = await controller_users.deleteUsers(id);
      res.json({ success: true, result });
      console.log()
    } catch (err) {
      next(err);
    }
  });


  app.post("/users/update/:id", async (req, res, next) => {
    
    try {
        const { id } = req.params;
        const {first_name, last_name, email, password, phone_nubmer, address, postal_code, city} = req.query;
      const result = await controller_users.updateUsers(id, {first_name, last_name, email, password, phone_nubmer, address, postal_code, city});
      res.json({ success: true, result });
      return (result);
    } catch (err) {
      next(err);
    }
  });

  app.post("/users/create", async (req, res, next) => {
    try {
      const {first_name, last_name, email, password, phone_nubmer, address, postal_code, city} = req.query;
      const result = await controller_users.createUsers({first_name, last_name, email, password, phone_nubmer, address, postal_code, city});
      res.json({ success: true, result });
    } catch (err) {
      next(err);
    }
  });
}
    start()

app.listen( 8080, () => console.log('server listening on port 8080') )

module.exports=app;
