import app from "./app";
import gallery_videos from "./db/gallery_videos.js";
import { isloggedIn, authenticateUser, logout } from "./auth.js";
import initializeDatabase from "./db/about_us";
import path from 'path'




const start = async () => {
  const controller = await initializeDatabase();

  /* const id = await controller.createContact({name:"Brad Putt",email:"brad@pet.com"})
  const contact = await controller.getContact(id)
  console.log("------\nmy newly created contact\n",contact)
 // await controller.updateContact(id, {name:"Brad Pitt"})
  await controller.updateContact(id, {email:"brad@pitt.com"})
  const updated_contact = await controller.getContact(id)
  console.log("------\nmy updated contact\n",updated_contact)
  console.log("------\nlist of contacts before\n",await controller.getContactsList())
  await controller.deleteContact(id)
  console.log("------\nlist of contacts after deleting\n",await controller.getContactsList())
 */

  /**
   * Route that returns string ok
   * @module /
   * @param {Express.Request} req - request
   * @param {Express.Response} res - response
   * @return {string}  - ok
   */
  app.get("/", async (req, res) => {
    const about = await controller.getAbout()
    res.json({
      data:about
    })
  });

  /**
   * Route that returns a list of contacts
   * @module contacts/list
   * @param {Express.Request} req - request
   * @param {Express.Response} res - response 
   * @return {json} rows - array of contacts
   */
  // app.get("/gallery", async (req, res, next) => {
  //   try {
  //     const { link_url, id } = req.query;
  //     const rows = await controller.getgallery_vidoes
  //     ({ link_url, id });

  //     res.json({ success: true, result: rows });
  //   } catch (err) {
  //     next(err);
  //   }
  // });

 

  app.listen(8080, () => {
    console.log("server listening on port 8080");
  });
};
start();
//export default app;
module.exports=app;