import sqlite from "sqlite";
import SQL from "sql-template-strings";

const initializeDatabase_categories = async () => {
  const db = await sqlite.open("./harakat.sqlite");

  const getCategories = async props => {


    try {
      let stmt = SQL`SELECT * FROM categories`;
      const rows = await db.all(stmt);
      return rows
    }
    catch (err) {
      console.log(err)
      throw new Error("could not retrieve list!")
    }
  };

  const createCategories = async props => {
    const text = props;
    console.log("createCategoriesWithName", props)
    if (!props || !text) {
      throw new Error("you must provide a text");
    }
    try {
      const result = await db.run(
        SQL`INSERT INTO categories (name) Values (${text})`
      );
      const id = result.stmt.lastID;
      return id;
    } catch (err) {
      console.log(err)
      throw new Error("cannot insert this teaxt");
    }
  };

  const deleteCategories = async (props) => {
    const id = props
    console.log('>>>>>>>>',id)
    try {
      const result = await db.run(
        SQL`Delete from categories where id = ${id} `
      );
      if (result.stmt.changes === 0) {
        throw new Error(`could not delete name with id = ${id}`);
      }
      return true;
    } catch (err) {
      throw new Error("could not delete name");
    }
  };

  const updateCategories = async (props) => {
    if (!props.id )  {
    
      throw new Error("you must provide an id");
    }
    try {
      
      const stmt = SQL`UPDATE categories SET name=${props.name} WHERE id=${props.id} `
      // .append( joinSQLStatementKeys( ["text"], props.text ))
      // .append(SQL` WHERE `)
      // .append(joinSQLStatementKeys(["id"],
      //    props.id)
      // );

      const result = await db.run(stmt);
      if (result.stmt.changes === 0) {
        console.log("hello===>")
        throw new Error(`could not update the categories with id = ${props.id}`);
      }
      return true;
    } catch (err) {
      throw new Error(`could not update the category with id = ${props.id}` + err.message);
    }
  };

 
  
  const controller = {
    getCategories,
    createCategories,
    deleteCategories,
    updateCategories
  };
  return controller;
};
export default initializeDatabase_categories;