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




const initializeOrders = async () => {
 const db =  await sqlite.open("./harakat.sqlite");
 
  const getOrdersList = async () => {
    try {
        let stmt = SQL`SELECT  * FROM orders`;
      const rows = await db.all(stmt);
      if (!rows) {
        throw new Error(` There are no orders to display`);
      } else return rows;
    } catch (err) {
      throw new Error(`could not get the orders list ` + err.message);
    }
};


const getOrder = async id => {
try {
  let stmt = `SELECT *  FROM orders where  order_id = ${id}`;
  const rows = await db.all(stmt);
  const products = rows;
  if (!products) {
    throw new Error(` order with id = ${id} doesnt exist`);
  } else return products;
} catch (err) {
  throw new Error(`could not get the order with id = ${id}` + err.message);
};
};

const deleteOrders = async (id)  => {
    try {
      const result = await db.run(
        SQL`Delete FROM orders where order_id = ${id}`
      );
      if (result.stmt.changes === 0) {
        throw new Error(`could not delete order with id = ${id} or wrong id`);
      }
      return true;
    } catch (err) {
      throw new Error("could not delete the order");
    }
  };

  const updateOrders = async (id,  props) => {
    const { user_id, status, delivery_date } = props
    try {
    if (!id || !(id ||  !props) || !props) {
      throw new Error("you must provide an id and/or one of the inputs");
    }
    const newDate = nowForSQLite();
      const stmt = `UPDATE orders SET user_id=(${user_id}), date=("${newDate}"), status=("${status}"), delivery_date=("${delivery_date}") where order_id=(${id})`;
      const result = await db.all(stmt);
      return (result);
    } catch (err) {
        throw new Error("Can't update the order details")
    }
};



  const createOrders = async (props) => {
    const { user_id, status, delivery_date } = props
    try {
    if (!props) {
      throw new Error("you must provide all the fields");
    }
      const date = nowForSQLite();
      const stmt = `INSERT INTO orders (user_id, date, status, delivery_date) VALUES (${user_id}, "${date}", "${status}", "${delivery_date}")`;
      console.log(stmt)
      const rows = await db.run(stmt);
      const id = rows.stmt.lastID;
      return id;
    }catch(err){
      throw new Error(err," cannot insert order");
    };
}
  

  const controller = {
    getOrdersList,
    getOrder,
    createOrders,
    deleteOrders,
    updateOrders,
  };
  return controller;
};
export default initializeOrders;