describe("TC-3 Checking form elements", () => {
    beforeAll(async () => {
        await page.goto("https://getbootstrap.com/docs/4.4/components/forms");
        await page.waitForSelector(".navbar-brand");
    });

    test("The title of the browser should be \"Forms · Bootstrap\"", async () => {
        expect((await page.title())).toBe("Forms · Bootstrap");
    });
    test("The readonly input should not be in the viewport", async () => {
        const input = await page.$("input[readonly]");
        const isInViewport = await input.isIntersectingViewport();
        expect(isInViewport).toBe(false);
    });
    test("When The readonly input is scrolled into the viewport, it should be in the viewport", async () => {
        const input = await page.$("input[readonly]");
        await input.hover();
        const isInViewport = await input.isIntersectingViewport();
        expect(isInViewport).toBe(true);
    });
});
