describe("Timeout tests", () => {
  beforeAll(async () => {
    await page.goto(PATH, { waitUntil: "load" });
    page.on("console", msg => {
      console.log(
        msg.text() + "\n" + msg.location().url + ":" + msg.location().lineNumber
      );
    });
  });

  it("Set default time test", async () => {
    jest.setTimeout(10000);
    var result = await page.evaluate(async () => {
      var success = true;
      var data = undefined;
      betterFetcher.setDefaultTimeout(10000);
      try {
        data = await betterFetcher.get("https://httpstat.us/200");
      } catch (e) {
        console.log(e);
        success = false;
      }
      if (!data) {
        success = false;
      }
      betterFetcher.setDefaultTimeout(5000);
      return Promise.resolve(success);
    });

    expect(result).toBeTruthy();
  });
});
