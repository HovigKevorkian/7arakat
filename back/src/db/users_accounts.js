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


  const initializeUsers = async () => {
    const db =  await sqlite.open("./harakat.sqlite");

  
    const getUsersList = async () => {
        try {
            let stmt = SQL`SELECT  * FROM users_accounts`;
    
          const rows = await db.all(stmt);
    
          if (!rows) {
            throw new Error(` There are no users to display`);
          } else return rows;
        } catch (err) {
          throw new Error(`could not get the users list ` + err.message);
        }
    };


  const getUser = async id => {
    try {
      let stmt = `SELECT *FROM users_accounts where id = ${id}`;

      const rows = await db.all(stmt);

      const user = rows[0];
      if (!user) {
        throw new Error(` user with id = ${id} doesnt exist`);
      } else return member;
    } catch (err) {
      throw new Error(`could not get  the user with id = ${id}` + err.message);
    };
};

    const deleteUsers = async (id)  => {
        try {
          const result = await db.run(
            SQL`Delete FROM users_accounts where id = ${id}`
          );
          if (result.stmt.changes === 0) {
            throw new Error(`could not delete useer with id = ${id} or wrong id`);
          }
          return true;
        } catch (err) {
          throw new Error("could not delete the user");
        }
      };


      const createUsers = async (props) => {
          const {first_name, last_name, email, password, phone_nubmer, address, postal_code, city} = props;
        try {
            if ( !prosp || !first_name || !last_name || !email || !password || !phone_nubmer || !address || !postal_code || !city) {
                throw new Error("you must provide all of the details")
              } 
            // const date = nowForSQLite();
            console.log(props)
            const stmt = `INSERT INTO users_accounts (first_name, last_name, email, password, phone_nubmer, address, postal_code, city) VALUES ("${first_name}", "${last_name}", "${email}", ${password}, ${phone_number}, "${address}", ${postal_code}, "${city}")`
            console.log(stmt) ;
            const rows = await db.run(stmt);
            console.log(rows)
            const id = rows.stmt.lastID;
              return id;
        } catch (err) {
          throw new Error("couldn't create a new user acconut");
        }
      };

  
      const updateUsers = async (id,  props) => {
        const {first_name, last_name, email, password, phone_nubmer, address, postal_code, city} = props;
        // if (!id || !(id ||  (!image_name || !member_name || !position || !facebook_link || !gmail_link))  ||  (!image_name || !member_name || !position || !facebook_link || !gmail_link)) {
          if (!id ||  (!id || !prosp) || !first_name || !last_name || !email || !password || !phone_nubmer || !address || !postal_code || !city) {
          throw new Error("you must provide an id and/or one of the inputs");
        }
        try {
          const stmt = `UPDATE users_accounts SET first_name=("${first_name}"), last_name=("${last_name}"), email=("${email}"), password=("${password}"), phone_nubmer=(${phone_nubmer}), address=("${address}"), postal_code=(${postal_code}), city=("${city}")`;
          const result = await db.all(stmt);
          return (result);
        } catch (err) {
            throw new Error("Can't update user account")
        }
    };


  const controller = {
   getUsersList,
   getUser,
   deleteUsers,
   updateUsers,
   createUsers
  };
  return controller;
};

export default initializeUsers;