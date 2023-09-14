import express from "express";
import { PrismaClient } from "@prisma/client";

const application = express()

// Creating instance of prisma
const prisma = new PrismaClient()
application.use(express.json())

// Get user Details
application.get('/', async (request, response) => {
    const allUsers = await prisma.user.findMany()
    response.json(allUsers)
})

//Add new Users
application.post('/', async (request, response) => {
    const newUsers = await prisma.user.create({ data: request.body })
    response.json(newUsers)
})

//Edit user details
application.put("/:id", async (request, response) => {
   try {
    const id =request.params.id
    const newAge =request.body.age
    const updateUsers = await prisma.user.update({
        where:{id:parseInt(id)},
        data:{age:newAge}
    })
    response.json(updateUsers)
   } catch (error) {
    console.log(error);
   }
})


// Delete user detail
application.delete("/:id", async (request, response) => {
   try {
    const id =request.params.id
    const deleteUsers = await prisma.user.delete({
        where:{id:parseInt(id)}
    })
    response.json(deleteUsers).send("User deleted successfully")
   } catch (error) {
    console.log(error);
   }
})


application.listen(3000, () => {
    console.log(`Server is running on the port ${3000}`);
})