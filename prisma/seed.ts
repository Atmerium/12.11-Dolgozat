import { PrismaClient } from "generated/prisma/client" 
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'
dotenv.config()
console.log('Seeding...')
const prisma = new PrismaClient()
async function main() {
  const list = ['wood', 'plastic', 'metal', 'other']
    for (let i = 0; i < 5; i++) {
        await prisma.child.create({
            data: {
                name: faker.person.firstName(),
                address: faker.location.country()+" "+faker.location.city()+" "+faker.location.streetAddress(),
                good: faker.datatype.boolean(),
            }
          })
    }
    for (let i = 0; i < 5; i++) {
        await prisma.toy.create({
            data: {
                name: faker.commerce.productName(),
                material: list[faker.number.int({ min: 0, max: 3 })],
                weight: faker.number.float({ min: 0.1, max: 10.0, fractionDigits: 2 }),
            }
          })
    }
    /*
    for (let i = 0; i < 5; i++) {
        await prisma.list.create({
            data: {
                childrenid: faker.number.int({ min: 1, max: 5 }),
                toysid: faker.number.int({ min: 1, max: 5 }),
            }
          })
    }
    */
    console.log('Seeding finished.')
}
main()
.then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
