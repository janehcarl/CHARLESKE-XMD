const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkp4bXIvVTIraHVOMnlMZlYrRUFTVmRYSTNZRGxkeFlyQXpWUFl6dHMxUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRW8wRGhGR0N5anc1MXhsWmt0RHVHVGorL3RmM0tjVjZ0YzlXTDZwSHRRTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzS1I2ejNnZGxVRWtDK001eU8yRTdEVkxUZklyczBCL3FzVUYyL3kwMGx3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0K0lndnFHVjNma3EzOEFPa25QTkNxQVVxMVVhWGNXUWlpVy85aWE4UkFFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZIT2hxbXFUR2NOL01JaHRRa1lOKzdEWVFYUytvQlZkU1MyQjJZRTZWRkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik41OUU3TkdKL1phdnJUOE9OTXZJcSs1eEQzdVEzMkRacTlCaTliRUp1eUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU56SURCVldUWHIreHVLZzY4dkJrcit1anduUWhIVkVKOTk2cndUWjFVZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNndKbm1MYU9RcE14RmlSakZ0MVdoQWZlalhvZlowQm4xcnRpMWQwRFFtWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZady9Xd0M4QmZGa2ZUUG5zRDlFcGhGMksxb3VpS1dXd0xSQ0hRS0pyRUFCUnB0U3ZFNit6TThIaEc2czFDb2wrTTZjdC9jV2NFMXIyT25qN3Z6SEFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODMsImFkdlNlY3JldEtleSI6ImhRaXBTcUUvRG9hbzZHV0N3Uy8zeHM0YUh1VnhOOVUzbm1WVEhOMjJPQmc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0Nzk0Mzc5NDk5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjJCQkU1RDE4NDc0NUVCM0VEQUIwOTk1OTBENEUxOEQwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDg2MTMwNDR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc5NDM3OTQ5OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCNDE1NkU3NTQ3NkE1ODdFMDQ3MEQ2NzM3N0IxRjgwMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ4NjEzMDQ2fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3OTQzNzk0OTlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTUzODhCNjhFQkM3MDlDRTQzNDU4OEM0MjQ1MkQwMzkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0ODYxMzA3MX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiMTIzTE9UVVMiLCJtZSI6eyJpZCI6IjI1NDc5NDM3OTQ5OToyQHMud2hhdHNhcHAubmV0IiwibGlkIjoiOTk1Mjc2OTY2MDk1MzI6MkBsaWQiLCJuYW1lIjoiS2FsaXBzbyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTDdWbDRVR0VKcnY1c0VHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidFJwWXNWcFRZMDJZSFBNUVcxMU42VVdzRldWU2lqaVJobnAvS0syTVlDRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiaWhwZVlkZHhEZnpheHNBYTBSTzB0U3BWUmszOTFGeG5Jb0ZISXc4ZWltQStJT2U5ZTArenZSeFg3dGZaV2JSaXgwWmQyS3JCMVpHSWZpblVTUzBIQkE9PSIsImRldmljZVNpZ25hdHVyZSI6IlliYmdRc3RIV1haZmQzRUN0RjRZcjdtaklKcE1KRVl0OWoxMlR0UFV6RHZpRnhoeU9NL0ZKVGU1em1YS2pQY0FxZ0Z0bHB5VHIyQWtJc2xKZXNPWURnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0Nzk0Mzc5NDk5OjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYlVhV0xGYVUyTk5tQnp6RUZ0ZFRlbEZyQlZsVW9vNGtZWjZmeWl0akdBaCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ4NjEzMDMyLCJsYXN0UHJvcEhhc2giOiIxSzRoSDQiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1HMCJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®Charleske",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254759626063",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/533oqh.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
