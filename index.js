import express from "express";
import { PrismaClient } from "@prisma/client";

const application = express()

// Creating instance of prisma
const prisma = new PrismaClient()
application.use(express.json())

// Get user Details
application.get('/', async (request, response) => {
    const allUsers = await prisma.User.findMany()
    response.json(allUsers)
})
application.get('/getHouse', async (request, response) => {
    const allHouse = await prisma.house.findMany({include:{
        owner:true,
        bulitBy:false,
    }})
    response.json(allHouse)
})


//Add new Users
application.post('/user', async (request, response) => {
    const newUsers = await prisma.user.create({ data: request.body })
    response.json(newUsers)
})
application.post('/house', async (request, response) => {
  const newHouse = await prisma.house.create({data :request.body})
  response.json(newHouse)
})

//Edit user details
application.put("/:id", async (request, response) => {
   try {
    const id =request.params.id
    const newAge =request.body.age
    const updateUsers = await prisma.user.update({
        where:{id:id},
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
        where:{id:id}
    })
    response.json(deleteUsers)
   } catch (error) {
    console.log(error);
   }
})


application.listen(3000, () => {
    console.log(`Server is running on the port ${3000}`);
})