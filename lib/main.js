/**
 * @Date:   2022-04-16T11:15:28-07:00
 * @Email:  qwertydraw@gmail.com
 * @Last modified time: 2022-04-16T23:10:30-07:00
 */
global.Promise = require('bluebird');
const axios = require('axios');
const cheerio = require('cheerio');

const TimbyConditionsUrl = 'https://www.timberlinelodge.com/conditions';
const OldTimbyConditionsUrl = 'https://web.archive.org/web/20210109172504/https://www.timberlinelodge.com/conditions';

const printCurrConditions = ($,  panel) => {
    console.log('Parsing current conditions...\n');

    const dateAndLastUpdated = $(panel).find('p')[0];
    console.log('  Date & last updated time: ', $(dateAndLastUpdated).text());
    const temp = $($(panel).find('dt')[0]).text();
    const weather = $($(panel).find('i.weather-icon')[0]).attr('title');
    console.log(`  Timberline is reporting: ${temp}\u00B0 & ${weather}`);
    const conditionsText = $($(panel).find('h6:contains("Today at Timberline")').parent()[0]).text();
    console.log('  Conditions being reported:\n    ', conditionsText.replace(/\s+/g,' ').trim());
}

axios.get(TimbyConditionsUrl)
    .then(res => {
        const $ = cheerio.load(res.data);
        const conditionPanels = $('div.conditions-panel');
        printCurrConditions($, conditionPanels[0]);
    });
