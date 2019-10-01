import sqlite from "sqlite";
import SQL from "sql-template-strings";

const nowForSQLite = () => new Date().toISOString().replace('T',' ').replace('Z','')


const joinSQLStatementKeys = (keys, values, delimiter , keyValueSeparator='=') => {
    return keys
      .map(propName => {
        const value = values[propName];
        if (value !== null && typeof value !== "undefined") {
          return SQL``.append(propName).append(keyValueSeparator).append(SQL`${value}`);
        }
        return false;
      }).filter(Boolean)
      .reduce((prev, curr) => prev.append(delimiter).append(curr));
  };


  const initializeDatabase_gallery_videos = async () => {
    const db =  await sqlite.open("./harakat.sqlite");

  
    const getGalleryVideos = async () => {
        try {
            let stmt = SQL`SELECT  * FROM gallery_videos`;
    
          const rows = await db.all(stmt);
    
          if (!rows) {
            throw new Error(` videos doesnt exist`);
          } else return rows;
        } catch (err) {
          throw new Error(`could not get videos ` + err.message);
        }
    };


  const getVideo = async id => {
    try {
      let stmt = `SELECT gallery_videos_id AS id, link_url FROM gallery_videos where id = ${id}`;

      const rows = await db.all(stmt);

      const videos = rows[0];
      if (!videos) {
        throw new Error(` video with id = ${id} doesnt exist`);
      } else return videos;
    } catch (err) {
      throw new Error(`could not get video with id = ${id}` + err.message);
    };


};
    const deleteGalleryVideos = async (id)  => {
        try {
          const result = await db.run(
            SQL`Delete FROM gallery_videos where gallery_videos_id = ${id}`
          );
          if (result.stmt.changes === 0) {
            throw new Error(`could not delete video with id = ${id} or wrong id`);
          }
          return true;
        } catch (err) {
          throw new Error("could not delete video");
        }
      };


      const createGalleryVideos = async link => {
        
        console.log("createVideo", link)
        if (!link) {
          throw new Error("you must provide a link")
        };
        try {
          const stmt = SQL`INSERT INTO gallery_videos(link_url) Values (${link})`
          ;
          const rows = await db.run(stmt);
          const id = rows.stmt.lastID;
          return id;
        }catch (err) {
          throw new Error("cannot insert link_url");
        }
      };

  
      const updateGalleryVideos = async (id,  link) => {
         
        if (!id || !(id ||  link) || !link) {
          throw new Error("you must provide an id or an url");
        }
        try {
          const stmt = SQL`UPDATE gallery_videos SET link_url=(${link}) WHERE gallery_videos_id=(${id})`;
          const result = await db.all(stmt);
          return (result);
        } catch (err) {
            throw new Error("Can't update the link")
        }
    };


  const controller = {
   getVideo,
   deleteGalleryVideos,
   getGalleryVideos,
   updateGalleryVideos,
   createGalleryVideos
  };
  return controller;
};

export default initializeDatabase_gallery_videos;
