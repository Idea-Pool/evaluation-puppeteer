describe("TC-4 Interaction with checkbox form elements", () => {
    beforeAll(async () => {
        await page.goto("https://getbootstrap.com/docs/4.4/components/forms/#checkboxes-and-radios");
        await page.waitForSelector(".navbar-brand");
    });

    test("The default checkbox should be enabled", async () => {
        const isDisabled = await page.$eval("#defaultCheck1", box => box.disabled);
        expect(isDisabled).toBe(false);
    });
    test("The disabled checkbox should be disabled", async () => {
        const isDisabled = await page.$eval("#defaultCheck2", box => box.disabled);
        expect(isDisabled).toBe(true);
    });
    test("The default checkbox should be unchecked", async () => {
        const isChecked = await page.evaluate(() => document.querySelector("#defaultCheck1").checked);
        expect(isChecked).toBe(false);
    });
    test("When The default checkbox is clicked on, the default checkbox should be checked", async () => {
        const defaultCheckbox = await page.$("#defaultCheck1");
        await defaultCheckbox.click();
        const isChecked = await page.evaluate(() => document.querySelector("#defaultCheck1").checked);
        expect(isChecked).toBe(true);
    });
});
