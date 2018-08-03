const puppeteer = require('puppeteer');

const testFile = 'file://' + __dirname + '/../../build/index.html';

async function getHtml(page) {
  return page.evaluate(() => editComponent.getHtml());
}

async function initialState(page) {
  const editableHtml = await page.$eval("#editableDiv", e=>e.innerHTML);
  expect(editableHtml).toBe("");
  const rawHtml = await page.$eval("#editableDiv", e=>e.innerHTML);
  expect(rawHtml).toBe("");
}

async function textTyped(page) {
  await page.type("#editableDiv", "Hello");
  expect(await getHtml(page)).toBe("Hello");

  await page.type("#editableDiv", ", World!");
  expect(await getHtml(page)).toBe("Hello, World!");
}

async function deleteRewrite(page) {
  // See: https://github.com/lovasoa/react-contenteditable/issues/91

  // type "a"
  await page.type("#editableDiv", "a");
  expect(await getHtml(page)).toBe("a");

  // reset
  await page.evaluate(() => editComponent.setHtml(""));
  expect(await getHtml(page)).toBe("");

  // Re-type "a"
  await page.type("#editableDiv", "a");
  expect(await getHtml(page)).toBe("a");
}

const testFuns = [
  initialState,
  textTyped,
  deleteRewrite
];

describe("react-contenteditable", async () => {
  let browser, page;
  
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });
  
  afterAll(async () => {
    browser.close();
  });

  for (let testFun of testFuns) {
    test(testFun.name, async () => {
      await page.goto(testFile);
      await page.waitForSelector('#editableDiv');
      await testFun(page);
    });
  }
}, 16000);
