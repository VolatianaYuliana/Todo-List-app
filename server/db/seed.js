import pkg from "@prisma/client"
const {PrismaClient} = pkg
const prisma = new PrismaClient()
const {user: User} = prisma

async function main() {
    await User.create({
        data: {
            name : 'John',
            todos : {
                create : [
                    {
                        name: "tomate",
                      },
                      {
                        name: "orange juice",
                      },
                      {
                        name: "Milk",
                      },
                      {
                        name: "ice cream",
                      },
                      {
                        name: "eggs",
                      },
                      {
                        name: "meat",
                      },
                ]
            }
        }
    })
}

main()
      .catch((error) => {
        console.log(error)
        process.exit(1)
      })
      .finally(async() => {
        await prisma.$disconnect()
      })
