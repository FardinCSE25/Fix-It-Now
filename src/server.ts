import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

const main = async () => {

    try {
        await prisma.$connect();
        console.log("Database connected successfully !!");

        app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`);
        })
    } catch (error) {
        console.error("error while starting the server : ", error);
        await prisma.$disconnect();
        process.exit(1)
    }
}

main();