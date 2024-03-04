import db from './db.js';
import util from 'util';


const queryPromise = util.promisify(db.query).bind(db);
/**
 * insert into table
 * select from table and based on condition
 * Delete from table
 * update table
 * select from 2 tables based on condition
 */


/**
 * Function to delete rows from a table based on provided conditions.
 * @param {string} tableName Name of the table from which data will be deleted.
 * @param {Array<string>} conditions An array of conditions to be applied in the WHERE clause for filtering the rows to be deleted. Each condition should be in the form of a string representing a valid SQL condition.
 * @returns {Promise<Array>} A promise that resolves to an array of rows affected by the deletion operation.
 */
const deleteFromTable = async (tableName, conditions = []) => {
  // Construct the WHERE part of the query
  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  console.log(whereClause)
  // Construct the full SQL query
  const query = `DELETE FROM ${tableName} ${whereClause}`;

  // Execute the query
  const result = await queryPromise(query);

  return result;
}

 
/**
 * Function to update columns in a table row based on provided fields and conditions.
 * @param {string} tableName Name of the table to update.
 * @param {Array<Object>} fieldsToUpdate An array containing objects of fields to update along with their new values.
 * @param {Array<Array>} conditions An array of conditions to be applied to filter the rows to be updated. Each condition should be an array with two elements: the column name and the condition value.
 * @returns {Promise<Array>} A promise that resolves to an array of rows affected by the update operation.
 * 
 * Example Usage => see the sqlusage.example.js
 * 
 */
const updateTable = async (tableName, fieldsToUpdate, conditions) => {
  // Construct the SET part of the query
  const setFields = fieldsToUpdate.map(field => `${field.field} = '${field.value}'`).join(', ');
  console.log(setFields)
  
  // Construct the WHERE part of the query
  const whereConditions = conditions.map(condition => `${condition[0]} = '${condition[1]}'`).join(' AND ');
  console.log(whereConditions)

  // Construct the full SQL query
  const query = `UPDATE ${tableName} SET ${setFields} WHERE ${whereConditions}`;
  
  // Execute the query with the values
  const result = await queryPromise(query);

  return result;
}
 

/**
 * Function to receive variable number of fields value and insert into a given table
 * @param {string} tableName  Name of table to be inserted into
 * @param {Array} listOfTableFields fields in table to inserted into
 * @param {Array} listOfValuesToBeInserted values to be inserted into the fields
 * @returns the result of the query
 */
const insertIntoTable = async (tableName, listOfTableFields, listOfValuesToBeInserted) =>{
  const fields = listOfTableFields.join(', ')
  const placeholders = listOfValuesToBeInserted.map(() => '?').join(', ');

  const statement = `INSERT INTO ${tableName} (${fields}) VALUES (${placeholders})`

  const result = await queryPromise(statement,  listOfValuesToBeInserted)

  return result
}

/**
 * 
 * Asynchronous Function to select a row from a table
 * @param {string} tableName table name to select from
 * @param {string} fields columns to be selected
 * @param {string} condition condition to be used for filtering
 * @returns selected rows
 */
const selectFromTable = async (tableName, fields='*', condition='') => {
  const query = condition ? `SELECT ${fields} FROM ${tableName} WHERE ${condition}` : `SELECT ${fields} FROM ${tableName}`;

  const result = await queryPromise(query);
  return result;
}



/**
 * Asynchronous Function to select columns from 2 tables in the database
 * @param {string} firstTable first table name to select from
 * @param {string} secondTable  second table name to select from
 * @param {string} fields columns to be selected
 * @param {string} tablesbases how the tables is to be merged
 * @param {string} condition condition to be used for filtering
 * @returns a promise that resolves to an array of objects of the selected rows
 */
const selectFrom2Tables = async (firstTable, secondTable, fields='*', tablesbases='', condition='') => {

  const statement = condition ? `SELECT ${fields} FROM ${firstTable} JOIN ${secondTable} ON ${tablesbases} WHERE ${condition}` : `SELECT ${fields} FROM ${firstTable} JOIN ${secondTable} ON ${tablesbases}` 

const result = await queryPromise(statement)

return result
}


export { selectFromTable, deleteFromTable, updateTable, insertIntoTable, selectFrom2Tables }