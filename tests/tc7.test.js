describe("TC-7 Checking select form elements", () => {
    beforeAll(async () => {
        await page.goto("https://getbootstrap.com/docs/4.4/components/forms/#form-controls");
        await page.waitForSelector(".navbar-brand");
    });

    const getOptions = () => {
        return page.$$eval(
            "#exampleFormControlSelect1 option",
            options => options.map(option => option.textContent,
            ));
    };

    test("The example select should be visible", async () => {
        const dropdown = await page.$("#exampleFormControlSelect1");
        const isVisible = await dropdown.isIntersectingViewport();
        expect(isVisible).toBe(true);
    });
    test("The example multiple select should be a multiple select", async () => {
        const isMultiple = await page.$eval("#exampleFormControlSelect2", button => button.multiple);
        expect(isMultiple).toBe(true);
    });
    test("The selected option in example select should be \"1\"", async () => {
        const selectedOption = await page.$eval("#exampleFormControlSelect1", selected => selected.value);
        expect(selectedOption).toEqual("1");
    });
    test("There should not be option like \"hello\" in example select", async () => {
        expect(await getOptions()).not.toContain("hello");
    });
    test("There should be option like \"2\" in example select", async () => {
        expect(await getOptions()).toContain("2");
    });
    test("When The option \"2\" is selected in example select, the selected option in example select should be \"2\"", async () => {
        const dropdown = await page.$("#exampleFormControlSelect1");
        await dropdown.select("2");
        const selectedOption = await page.$eval("#exampleFormControlSelect1", selected => selected.value);
        expect(selectedOption).toEqual("2");
    });
    test("The number of options in example select should be 5", async () => {
        const options = await page.$$("#exampleFormControlSelect1 option");
        expect(options.length).toBe(5);
    });
});
