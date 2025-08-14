import { connect, getDB} from "./config.js"

async function seed() {
    const recetas= [

    ];
    await connect();
    await getDB().collection("recetas").deleteMany();
    await getDB().collection("recetas").insertMany(recetas);

    console.log("SE SUBIO TODO CARE CHIMBA");
    process.exit()
    
}
seed();