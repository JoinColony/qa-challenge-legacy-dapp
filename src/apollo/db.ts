import initSqlJs from 'sql.js';

import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";
import binAsString from "!!binary-loader!./db.s3db";

export const binaryToUint8Array = (rawBinary: string) => {
  let array = new Uint8Array(rawBinary.length);
  for (let index = 0; index < rawBinary.length; index += 1) {
    array[index] = rawBinary.charCodeAt(index);
  }
  return array;
};

export const formatQueryResultRows = (queryResult: any, typeName: String | null = null) => {
  const [{ columns, values }] = queryResult;
  let rows: { [key: string]: any }[] = [];
  values.forEach((element: any[]) => {
    let row: { [key: string]: any } = {};
    if (typeName) {
      row.__typename = typeName;
    }
    for (let index = 0; index < columns.length; index += 1) {
      row[columns[index]] = element[index];
    }
    rows.push(row);
  });
  return rows;
};

const SQL = await initSqlJs({ locateFile: () => sqlWasm });

const db = new SQL.Database(binaryToUint8Array(binAsString));

export default db;
