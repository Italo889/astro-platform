"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Iniciando a importação de cidades do GeoNames...');
    const filePath = './BR.txt';
    const fileStream = fs_1.default.createReadStream(filePath);
    const rl = readline_1.default.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    let citiesToCreate = [];
    const batchSize = 1000; // Inserimos de 1000 em 1000 para não sobrecarregar o banco
    for await (const line of rl) {
        const columns = line.split('\t'); // O arquivo GeoNames é separado por tabs
        const cityData = {
            geonameId: parseInt(columns[0], 10),
            name: columns[1],
            asciiName: columns[2],
            latitude: parseFloat(columns[4]),
            longitude: parseFloat(columns[5]),
            countryCode: columns[8],
            admin1Code: columns[10],
            population: BigInt(columns[14]),
        };
        // Adicionamos apenas cidades com população para filtrar locais menores/irrelevantes
        if (cityData.population > 0) {
            citiesToCreate.push(cityData);
        }
        if (citiesToCreate.length === batchSize) {
            await prisma.city.createMany({ data: citiesToCreate, skipDuplicates: true });
            console.log(`${citiesToCreate.length} cidades inseridas...`);
            citiesToCreate = []; // Limpa o array para o próximo lote
        }
    }
    // Insere o lote final que sobrou
    if (citiesToCreate.length > 0) {
        await prisma.city.createMany({ data: citiesToCreate, skipDuplicates: true });
        console.log(`${citiesToCreate.length} cidades inseridas...`);
    }
    console.log('Importação concluída com sucesso!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
