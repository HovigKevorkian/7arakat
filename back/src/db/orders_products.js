import sqlite from "sqlite";
import SQL from "sql-template-strings";

const initialize_Orders_products = async () => {
 const db =  await sqlite.open("./harakat.sqlite");
 

  const getOrders_details_List = async () => {
    try {
        let stmt = SQL`SELECT  * FROM orders_details`;
        // let stmt = SQL`SELECT  * FROM orders_products INNER JOIN orders ON orders.id = orders_products.order_id
        // INNER JOIN products ON products.id = orders_products.product_id
        // `;
      const rows = await db.all(stmt);
      if (!rows) {
        throw new Error(` There are no products to display`);
      } else return rows;
    } catch (err) {
      throw new Error(`could not get the products list ` + err.message);
    }
};


const getOrders_details = async order_id => {
try {
  let stmt = `SELECT  * FROM orders_details
  WHERE order_id = ${order_id}`;

  const rows = await db.all(stmt);
  const productCount = rows;
  if (!productCount.length) {
    throw new Error(` productCount with id = ${order_id} doesnt exist`);
  } else return productCount;
} catch (err) {
  throw new Error(`could not get the productCount with order_id = ${order_id}` + err.message);
};
};

const deleteOrders_details = async (order_id, product_id)  => {
    try {
      const result = await db.run(
        `Delete FROM orders_details where order_id =(${order_id}) and product_id=(${product_id})`
      );
      console.log( result);
      if (result.stmt.changes === 0) {
        throw new Error(`could not delete productCount with id = ${order_id} or  product_id=(${product_id} or wrong id`);
      }
      return true;
    } catch (err) {
      throw new Error("could not delete the productCount");
    }
  };

  const updateOrders_details = async (order_id, props) => {
    const {product_id, quantity} = props;
    try {
    if (!order_id || (!order_id ||  !props) || !props) {
      throw new Error("you must provide an id and/or one of the inputs");
    }
      const stmt = `UPDATE orders_details SET order_id=(${order_id}), product_id=(${product_id}), quantity=(${quantity}) where order_id=(${order_id}) and product_id=(${product_id})`;
      console.log(stmt)
      const result = await db.all(stmt);
      return (result);
    } catch (err) {
        throw new Error("Can't update the productCount details")
    }
};



  const createOrders_details = async (props) => {
    const {order_id, product_id, quantity} = props;
    try {
    if ( !props || !order_id || !product_id ||!quantity) {
      throw new Error("you must provide all the fields");
    }
      const stmt = `INSERT INTO orders_details (order_id, product_id, quantity) VALUES (${order_id}, ${product_id}, ${quantity})`;
      // const stmt =  `INSERT INTO products (date, title, image_name, price, descripition, category_id, is_featured)
      // VALUES (${'2025-12-12'}, ${'Hello world'}, ${'jsdja'}, ${21}, ${'s21312'},${1}, ${'1'})`;
      console.log(stmt)
      const rows = await db.run(stmt);
     // console.log("results:", rows)
     // console.log("error:", err.message);
      const id = rows.stmt.lastID;
      return id;
    }catch(err){
      throw new Error(err," cannot insert OrderCount");
    };
}

  

  const controller = {
    getOrders_details_List,
    getOrders_details,
    createOrders_details,
    deleteOrders_details,
    updateOrders_details,
  };
  return controller;
};
export default initialize_Orders_products;