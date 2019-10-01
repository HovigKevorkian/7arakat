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


  const initializeDatabase_team = async () => {
    const db =  await sqlite.open("./harakat.sqlite");

  
    const getTeamList = async () => {
        try {
            let stmt = SQL`SELECT  * FROM team`;
    
          const rows = await db.all(stmt);
    
          if (!rows) {
            throw new Error(` There is no data to display`);
          } else return rows;
        } catch (err) {
          throw new Error(`could not get the data ` + err.message);
        }
    };


  const getTeamMember = async id => {
    try {
      let stmt = `SELECT *FROM team where team_id = ${id}`;

      const rows = await db.all(stmt);

      const member = rows[0];
      if (!member) {
        throw new Error(` team member with team_id = ${id} doesnt exist`);
      } else return member;
    } catch (err) {
      throw new Error(`could not get  the team member with id = ${id}` + err.message);
    };
};

    const deleteTeamMember = async (id)  => {
        try {
          const result = await db.run(
            SQL`Delete FROM team where team_id = ${id}`
          );
          if (result.stmt.changes === 0) {
            throw new Error(`could not delete team member with id = ${id} or wrong id`);
          }
          return true;
        } catch (err) {
          throw new Error("could not delete team member");
        }
      };


      const createTeamMember = async (props) => {
          const {image_name, member_name, position, facebook_link, gmail_link} = props;
        try {
            if (!image_name || !member_name || !position || !facebook_link || !gmail_link) {
                throw new Error("you must provide all of the details")
              } 
            // const date = nowForSQLite();
            console.log(props)
            const stmt = `INSERT INTO team (image_name, member_name, position, facebook_link, gmail_link) Values ("${image_name}", "${member_name}", "${position}", "${facebook_link}", "${gmail_link}")`
            console.log(stmt) ;
            const rows = await db.run(stmt);
            console.log(rows)
            const id = rows.stmt.lastID;
              return id;
        } catch (err) {
          throw new Error("cannot insert one of the values");
        }
      };

  
      const updateTeamMembers = async (id,  props) => {
        const {image_name, member_name, position, facebook_link, gmail_link} = props;
          if (!id || !(id ||  !props)  ||  !props) {
          throw new Error("you must provide an id and/or one of the inputs");
        }
        try {
          const stmt = SQL`UPDATE team SET image_name=(${image_name}), member_name=(${member_name}), position=(${position}), facebook_link=(${facebook_link}), gmail_link=(${gmail_link}) WHERE team_id=(${id})`;
          const result = await db.all(stmt);
          return (result);
        } catch (err) {
            throw new Error("Can't update the team member details")
        }
    };


  const controller = {
   getTeamList,
   getTeamMember,
   deleteTeamMember,
   updateTeamMembers,
   createTeamMember
  };
  return controller;
};

export default initializeDatabase_team;