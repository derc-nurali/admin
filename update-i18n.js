const fs = require('fs');
const { GoogleSpreadsheet } = require('google-spreadsheet');

const SHEET_ID = 1328696435;

(async () => {
  try {
    console.log('Start processing...');

    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(
      '1Fk1bDTRie-jZyMrdMDgHSA5xTHA-ZOXo-t0-brqxMbU'
    );
    doc.useApiKey('AIzaSyDbm6wK6gZcFyLSlxgLpZMETdj6uve9ay4');

    await doc.loadInfo(); // loads document properties and worksheets

    const sheet = doc.sheetsById[SHEET_ID];
    // or
    // const sheet = doc.sheetsByTitle['E-gov Web'];

    sheet.loadHeaderRow();

    // getting all rows
    const rows = await sheet.getRows();

    // getting languages from sheet.headerValues (array of keys)
    const langs = [...sheet.headerValues].filter((value) => value !== 'key');

    // init of new object with lang codes
    const result = langs.reduce((acc, curr) => ((acc[curr] = {}), acc), {});

    // filling translates in object, separated by language
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      langs.forEach((lang) => {
        result[lang][row.key] = row[lang];
      });
    }

    // create folder 'locales' if doesn't exist
    if (!fs.existsSync(`./public/locales`)) fs.mkdirSync(`./public/locales`);

    // create folder for each language if doesn't exist and create file with translates inside this folder
    langs.forEach((lang) => {
      if (!fs.existsSync(`./public/locales/${lang}`))
        fs.mkdirSync(`./public/locales/${lang}`);
      fs.writeFile(
        `./public/locales/${lang}/translation.json`,
        JSON.stringify(result[lang], null, 2),
        function (err) {
          if (err) return console.log('Error: ', err);
          console.log(`/public/locales/${lang}/translation.json - updated`);
        }
      );
    });
  } catch (error) {
    console.error(' ⚠️ ', error);
  }
})();
