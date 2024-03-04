 /** 
  *  Example Usage of updateTable Function without await keyword
  */
const tableName = 'your_table_name'; // Replace 'your_table_name' with the actual table name
const fieldsToUpdate = [
  { field: 'column1', value: 'new_value1' }, // Example field and value to update
  { field: 'column2', value: 'new_value2' }  // Example field and value to update
];
// Example conditions - specify multiple conditions to filter the rows to be updated
const conditions = [
  ['column3', 'condition_value1'], // First condition
  ['column4', 'condition_value2']  // Second condition
];

// Call the updateTable function
updateTable(tableName, fieldsToUpdate, conditions)
  .then(rowsAffected => {
    console.log(`Updated ${rowsAffected.length} row(s)`);
    console.log('Rows affected:', rowsAffected);
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });

  /** ===============================================================================
   * 
  */
  /** 
   *  Example usage of updateTable function with await keyword
   * 
   */
async function updateRows() {
  try {
    const tableName = 'your_table_name'; // Replace 'your_table_name' with the actual table name

    // Example fields to update along with their new values
    const fieldsToUpdate = [
      { field: 'column1', value: 'new_value1' }, // Example field and value to update
      { field: 'column2', value: 'new_value2' }  // Example field and value to update
    ];

    // Example conditions - specify multiple conditions to filter the rows to be updated
  const conditions = [
    ['column3', 'condition_value1'], // First condition
    ['column4', 'condition_value2']  // Second condition
];

    // Call the updateTable function with await
    const rowsAffected = await updateTable(tableName, fieldsToUpdate, conditions);
    console.log(`Updated ${rowsAffected.length} row(s)`);
    console.log('Rows affected:', rowsAffected);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}
// Call the async function
updateRows();

 /** ===============================================================================
   */

  // Example usage of deleteFromTable function with await keyword
async function deleteRows() {
  try {
    const tableName = 'your_table_name'; // Replace 'your_table_name' with the actual table name

    // Example conditions - specify conditions to filter the rows to be deleted
    const conditions = [
      "column1 = 'value1'", // Example condition 1
      "column2 > 100"      // Example condition 2
    ];

    // Call the deleteFromTable function with await
    const rowsAffected = await deleteFromTable(tableName, conditions);
    console.log(`Deleted ${rowsAffected.length} row(s)`);
    console.log('Rows affected:', rowsAffected);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

// Call the async function
deleteRows();

 /** ===============================================================================
 */

 /**
  * Example usage of deleteFromTable function without await keyword
  */
  
 // Example usage
const tableName = 'your_table_name'; // Replace 'your_table_name' with the actual table name

// Example conditions - specify conditions to filter the rows to be deleted
const conditions = [
  "column1 = 'value1'", // Example condition 1
  "column2 > 100"      // Example condition 2
];

// Call the deleteFromTable function
deleteFromTable(tableName, conditions)
  .then(rowsAffected => {
    console.log(`Deleted ${rowsAffected.length} row(s)`);
    console.log('Rows affected:', rowsAffected);
  })
  .catch(error => {
    console.error('Error occurred:', error);
  });



