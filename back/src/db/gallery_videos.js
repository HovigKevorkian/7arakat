import sqlite from "sqlite";
import SQL from "sql-template-strings";

<<<<<<< HEAD
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
      let stmt = `SELECT id AS id, link_url FROM gallery_videos where id = ${id}`;

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
            SQL`Delete FROM gallery_videos where id = ${id}`
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
          const stmt = SQL`UPDATE gallery_videos SET link_url=(${link}) WHERE id=(${id})`;
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
=======

/**
 * returns a date formatted like `YYYY-MM-DD HH:mm:ss.sss`, suitable for sqlite
 **/
const nowForSQLite = () => new Date().toISOString().replace('T',' ').replace('Z','')
/**
 * Joins multiple statements. Useful for `WHERE x = 1 AND y = 2`, where number of arguments is variable.
 * Usage:
 * ```js
 * joinSQLStatementKeys( ["id", "link_url"], {  link_url="Z"}, ", ")
 * ```
 * Will return an SQL statement corresponding to the string:
 * ```js
 * link_url="Z"
 * ```
 * @param {Array} keys an array of strings representing the properties you want to join 
 * @param {Object} values an object containing the values 
 * @param {string} delimiter a string to join the parts with
 * @param {string} keyValueSeparator a string to join the parts with
 * @returns {Statement} an SQL Statement object
 */
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




const initializeDatabase = async () => {
  const db = process.env.NODE_ENV ==="test"? await sqlite.open("./db-test.sqlite"):await sqlite.open("../../harakat.sqlite3");
  
 //await db.migrate({ force: 'last' })
  /**
   * retrieves the contacts from the database
   * @function getContactsList
   * @param {string} orderBy an optional string that is either "name" or "email"
   * @returns {array} the list of contacts
   */

  const getgallery_vidoes = async props => {
    const {link_url, id} = props;
     
   try {
    let stmt = SQL`SELECT id AS id, link_url  FROM gallery_videos`;
    if(id)
    {
      stmt.append(SQL` WHERE id = ${id}`);
    }
    
    switch (orderby) {
      case "link_url":
        stmt += " Order by name";
        break;
     
        break;
      default:
        break;
    }
    const rows = await db.all(stmt);
    if(rows.length === 0)
    {
      throw new Error("no contacts found!")
    }
    return rows;}
    catch(err)
    {
      throw new Error("could not retrieve list!")
    }
  };

 
  const controller = {
    getgallery_vidoes  };
  return controller;
};
export default initializeDatabase;
>>>>>>> 9b83f2b97293739816e747827b0efba334462ad6
