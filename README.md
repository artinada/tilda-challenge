# Tilda quiz automation suite

## How to Start

Clone repository from [Github](https://github.com/artinada/tilda-challenge).

Install dependencies
```
npm  ci
```

## How to run tests on browser or mobile device


**For the running all tests perform in terminal a command:**

for chrome browser
```
npm run testcafe:chrome
```

for chrome in headless mode
```
npm run testcafe:chrome:headless
```

for mobile (iPhone)
```
npm run testcafe:iphone
```
**For the running a particular test perform in terminal a command:**

for firefox

```
npm run testcafe:firefox './tests/file.test.ts'
```

## Test reporter
Reporter is shipped with TestCafe by default. The result you can observe in the terminal after running the tests.

For headless mode: in case if any test was failed screenshots are saved in `/screenshots` folder

**Screenshots cleanup:**
```
rm -rf screenshots
```