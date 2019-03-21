const puppeteer = require('puppeteer');

const fetchTeams = async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.uefa.com/memberassociations/uefarankings/club/#/yr/${new Date().getFullYear()}`);

  // TODO add error handling if we could not find the right page

  await page.waitForSelector('.table--standings');

  // TODO add exit timeout or sth?

  // Extract results from the page.
  const teams = await page.evaluate(() => {
    return [
      ...document.querySelectorAll('.table--standings')[1]
          .querySelectorAll('tbody tr')
    ]
      .map(el => el.children)
      .slice(0, 128)
      .map(team => {
        const teamUrl = team[1].children[0].children[3].href;
        const clubId = /club=(\d+)/.exec(teamUrl)[1];

        return {
          ranking: +team[0].innerText,
          clubName: team[1].innerText,
          nationCode: team[2].innerText,
          clubId,
        }
      });
  });

  await browser.close();

  return teams;
};

module.exports = fetchTeams;
