import { app } from "./src/app.js";
import { connectDB } from './src/db/connectToDB.js';

const port = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.listen(port , () => {
    console.log(`Server is working on http://localhost:${port}`);  })
})
.catch((error) => {
    console.log("Error while connection to the db from server file : ", error);
})