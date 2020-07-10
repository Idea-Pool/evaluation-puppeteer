describe("TC-2 Checking search field on landing page", () => {
    beforeAll(async () => {
        await page.goto("https://angular.io");
        await page.waitForSelector(".nav-link.home > img");
    });

    test("Search input in the top navbar should be visible", async () => {
        const searchInput = await page.$(".search-container > input");
        const isVisible = await searchInput.isIntersectingViewport();
        expect(isVisible).toBe(true);
    });
    test("It should be empty", async () => {
        const searchInputValue = await page.$eval(".search-container > input", field => field.value);
        expect(searchInputValue).toBe("");
    });
    test("It should be \"Search\" as placeholder", async () => {
        const placeholder = await page.$eval(".search-container > input", field => field.placeholder);
        expect(placeholder).toBe("Search");
    });
    describe("Cheking the directive search result item", () => {
        const getSearchResultInSection = async (text, section) => {
            const resultXpath = `//div[contains(@class,"search-area")][./h3[contains(.,"${section}")]]//a[./span[contains(.,"${text}")]]`;
            const result = (await page.$x(resultXpath))[0];
            return result;
        };

        test("When \"directive\" is typed in it, \"Directive\" should be listed in the \"API\" section", async () => {
            const searchInput = await page.$(".search-container > input");
            await searchInput.type("directive");
            await page.waitForSelector(".search-area");
            const item = await getSearchResultInSection("Directive", "api");
            const isVisible = await item.isIntersectingViewport();
            expect(isVisible).toBe(true);
        });
        test("When \"Directive\" is clicked in the \"API\" section, the URL should be https://angular.io/api/core/Directive", async () => {
            const item = await getSearchResultInSection("Directive", "api");
            await item.click();
            await page.waitForSelector("h1#directive");
            expect(page.url()).toBe("https://angular.io/api/core/Directive");
        });
        test("The title on the content should be \"Directive\"", async () => {
            const title = await page.$("h1");
            const text = await (await title.getProperty("textContent")).jsonValue();
            expect(text).toContain("Directive");
        });
    });
});
