describe("TC-1 Checking landing pages elements", () => {
    beforeAll(async () => {
        await page.goto("https://angular.io");
        await page.waitForSelector(".nav-link.home > img");
    });
    test("Angular logo in the top navbar should be visible", async () => {
        const logo = await page.$(".nav-link.home > img");
        const isVisible = await logo.isIntersectingViewport();
        expect(isVisible).toBe(true);
    });
    test("Angular logo in the hero section should be visible", async () => {
        const logo = await page.$(".hero-logo > img");
        const isVisible = await logo.isIntersectingViewport();
        expect(isVisible).toBe(true);
    });
    test("Text in hero section should be \"One framework. Mobile & desktop.\"", async () => {
        const heroSection = await page.$(".hero-headline");
        const text = await (await heroSection.getProperty("textContent")).jsonValue();
        expect(text).toBe("One framework.Mobile & desktop.");
    });
    test("Get started button should be visible in the hero section", async () => {
        const button = await page.$(".button.hero-cta");
        const isVisible = await button.isIntersectingViewport();
        expect(isVisible).toBe(true);
    });
    test("When Get started button is clicked in the hero section, the URL should be https://angular.io/docs", async () => {
        const button = await page.$(".button.hero-cta");
        await button.click();
        await page.waitForSelector(".nav-link.home > img");
        expect(page.url()).toBe("https://angular.io/docs");
    });
});
