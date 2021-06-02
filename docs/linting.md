We use eslint with airbnb rules for coding standart.

To install eslint with airbnb style, run npm install which will install all required modules from dev dependencies, than run the following command and ansewr accordingly:

```sh
./node_modules/.bin/eslint --init
	>To check syntax, find problems, and enforce code style
	>JavaScript modules (import/export)
	>React
	>Does your project use TypeScript? › No / Yes
	>Browser
	>Use a popular style guide
	>Airbnb: https://github.com/airbnb/javascript
	>JSON
	>Install dependencies Yes

```

if using prettier extension:
```sh
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

On import/required part of everyfile we start with module imports than inter-project imports. When listing inter-project imports we group them logically.


We have some modifications to airbnb rules which are in eslintrc file:


Foloowing values are not in component level, but the eslint thinks they are so
```json
      "react/prop-types": [
            "error",
            {
                "ignore": [
                    "focused",
                    "route",
                    "navigation",
                    "style"

                ]
            }
        ],
```
Packages like @expo/vector-icons are loadded with other packages and don't/shouldn't be on package.json, following turns of the error caused in this case

```json
        "import/no-extraneous-dependencies": "off",
```