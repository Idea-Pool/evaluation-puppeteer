describe("TC-5 Interaction with radio form elements", () => {
    beforeAll(async () => {
        await page.goto("https://getbootstrap.com/docs/4.4/components/forms/#checkboxes-and-radios");
        await page.waitForSelector(".navbar-brand");
    });

    test("The default radio should be enabled", async () => {
        const isDisabled = await page.$eval("#exampleRadios1", radio => radio.disabled);
        expect(isDisabled).toBe(false);
    });
    test("The disabled radio should be disabled", async () => {
        const isDisabled = await page.$eval("#exampleRadios3", radio => radio.disabled);
        expect(isDisabled).toBe(true);
    });
    test("The default radio should be selected", async () => {
        const isSelected = await page.$eval("#exampleRadios1", radio => radio.checked);
        expect(isSelected).toBe(true);
    });
    test("The second default radio should not be selected", async () => {
        const isSelected = await page.$eval("#exampleRadios2", radio => radio.checked);
        expect(isSelected).toBe(false);
    });
    test("When the second default radio is clicked on, the default radio should be not selected", async () => {
        const secondDefault = await page.$("#exampleRadios2");
        await secondDefault.click();
        const isSelected = await page.$eval("#exampleRadios1", radio => radio.checked);
        expect(isSelected).toBe(false);
    });
    test("The second default radio should be selected", async () => {
        const isSelected = await page.$eval("#exampleRadios2", radio => radio.checked);
        expect(isSelected).toBe(true);
    });
});
