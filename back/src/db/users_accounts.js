import sqlite from "sqlite";
import SQL from "sql-template-strings";

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
      let stmt = `SELECT * FROM users_accounts 
      INNER JOIN orders ON  users_accounts.user_id = orders.user_id
      INNER JOIN orders_details ON orders_details.order_id = orders.order_id
	  inner join products ON products.product_id = orders_details.product_id
      where users_accounts.user_id =${id}`
      const rows = await db.all(stmt);
      const users = rows;
      if (!users.length) {
        throw new Error(` user with id = ${id} doesnt exist`);
      } else return users;
    } catch (err) {
      throw new Error(`could not get  the user with id = ${id} ` + err.message);
    };
};

    const deleteUsers = async (id)  => {
        try {
          const result = await db.run(
            SQL`Delete FROM users_accounts where user_id = ${id}`
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
          const {first_name, last_name, email, password, phone_number, address, postal_code, city} = props;
        try {
            if ( !props || !first_name || !last_name || !email || !password || !phone_number || !address || !postal_code || !city) {
                throw new Error("you must provide all of the details")
              } 
            const stmt = `INSERT INTO users_accounts (first_name, last_name, email, password, phone_number, address, postal_code, city) Values ("${first_name}", "${last_name}", "${email}", ${password}, ${phone_number}, "${address}", ${postal_code}, "${city}")`;
            console.log(stmt) 
            const rows = await db.run(stmt);
            const id = rows.stmt.lastID;
              return id;
        } catch (err) {
          throw new Error("couldn't create a new user");
        }
      };

      const updateUsers = async (id,  props) => {
        const {first_name, last_name, email, password, phone_number, address, postal_code, city} = props;
          try {
        if (!id ||  (!id || !props) || !props) {
          throw new Error("you must provide an id and/or one of the inputs");
        }
        
          const stmt = `UPDATE users_accounts SET first_name=("${first_name}"), last_name=("${last_name}"), email=("${email}"), password=("${password}"), phone_number=(${phone_number}), address=("${address}"), postal_code=(${postal_code}), city=("${city}") WHERE user_id=(${id})`;
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