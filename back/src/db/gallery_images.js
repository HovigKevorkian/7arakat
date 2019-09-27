import sqlite from "sqlite";
import SQL from "sql-template-strings";

const nowForSQLite = () => new Date().toISOString().replace('T',' ').replace('Z','')


// const joinSQLStatementKeys = (keys, values, delimiter , keyValueSeparator='=') => {
//     return keys
//       .map(propName => {
//         const value = values[propName];
//         if (value !== null && typeof value !== "undefined") {
//           return SQL``.append(propName).append(keyValueSeparator).append(SQL`${value}`);
//         }
//         return false;
//       }).filter(Boolean)
//       .reduce((prev, curr) => prev.append(delimiter).append(curr));
//   };


  const initializeDatabase_gallery_images = async () => {
    const db =  await sqlite.open("./harakat.sqlite");

  
    const getGalleryImages = async () => {
        try {
            let stmt = SQL`SELECT  * FROM gallery_images`;
    
          const rows = await db.all(stmt);
    
          if (!rows) {
            throw new Error(` images doesnt exist`);
          } else return rows;
        } catch (err) {
          throw new Error(`could not get images ` + err.message);
        }
    };


  const getImage = async id => {
    try {
      let stmt = `SELECT id AS id, image_name FROM gallery_images where id = ${id}`;

      const rows = await db.all(stmt);

      const images = rows[0];
      if (!images) {
        throw new Error(` image with id = ${id} doesnt exist`);
      } else return images;
    } catch (err) {
      throw new Error(`could not get image with id = ${id}` + err.message);
    };


};
    const deleteGalleryImages = async (id)  => {
        try {
          const result = await db.run(
            SQL`Delete FROM gallery_images where id = ${id}`
          );
          if (result.stmt.changes === 0) {
            throw new Error(`could not delete image with id = ${id} or wrong id`);
          }
          return true;
        } catch (err) {
          throw new Error("could not delete image");
        }
      };


      const createGalleryImages = async imageName => {
        try {
            if (!imageName) {
                throw new Error("you must provide an image imageName")
              } 
            // const date = nowForSQLite();
            console.log(imageName)
            const stmt = `INSERT INTO gallery_images (image_name) Values ("${imageName}")`
            console.log(stmt) ;
            const rows = await db.run(stmt);
            console.log(rows)
            const id = rows.stmt.lastID;
              return id;
        } catch (err) {
          throw new Error("cannot insert imageName");
        }
      };

  
      const updateGalleryImages = async (id,  imageName) => {
         
        if (!id || !(id ||  imageName) || !imageName) {
          throw new Error("you must provide an id or an imageName");
        }
        try {
          const stmt = SQL`UPDATE gallery_images SET image_name=(${imageName}) WHERE id=(${id})`;
          const result = await db.all(stmt);
          return (result);
        } catch (err) {
            throw new Error("Can't update the link")
        }
    };


  const controller = {
   getGalleryImages,
   deleteGalleryImages,
   getImage,
   updateGalleryImages,
   createGalleryImages
  };
  return controller;
};

export default initializeDatabase_gallery_images;