import { Request, Response } from "express";
import connection from "../connection";

const init = async (req: Request, res: Response) => {
  console.log("call");
  await connection.connect((err) => {
    if (err) throw err;

    console.log("db connected");

    let sql = `
        CREATE TABLE users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(50),
            password VARCHAR(50),
            verify_at DATETIME,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;

    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });

    return res.status(200).json({
      data: null,
      status: "INIT_DB_SUCCESS",
    });
  });
};
const InitDbController = { init };

export default InitDbController;
