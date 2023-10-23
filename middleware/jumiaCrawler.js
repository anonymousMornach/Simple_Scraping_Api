const puppeteer = require("puppeteer");

const jumiaCrawler = async (query) => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  /*   const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  }); */
  const browser = await puppeteer.launch({
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });

  // Open a new page
  const page = await browser.newPage();

  await page.goto(
    `https://archos-alice-staging.jumia.com.ng/catalog/?q=${query}`,
    {
      waitUntil: "networkidle0",
    }
  );
  await page.screenshot({ path: `screenshot.png` });

  const jumiaData = await page.evaluate(() => {
    const allProductContainer = document.querySelector(".-paxs");
    const productContainer = allProductContainer.querySelectorAll(".prd");

    const productData = [];
    productContainer.forEach((product) => {
      const productTitle = product.querySelector(".name");
      const productPrice = product.querySelector(".prc");
      const productLink = product.querySelector("a");
      const productImage = product.querySelector(".img");

      if (productTitle && productPrice && productLink && productImage) {
        const productInfo = {
          title: productTitle.textContent,
          price: productPrice.textContent,
          link: `https://archos-alice-staging.jumia.com.ng${productLink.getAttribute(
            "href"
          )}`,

          image: productImage.getAttribute("src"),
        };

        productData.push(productInfo);
      }
    });

    return productData;
  });
  return jumiaData;
};

module.exports = jumiaCrawler;
