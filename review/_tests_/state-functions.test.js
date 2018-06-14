const puppeteer = require('puppeteer');
import {handleForwardCaretClick} from 'App.jsx';
const pageUrl = 'http://localhost:3000/';

let page;
let browser;
const width = 1280;
const height = 720;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

afterAll(() => {
  browser.close();
});

describe('search function', async () => {
  test('initial title is correct', async () => {
    const id = '#title h4';
    const title = page.$eval;
    const html = await page.$eval(id, e => e.textContent);
    expect(title[1]).toEqual(' Reviews');
  });
});


