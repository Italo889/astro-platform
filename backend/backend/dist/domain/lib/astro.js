"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinatesForPlace = getCoordinatesForPlace;
exports.calculateAstrologicalChart = calculateAstrologicalChart;
exports.computeSunSign = computeSunSign;
const swisseph_1 = __importDefault(require("swisseph"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("../../prisma");
const ZODIAC = ["Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio", "Aquário", "Peixes"];
const PLANETS = { sun: swisseph_1.default.SE_SUN, moon: swisseph_1.default.SE_MOON, mercury: swisseph_1.default.SE_MERCURY, venus: swisseph_1.default.SE_VENUS, mars: swisseph_1.default.SE_MARS, jupiter: swisseph_1.default.SE_JUPITER, saturn: swisseph_1.default.SE_SATURN };
const CHINESE_ZODIAC = ["Rato", "Boi", "Tigre", "Coelho", "Dragão", "Serpente", "Cavalo", "Cabra", "Macaco", "Galo", "Cão", "Porco"];
const LUNAR_NEW_YEAR_START = { 1990: '01-27', 1991: '02-15', 1992: '02-04', 1993: '01-23', 1994: '02-10', 1995: '01-31', 1996: '02-19', 1997: '02-07', 1998: '01-28', 1999: '02-16', 2000: '02-05', 2001: '01-24', 2002: '02-12', 2003: '02-01', 2004: '01-22' };
const stateCodeMap = { 'AC': '01', 'AL': '02', 'AP': '03', 'AM': '04', 'BA': '05', 'CE': '06', 'DF': '07', 'ES': '08', 'GO': '09', 'MA': '10', 'MT': '11', 'MS': '12', 'MG': '13', 'PA': '14', 'PB': '15', 'PR': '16', 'PE': '17', 'PI': '18', 'RJ': '21', 'RN': '22', 'RS': '23', 'RO': '24', 'RR': '25', 'SC': '26', 'SP': '27', 'SE': '28', 'TO': '29' };
// --- Configuração da swisseph ---
const ephePath = path_1.default.join(process.cwd(), 'node_modules', 'swisseph', 'ephe');
swisseph_1.default.swe_set_ephe_path(ephePath);
// --- Funções Auxiliares ---
function getSignFromLongitude(lon) {
    const normalizedLon = (lon + 360) % 360;
    return ZODIAC[Math.floor(normalizedLon / 30)];
}
function getChineseZodiacSign(utcDate) {
    const year = utcDate.getUTCFullYear();
    const monthDay = `${String(utcDate.getUTCMonth() + 1).padStart(2, '0')}-${String(utcDate.getUTCDate()).padStart(2, '0')}`;
    const birthYear = (LUNAR_NEW_YEAR_START[year] && monthDay < LUNAR_NEW_YEAR_START[year]) ? year - 1 : year;
    return CHINESE_ZODIAC[(birthYear - 4) % 12];
}
function getHouseForPlanet(planetLon, houseCusps) {
    const normalizedLon = (planetLon + 360) % 360;
    for (let i = 0; i < 12; i++) {
        const cuspStart = (houseCusps[i] + 360) % 360;
        const cuspEnd = (houseCusps[(i + 1) % 12] + 360) % 360;
        if (cuspStart < cuspEnd) {
            if (normalizedLon >= cuspStart && normalizedLon < cuspEnd) {
                return i + 1;
            }
        }
        else {
            if (normalizedLon >= cuspStart || normalizedLon < cuspEnd) {
                return i + 1;
            }
        }
    }
    return 12; // Fallback
}
async function getCoordinatesForPlace(place) {
    const placeParts = place.split(',').map(p => p.trim());
    const cityName = placeParts[0];
    const stateAbbreviation = placeParts[1] || null;
    const whereClause = { asciiName: { contains: cityName, mode: 'insensitive' } };
    if (stateAbbreviation) {
        const geoNamesCode = stateCodeMap[stateAbbreviation.toUpperCase()];
        if (geoNamesCode)
            whereClause.admin1Code = geoNamesCode;
    }
    const city = await prisma_1.prisma.city.findFirst({ where: whereClause, orderBy: { population: 'desc' } });
    if (!city) {
        throw new Error(`Localidade não encontrada: ${place}`);
    }
    return { lat: city.latitude, lon: city.longitude };
}
// --- Função Principal de Cálculo Astrológico ---
function calculateAstrologicalChart(birthDetails, coords) {
    const utcDate = new Date(Date.UTC(birthDetails.year, birthDetails.month - 1, birthDetails.day, birthDetails.hour - birthDetails.timezoneOffset, birthDetails.minute));
    if (isNaN(utcDate.getTime())) {
        throw new Error('Data de nascimento inválida.');
    }
    const julianDayUT = swisseph_1.default.swe_utc_to_jd(utcDate.getUTCFullYear(), utcDate.getUTCMonth() + 1, utcDate.getUTCDate(), utcDate.getUTCHours(), utcDate.getUTCMinutes(), 0, swisseph_1.default.SE_GREG_CAL).julianDayUT;
    const flag = swisseph_1.default.SEFLG_SPEED;
    const housesResult = swisseph_1.default.swe_houses(julianDayUT, coords.lat, coords.lon, 'P');
    if ('error' in housesResult) {
        throw new Error(`Erro da swisseph: ${housesResult.error}`);
    }
    const ascendantLon = housesResult.ascendant;
    const houseCuspsArray = housesResult.house;
    const sun = swisseph_1.default.swe_calc_ut(julianDayUT, PLANETS.sun, flag);
    const moon = swisseph_1.default.swe_calc_ut(julianDayUT, PLANETS.moon, flag);
    const mercury = swisseph_1.default.swe_calc_ut(julianDayUT, PLANETS.mercury, flag);
    const venus = swisseph_1.default.swe_calc_ut(julianDayUT, PLANETS.venus, flag);
    const mars = swisseph_1.default.swe_calc_ut(julianDayUT, PLANETS.mars, flag);
    const jupiter = swisseph_1.default.swe_calc_ut(julianDayUT, PLANETS.jupiter, flag);
    const saturn = swisseph_1.default.swe_calc_ut(julianDayUT, PLANETS.saturn, flag);
    return {
        sun: { sign: getSignFromLongitude(sun.longitude), house: getHouseForPlanet(sun.longitude, houseCuspsArray), longitude: sun.longitude },
        moon: { sign: getSignFromLongitude(moon.longitude), house: getHouseForPlanet(moon.longitude, houseCuspsArray), longitude: moon.longitude },
        mercury: { sign: getSignFromLongitude(mercury.longitude), house: getHouseForPlanet(mercury.longitude, houseCuspsArray), longitude: mercury.longitude },
        venus: { sign: getSignFromLongitude(venus.longitude), house: getHouseForPlanet(venus.longitude, houseCuspsArray), longitude: venus.longitude },
        mars: { sign: getSignFromLongitude(mars.longitude), house: getHouseForPlanet(mars.longitude, houseCuspsArray), longitude: mars.longitude },
        jupiter: { sign: getSignFromLongitude(jupiter.longitude), house: getHouseForPlanet(jupiter.longitude, houseCuspsArray), longitude: jupiter.longitude },
        saturn: { sign: getSignFromLongitude(saturn.longitude), house: getHouseForPlanet(saturn.longitude, houseCuspsArray), longitude: saturn.longitude },
        ascendant: { sign: getSignFromLongitude(ascendantLon), longitude: ascendantLon },
        houseCusps: { 1: houseCuspsArray[0], 2: houseCuspsArray[1], 3: houseCuspsArray[2], 4: houseCuspsArray[3], 5: houseCuspsArray[4], 6: houseCuspsArray[5], 7: houseCuspsArray[6], 8: houseCuspsArray[7], 9: houseCuspsArray[8], 10: houseCuspsArray[9], 11: houseCuspsArray[10], 12: houseCuspsArray[11] },
        chineseZodiac: getChineseZodiacSign(utcDate),
    };
}
// --- FUNÇÃO ADICIONAL PARA SINASTIRA ---
/**
 * Calcula apenas o Signo Solar para uma data de nascimento.
 * É uma versão simplificada para uso em sinastria.
 */
function computeSunSign(birthDate) {
    const [year, month, day] = birthDate.split('-').map(Number);
    const utcDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    const julianDayUT = swisseph_1.default.swe_utc_to_jd(utcDate.getUTCFullYear(), utcDate.getUTCMonth() + 1, utcDate.getUTCDate(), 12, 0, 0, swisseph_1.default.SE_GREG_CAL).julianDayUT;
    const flag = swisseph_1.default.SEFLG_SPEED;
    const sun = swisseph_1.default.swe_calc_ut(julianDayUT, swisseph_1.default.SE_SUN, flag);
    return {
        sun: getSignFromLongitude(sun.longitude),
    };
}
