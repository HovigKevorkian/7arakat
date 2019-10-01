import sqlite from "sqlite";
import SQL from "sql-template-strings";

const nowForSQLite = () => new Date().toISOString().replace('T', ' ').replace('Z', '')

// const joinSQLStatementKeys = (keys, values, delimiter, keyValueSeparator = '=') => {
//   return keys
//     .map(propName => {
//       const value = values[propName];
//       if (value !== null && typeof value !== "undefined") {
//         return SQL``.append(propName).append(keyValueSeparator).append(SQL`${value}`);
//       }
//       return false;
//     }).filter(Boolean)
//     .reduce((prev, curr) => prev.append(delimiter).append(curr));
// };




const initializeProducts = async () => {
 const db =  await sqlite.open("./harakat.sqlite");
 
  const getProductsList = async () => {
    try {
        let stmt = SQL`SELECT  * FROM products`;
      const rows = await db.all(stmt);
      if (!rows) {
        throw new Error(` There are no products to display`);
      } else return rows;
    } catch (err) {
      throw new Error(`could not get the products list ` + err.message);
    }
};


const getProduct = async id => {
try {
  let stmt = `SELECT *  FROM products where  product_id = ${id}`;
  const rows = await db.all(stmt);
  const products = rows[0];
  if (!products) {
    throw new Error(` product with id = ${id} doesnt exist`);
  } else return products;
} catch (err) {
  throw new Error(`could not get the product with id = ${id}` + err.message);
};
};

const deleteProducts = async (id)  => {
    try {
      const result = await db.run(
        SQL`Delete FROM products where product_id = ${id}`
      );
      if (result.stmt.changes === 0) {
        throw new Error(`could not delete product with id = ${id} or wrong id`);
      }
      return true;
    } catch (err) {
      throw new Error("could not delete the product");
    }
  };

  const updateProducts = async (id,  props) => {
    const { title, image_name, price, description, category_id, is_featured} = props;
    try {
    if (!id || !(id ||  !props) || !props) {
      throw new Error("you must provide an id and/or one of the inputs");
    }
    const date = nowForSQLite();
      const stmt = `UPDATE products SET date=("${date}"), title=("${title}"), image_name=("${image_name}"), price=(${price}), description=("${description}"), category_id=(${category_id}), is_featured=(${is_featured}) WHERE product_id=(${id})`;
      console.log(stmt)
      const result = await db.all(stmt);
      return (result);
    } catch (err) {
        throw new Error("Can't update the product details")
    }
};



  const createProducts = async (props) => {
    const { title, image_name, price, description, category_id, is_featured} = props;
    try {
    if (!props  || !title || !price ||!image_name || !description || !category_id || !is_featured) {
      throw new Error("you must provide all the fields");
    }
      const date = nowForSQLite();
      const stmt = `INSERT INTO products (date, title, image_name, price, description, category_id, is_featured) VALUES ("${date}", "${title}", "${image_name}", ${price}, "${description}", ${category_id}, ${is_featured})`;
      console.log(stmt)
      const rows = await db.run(stmt);
      const id = rows.stmt.lastID;
      return id;
    }catch(err){
      throw new Error(err," cannot insert product");
    };
}

  

  const controller = {
    getProductsList,
    getProduct,
    createProducts,
    deleteProducts,
    updateProducts,
  };
  return controller;
};
export default initializeProducts;