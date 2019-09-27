import sqlite from "sqlite";
import SQL from "sql-template-strings";

/**
 * returns a date formatted like `YYYY-MM-DD HH:mm:ss.sss`, suitable for sqlite
 **/
const nowForSQLite = () => new Date().toISOString().replace('T',' ').replace('Z','')
/**
 * Joins multiple statements. Useful for `WHERE x = 1 AND y = 2`, where number of arguments is variable.
 * Usage:
 * ```js
 * joinSQLStatementKeys( ["name", "age", "email"], { email:"x@y.c", name="Z"}, ", ")
 * ```
 * Will return an SQL statement corresponding to the string:
 * ```js
 * name="Z", email="x@y.c"
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
  const db = await sqlite.open('./harakat.sqlite');
  
 //await db.migrate({ force: 'last' })
  /**
   * retrieves the contacts from the database
   * @function getContactsList
   * @param {string} orderBy an optional string that is either "name" or "email"
   * @returns {array} the list of contacts
   */

  const getAbout = async props => {

     
   try {
    let stmt = SQL`SELECT * FROM about_us`;
    const rows = await db.all(stmt);
    return rows
}
    catch(err)
    {
        console.log(err)
      throw new Error("could not retrieve list!")
    }
  };

  /**
   * retrieves the contacts from the database
   * @function getContact
   * @param {number} id id to search by
   * @returns {array} contact found
   */
  const getContact = async id => {
    try {
      let stmt = `SELECT contact_id AS id, name, email, image FROM contacts where contact_id = ${id}`;

      const rows = await db.all(stmt);

      const contact = rows[0];
      if (!contact) {
        throw new Error(` contact with id = ${id} doesnt exist`);
      } else return contact;
    } catch (err) {
      throw new Error(`could not get contact with id = ${id}` + err.message);
    }
  };

  const createContact = async props => {
    const { name, email, user_id , image} = props;
    console.log("createC", props)
    if (!props || !name || !email || !user_id) {
      throw new Error("you must provide a name and email");
    }
    try {
      const date = nowForSQLite();
      const result = await db.run(
        SQL`INSERT INTO contacts (name, email, date,image, user_id) Values (${name}, ${email}, ${date},${image}, ${user_id})`
      );
      const id = result.stmt.lastID;
      return id;
    } catch (err) {
      throw new Error("cannot insert this combination of name and email");
    }
  };

  const deleteContact = async (props)  => {
    const {id, user_id} = props
    try {
      const result = await db.run(
        SQL`Delete from contacts where contact_id = ${id} AND user_id = ${user_id} `
      );
      if (result.stmt.changes === 0) {
        throw new Error(`could not delete contact with id = ${id} or wrong user_id`);
      }
      return true;
    } catch (err) {
      throw new Error("could not delete contact");
    }
  };

  const updateContact = async (id, props) => {
    const { name, email, user_id } = props;
    if (!props || !(name || email||image) || !user_id) {
      throw new Error("you must provide a name ,image, or an email");
    }
    try {
      const stmt = SQL`UPDATE contacts SET `
      .append( joinSQLStatementKeys( ["name", "email", "image"], props, ", " ))
      .append(SQL` WHERE `)
      .append(joinSQLStatementKeys(["contact_id", "user_id"],
          { contact_id:id, user_id:props.user_id }, " AND ")
      );

      
      const result = await db.run(stmt);
      if (result.stmt.changes === 0) {
        throw new Error(`could not update the contact with id = ${id}`);
      }
      return true;
    } catch (err) {
      throw new Error(`could not update the contact with id = ${id}` + err.message);
    }
  };

  const findUser= async props=>{
    const {username, password} = props;
    try{
      const stmt = SQL`SELECT * FROM users WHERE name = ${username} AND password = ${password}`;
      const rows = await db.all(stmt);
      const user = rows[0]
      if(!user){
        throw new Error('Incorrect username or password!')
      }
      else
      return user;

    }
    catch(err)
    {
      throw new Error('Could not perform operation!')
    }
  }

  const findUserByID = async id =>
  {
    try{
      const stmt = SQL`SELECT * FROM users WHERE user_id = ${id}`;
      const rows = await db.all(stmt);
      const user = rows[0]
      if(!user){
        throw new Error('Incorrect user_id!')
      }
      else
      return user;
    }
    catch(err)
    {
      throw new Error(err)
    }
  }

  const controller = {
    getAbout,
    createContact,
    deleteContact,
    updateContact,
    getContact, 
    findUser,
    findUserByID
  };
  return controller;
};
export default initializeDatabase;