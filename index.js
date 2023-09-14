import express from "express";
import { PrismaClient } from "@prisma/client";

const application = express()
application.use(express.json())

application.get((request, response) => {

})

application.listen(3000, () => {
    console.log(`Server is running on the port ${3000}`);
})