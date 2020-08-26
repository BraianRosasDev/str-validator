/* ------------ VALIDATION FUNCTION ----------- */

function validation(str, regexp) {
    if (regexp.isBuiltIn) { /* For specific filters only */
        if (str.match(regexp.filter)) {
            return true;
        } else {
            return false;
        };
    } else { /* For non-specific filters */
        if (regexp.test(str)) {
            return false;
        } else {
            return true;
        };
    };
};

/* --------------------------------------------- */
/* ///////////////////////////////////////////// */
/* -------------- GENERATE FILTER -------------- */

const filters = {
    alphabet: "a-zA-Z",
    numbers: "0-9",
    latin: "áäàâãåéëèêíïìîóöòôõøúüùûçýÿñÁÄÀÂÃÅÉËÈÊÍÏÌÎÓÖÒÔÕØÚÜÙÛÇÝÑ",
    special: "~!@#$%^&*_+=`|\\\\{}[\\]:;'<>,.?\\/\"()",
    symbol: "\\\\!#$%‰&'*+,./:;<=>?@[\\]^_`{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾⅛⅜⅝⅞¿Ð×Þßæð÷þ€≠≤≥√Ω↑↓←→№↔▲►▼◄■□▪▫●○◊\"()",
    paragraph: ".,:;/ ()",
    pausation: ".,",
    currency: "£¥€¢$₩",
    space: " ",
    hyphen: "-",
    parentheses: "()",
    backslash: "\\\\"
};

const specialFilters = {
    _money: /^((£|¥|€|¢|\$|₩){1}([0-9]){1,3}(\,[0-9]{3}){1,}(\.[0-9]+){0,1})$|^((£|¥|€|¢|\$|₩){1}[0-9]+\.+[0-9]+)$|^((£|¥|€|¢|\$|₩){1}[0-9]+)$/gm,
    _formalNumbers: /^((£|¥|€|¢|\$|₩){1}([0-9]){1,3}(\,[0-9]{3}){1,}(\.[0-9]+){0,1})$|^((£|¥|€|¢|\$|₩){1}[0-9]+\.+[0-9]+)$|^((£|¥|€|¢|\$|₩){1}[0-9]+)$/gm,
    _email: /^([a-zA-Z]{1,}[a-zA-Z0-9._-]{1,}@[a-zA-Z]{1,}\.[a-z]{1,}(\.[a-z]{1,}){0,1})$/gm,
    _date: /^(([0][1-9]|[1][0-2])\/([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])\/([0-9][0-9][0-9][0-9]))$/gm,
    _dateFlex: /^(([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])\/([0][1-9]|[1][0-2])\/([0-9][0-9][0-9][0-9]))$/gm,
    _repeat: /a{3,}|b{3,}|c{3,}|d{3,}|e{3,}|f{3,}|g{3,}|h{3,}|i{3,}|j{3,}|k{3,}|l{3,}|m{3,}|n{3,}|o{3,}|p{3,}|q{3,}|r{3,}|s{3,}|t{3,}|u{3,}|v{3,}|w{3,}|x{3,}|y{3,}|z{3,}|A{3,}|B{3,}|C{3,}|D{3,}|E{3,}|F{3,}|G{3,}|H{3,}|I{3,}|J{3,}|K{3,}|L{3,}|M{3,}|N{3,}|O{3,}|P{3,}|Q{3,}|R{3,}|S{3,}|T{3,}|U{3,}|V{3,}|W{3,}|X{3,}|Y{3,}|Z{3,}|0{3,}|1{3,}|2{3,}|3{3,}|4{3,}|5{3,}|6{3,}|7{3,}|8{3,}|9{3,}/g,
    _pattern: /qwer{1,}|asd{1,}|sdfg{1,}|zxc{1,}|xyz{1,}|abc{1,}|1234{1,}|2345{1,}|3456{1,}|4567{1,}|5678{1,}|6789{1,}/g,
    _password: /^(([a-zA-Z0-9áäàâãåéëèêíïìîóöòôõøúüùûçýÿñÁÄÀÂÃÅÉËÈÊÍÏÌÎÓÖÒÔÕØÚÜÙÛÇÝÑ~!@#$%^&*_+=`|\\{}[\]():;'<>,.?/\"](?=[a-zA-Z0-9áäàâãåéëèêíïìîóöòôõøúüùûçýÿñÁÄÀÂÃÅÉËÈÊÍÏÌÎÓÖÒÔÕØÚÜÙÛÇÝÑ~!@#$%^&*_+=`|\\{}[\]():;'<>,.?/\"])){7,23}[a-zA-Z0-9áäàâãåéëèêíïìîóöòôõøúüùûçýÿñÁÄÀÂÃÅÉËÈÊÍÏÌÎÓÖÒÔÕØÚÜÙÛÇÝÑ~!@#$%^&*_+=`|\\{}[\]():;'<>,.?/\"])$/gm
};

function generateFilter(opts, cs="", adds="") {
    let noReapeat = [];
    let newFilter = "";
    let isBuiltIn = false;
    // Create filter
    for (let option in opts) {
        if ( // IF detects a custom option for filters
            opts[option] === true && 
            filters[option] && 
            noReapeat.indexOf(option) === -1
        ) {
            if (option === "alphabet") {
                noReapeat.push(option);
                if (cs === "upper") newFilter = newFilter + "A-Z";
                if (cs === "lower") newFilter = newFilter + "a-z";
                if (cs !== "lower" && cs !== "upper") newFilter = newFilter + filters[option];
            } else if (option === "latin") {
                noReapeat.push(option);
                if (cs === "upper") newFilter = newFilter + "ÁÄÀÂÃÅÉËÈÊÍÏÌÎÓÖÒÔÕØÚÜÙÛÇÝÑ";
                if (cs === "lower") newFilter = newFilter + "áäàâãåéëèêíïìîóöòôõøúüùûçýÿñ";
                if (cs !== "lower" && cs !== "upper") newFilter = newFilter + filters[option];
            } else {
                noReapeat.push(option);
                newFilter = newFilter + filters[option];
            };
        } else if ( // IF detects a built-in specific filter
            opts[option] === true &&
            specialFilters[option]
        ) {
            newFilter = specialFilters[option];
            isBuiltIn = true;
            break;
        };
    };
    // Return results
    if (isBuiltIn) {
        return { isBuiltIn, filter: newFilter };
    } else {
        return new RegExp("[^" + newFilter + adds + "]", "g");
    };
};

/* --------------------------------------------- */
/* ///////////////////////////////////////////// */
/* --------------- CORE FUNCTION --------------- */

function stringValidation(str, opts, cs, adds) {
    // Generate filter
    const filter = generateFilter(opts, cs, adds);
    // Call validators
    return validation(str, filter);
}

module.exports = stringValidation;

/* --------------------------------------------- */