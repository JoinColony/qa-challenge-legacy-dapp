import initSqlJs from 'sql.js';

import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import binAsString from "!!binary-loader!./db.s3db";

// Convert the raw binary file to a Uint8Array
let array = new Uint8Array(binAsString.length);
for (let i = 0; i < binAsString.length; i++) {
  array[i] = binAsString.charCodeAt(i);
}

const SQL = await initSqlJs({ locateFile: () => sqlWasm });
const db = new SQL.Database(array);

export default db;
