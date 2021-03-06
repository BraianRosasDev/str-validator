# String Validation Documentation

This is a small module for string validation, can be used to validate inputs from a form or any other situation that requires a string validation.

**IMPORTANT:** This package is in a early versions and have no enough testing for production projects. If you find a bug or issue please report it or send a email to: **braianrosas.dev@outlook.com**.

## Quick Start

Start installing the package to your project:
```
npm i @axisdev/string-validation
```

Then import it:
```javascript
const strValidation = require("@axisdev/string-validation");
```

Now all you need to do is pass in the string with the validation options.
Quick sample:
```javascript
const string = "this is my awesome string";

const validate = strValidation(string, {alphabet: true, space: true}, "lower");

console.log(validate) // Prints { ok: true, message: "success" }
```
## How To Use

Validator function has a simple logic, you pass in a string, then define te validation conditionals in an object, define if you want it lower or upper case, choose a min and max length and add additional digits to the validation if required.

If the validator find a non-specified character from the options or don't meet the length requeriments, then will return an object with `{ ok: false, message: "some message here" }`, else if the string meet the requirements, then it will return `{ ok: true, message: "success" }`.

#### Validate username example:
```javascript
// Validate the string "AwesomeUsername445"
const username = "AwesomeUsername445";

const validation = strValidation(username, {
	alphabet: true, // Allow a-z digits
	numbers: true // Allow 0-9 digits
}); // Return { ok: true, message: "success" }

if (validation.ok) {
	// Send to the server/database
} else {
	// Tells the user what he did wrong
};
```
#### Validate spanish paragraph
```javascript
const text = `Todavía tengo casi todos mis dientes,
	casi todos mis cabellos y poquísimas canas,
	puedo hacer y deshacer el amor,
	trepar una escalera de dos en dos
	y correr cuarenta metros detrás del ómnibus,
	o sea que no debería sentirme viejo
	pero el grave problema es que antes
	no me fijaba en estos detalles.`;

const validation = strValidation(text, {
	alphabet: true, // Allow a-z digits
	pausation: true, // Allow . and , digits
	space: true, // Allow spaces " ".
	latin: true // Allow accent marks (e.g: áëîòçñ...)
}); // Return { ok: true, message: "success" }
```
#### Validate uppercase text
```javascript
const upperText = "IFTHISISNOTUPPERCASETHENIDONTKNOWWHATITIS";

const validation = strValidation(upperText, {
	alphabet: true, // Allow a-z digits
}, "upper" // Text must be in upper case
); // Return { ok: true, message: "success" }
```
#### Validate... this?
```javascript
const lowerText = "áll 1 kn0w 1s thát th1s 1s l0wêr cásê ánd müst rêtürn trüê, ok?";

const options = {
	alphabet: true,
	numbers: true,
	latin: true,
	pausation: true,
	space: true
};

const validation = strValidation(lowerText, options, "lower", "?"); // Return { ok: true, message: "success" }
```
## Validator Parameters

String validator function accepts a maximum of four (4) parameters in the next order and type:

```javascript
strValidation(string, options, caseSensitive, lengthRange, additionals);
```

1. `string` is the string to validate.
2. `options` is a object with the options you need to pass in to validate.
3. `caseSensitive` is a string to define if you want to be case sensitive or no.
4. `lengthRange` is a object with that define min length and max length allowed.
5. `additionals` is a string where you define additional characters that you want to appear in the string.

## Options

The `options` parameter is a object with the options you want to include in your validation, all key values are boolean `true` or `false`.

#### List of accepted options and what they do:
* `alphabet`: Tells the validator to accept english alphabet characters (from **a** to **z**).

* `numbers`: Tells the validator to accept numbers in string format (from **0** to **9**).

* `latin`: Tells the validator to accept accent marks from any other latin-based language. Accepted values are **áäàâãåéëèêíïìîóöòôõøúüùûçýÿñ** for lower case and **ÁÄÀÂÃÅÉËÈÊÍÏÌÎÓÖÒÔÕØÚÜÙÛÇÝÑ** for upper case.

* `special`: Tells the validator to accept base 10 non-alphabetical digits (**~!@#$%^&*_+=|{}[]():;'<>,.?/\"`**).

* `symbol`: Tells the validator to accept any symbol of the nex symbols:  **!#$%‰&'*+,.\/:;<=>?@[]^_`{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾⅛⅜⅝⅞¿Ð×Þßæð÷þ€≠≤≥√Ω↑↓←→№↔▲►▼◄■□▪▫●○◊()"**.

* `paragraph`: Tells the validator to accept normal paragraph punctutions (**.,:;/ ()**), include blank spaces.

* `pausation`: Tells the validator to accept dots and commas (**,.**).

* `currency`: Tells the validator to accept these currency symbols: **£¥€¢$₩**.

* `space`: Tells the validator to accept blank spaces.

* `hyphen`: Tells the validator to accept hyphens.

* `parentheses`: Tells the validator to accept parentheses.

* `backslash`: Tells the validator to accept backslashes.

### Special options:

**IMPORTANT: These options overrides any of the above including themselves so they should be used one at time**

* `_money`: Tells the validator to accept **only** numbers in currency format, e.g: **$10000**, **$10000.99**, **$10,000.90**. Accepts any of the currency symbols listed in the `currency` option.
	```javascript
    strValidation("€55,030,122.8092", {money: true}); // Return { ok: true, message: "success" }
    
	strValidation("€4444,333,22,1.0", {money: true}); // Return { ok: false, message: "bad format" }
	```

* `_formalNumbers`: Same as `money` but excluding currency symbol.

* `_email`: Tells the validator to accept **only** email format, e.g: **string_validator123@email.com.ok**. Rules are: 
	1. First character must be a **letter**, upper or lowercase.
	2. The body can be any **letter, number** or **.-_**, but at least 1 digit length after rule 1.
	3. Must have only one **@** after rule 2.
	4. Must have at least one **letter** after 3.
	5. Must have only one **dot** after rule 4.
	6. Must have at least one **letter** after rule 5.
	7. OPTIONAL: Must have only one **dot** and at least one **letter** after rule 6.
	
	A raw translation of the rules could be: **a_@x.y.z**

	```javascript
	strValidation("normal_email123@wow.com", {_email: true}); // Return { ok: true, message: "success" }
	
    strValidation(".baddot@email.com", {_email: true}); // Return { ok: false, message: "bad format" }
    
    strValidation("a@badlenght.com.", {_email: true}); // Return { ok: false, message: "bad format" }
    
	strValidation("badtermination@email.", {_email: true}); // Return { ok: false, message: "bad format" }
	```

* `_password`: Tells the validator to check if the string follow these rules:
	* Must have only alphabetical digits (**a-z** or **A-Z**), numerical digits (**0-9**), base 10 non-alphabetical digits (**~!@#$%^&*_+=`|{}[]():;'<>,.?/\"]**) or accent marks (**áäàâãåéëèêíïìîóöòôõøúüùûçýÿñÁÄÀÂÃÅÉËÈÊÍÏÌÎÓÖÒÔÕØÚÜÙÛÇÝÑ**).
	* Must have at least **2** min. digits length.

* `_date`: Tells the validator to accept date string in **mm/dd/yyyy** format following these rules:
    * Month can't be **00** or greater than **12**.
    * Day cant't be **00** or greater than **31**.
    * Year must be **4 digits length**, this includes numbers from **0000** to **9999**.

* `_dateFlex`: Same as `date` but in **dd/mm/yyyy**.

* `_repeat`: Tells the validator to check if there is any alphabetical (a-z, A-Z) or numerical (0-9) digit repeated **3** or **more** times.

* `_pattern`: Tells the validator to check if there is any of these common predictable patterns inside the string: **qwer**, **asd**, **sdfg**, **zxc**, **xyz**, **abc**, **1234**, **2345**, **3456**, **4567**, **5678**, **6789**.

## Case Sensitive

`caseSensitive` parameter is a string that accepts only two (2) values:
* `"upper"`
* `"lower"`

Any other string, `undefined` or `null` values will made no effect and the validator will choose the default option that is upper and lower together.

* The `"upper"` string tells the validator to accept only a string in upper case format, e.g: 
```javascript
strValidation("UPPERCASE", {alphabet: true}, "upper"); // Return { ok: true, message: "success" }

strValidation("UpperCase", {alphabet: true}, "upper"); // Return { ok: false, message: "bad digit" }

strValidation("uppercase", {alphabet: true}, "upper"); // Return { ok: false, message: "bad digit" }
```

* The `"lower"` string tells the validator to accept only a string in lower case format e.g:
```javascript
strValidation("lowercase", {alphabet: true}, "lower"); // Return { ok: true, message: "success" }

strValidation("LowerCase", {alphabet: true}, "lower"); // Return { ok: false, message: "bad digit" }

strValidation("LOWERCASE", {alphabet: true}, "lower"); // Return { ok: false, message: "bad digit" }
```

* If you do not specify any of the above rules, the default option is accept both lower and upper case strings, e.g:
```javascript
strValidation("UPPERCASE", {alphabet: true}); // Return { ok: true, message: "success" }

strValidation("lowercase", {alphabet: true}, null); // Return { ok: true, message: "success" }

strValidation("UPPERlower", {alphabet: true}, "yarr!"); // Return { ok: true, message: "success" }
```
**NOTE:** This parameter only affect `alphabet` and `latin` options.

## Lenght Range

`lengthRange` parameter is a object that accepts two (2) values, `min: Integer` and `max: Integer`.
You can define both, or only one of them with your own specifications or pass in `null` to let defaults.

Default values are:

* `min: 0`
* `max: 50000000`

Application:

```javascript
// Validate a password with 8 min digits and 24 max digits

const myPassword = "secret99" // 7 digits length
const myPasswordTwo = "secret123" // 8 digits length
const myPasswordThree = "thisisaverylargepasswordwoah!" // 29 digits length

strValidation(myPassword, {_password: true}, null, {min: 8, max: 24});
// Return { ok: false, message: "bad length" }

strValidation(myPasswordTwo, {_password: true}, null, {min: 8, max: 24});
// Return { ok: true, message: "success" }

strValidation(myPasswordThree, {_password: true}, null, {min: 8, max: 24});
// Return { ok: false, message: "bad length" }
```

```javascript
// Validate a string with max 30 digits length

const myString = "abcdefghijklmnopqrstuvwxyz" // 26
const myStringTwo = "Roses are red, violets are blue." // 32

strValidation(myString, {alphabet: true}, null, {max: 30});
// Return { ok: true, message: "success" }

strValidation(myStringTwo, {alphabet: true, paragraph: true}, null, {max: 30});
// Return { ok: false, message: "bad length" }
```

## Additionals Parameter

The `additionals` parameter is a optional string that tells the validator wich extra digits can accept in it's validation, e.g:
```javascript
// This will return { ok: false, ...} because we don't specify "!" as accepted digit.
strValidation("Validate this !!!", {
	alphabet: true, 
	space: true
}, null);

// This will return { ok: true, ...} because we specify "!" as accepted digit.
strValidation("Validate this !!!", {
	alphabet: true, 
	space: true
}, null, "!");

// Also this too
strValidation("V@l1d@t3 th1s !?!", {
	alphabet: true, 
	space: true
}, null, "@13!?");

// And this
strValidation("V@l1d@t3 th1s !?!", {
	alphabet: true, 
	space: true,
	numbers: true,
}, null, "@!?");

// Of course you can do this aswell
strValidation("V@l1d@t3 th1s !?!", {
	alphabet: true, 
	space: true,
	numbers: true,
	special: true,
});
```

#### IMPORTANT

**Next digits must be placed with the following format if you want to avoid fake validations.**

* **"]"** - Must be typed `"\\]"`.
* **"\"** - Must be typed `"\\\\"`.
* **"-"** - Must be typed `"\\-"`.

## Validator Return Format

The validator function will always respond with an object with the next format:

* `ok: Boolean`
* `message: String`

If the validation was successful, will always respond:

* `ok: true`
* `message: "success"`

If the validation failed:

* `ok: false`
* `message:`
	* `"bad length"` if don't meet length requirements.
	* `"bad digit"` if there is a non-allowed digit.
	* `"bad format"` if the string format don't meet **special options** requirements.