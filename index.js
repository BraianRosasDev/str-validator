/* ------------ VALIDATION FUNCTION ----------- */

function validation(str, regexp) {
    if (regexp.specialFilter) { /* For specific filters only */
        if (str.match(regexp.filter)) {
            return true;
        } else {
            return false;
        };
    } else { /* For non-specific filters */
        if (regexp.filter.test(str)) {
            return false;
        } else {
            return true;
        };
    };
};

/* --------------------------------------------- */
/* ///////////////////////////////////////////// */
/* -------------- GENERATE FILTER -------------- */

function generateFilter(opts, cs, adds) {
    let filter = undefined;
    let specific = undefined;
    if (opts.alphabet) { /* Alphabetic */
        if (cs === "lower") {
            filter = filter + "a-z";
        } else if (cs === "upper") {
            filter = filter + "A-Z";
        } else {
            filter = filter + "a-zA-Z";
        };
    };
    if (opts.numbers) { /* Numeric */
        filter = filter + "0-9";
    };
    if (opts.latin) { /* Latin specials */
        if (cs === "lower") {
            filter = filter + "áäàâãåéëèêíïìîóöòôõøúüùûçýÿñ";
        } else if (cs === "upper") {
            filter = filter + "ÁÄÀÂÃÅÉËÈÊÍÏÌÎÓÖÒÔÕØÚÜÙÛÇÝÑ";
        } else {
            filter = filter + "áäàâãåéëèêíïìîóöòôõøúüùûçýÿñÁÄÀÂÃÅÉËÈÊÍÏÌÎÓÖÒÔÕØÚÜÙÛÇÝÑ";
        };
    };
    if (opts.symbol) { /* Symbols */
        filter = filter + "\\!#$%‰&'*+,./:;<=>?@[\]^_`{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾⅛⅜⅝⅞¿Ð×Þßæð÷þ€≠≤≥√Ω↑↓←→№↔▲►▼◄■□▪▫●○◊\"";
    };
    if (opts.special) { /* Special characters */
        filter = filter + "~!@#$%^&*_+=`|\\{}[\]:;'<>,.?/\"";
    };
    if (opts.space) { /* Space bar */
        filter = filter + " ";
    };
    if (opts.pausation) { /* Text pausations */
        filter = filter + ".,";
    };
    if (opts.paragraph) { /* Complex paragraphs */
        filter = filter + ".,:;/ "
    };
    if (opts.currency) { /* Currency */
        filter = filter + "£¥€¢$₩"
    };
    if (opts.password) { /* Password */
        filter = filter + "a-zA-Z0-9áäàâãåéëèêíïìîóöòôõøúüùûçýÿñÁÄÀÂÃÅÉËÈÊÍÏÌÎÓÖÒÔÕØÚÜÙÛÇÝÑ~!@#$%^&*_+=`|\\{}[\]:;'<>,.?/\"";
    };
    if (opts.parentheses) {
        filter = filter + "()";
    };
    if (opts.hyphen) {
        filter = filter + "-";
    }
    /* WARNING: From this point any of this properties overrides any filter */
    if (opts.money) { // Money
        specific = /^((£|¥|€|¢|\$|₩){1}([0-9]){1,3}(\,[0-9]{3}){1,}(\.[0-9]+){0,1})$|^((£|¥|€|¢|\$|₩){1}[0-9]+\.+[0-9]+)$|^((£|¥|€|¢|\$|₩){1}[0-9]+)$/gm;
    };
    if (opts.formalNumbers) { // Formal numbers
        specific = /^(([0-9]){1,3}(\,[0-9]{3}){1,}(\.[0-9]+){0,1})$|^([0-9]+\.+[0-9]+)$|^([0-9]+)$/gm;
    };
    if (opts.email) {
        specific = /^([a-zA-Z]{1,}[a-zA-Z0-9._-]{1,}@[a-zA-Z]{1,}\.[a-z]{1,}(\.[a-z]{1,}){0,1})$/gm;
    };
    if (opts.date) {
        specific = /^(([0][1-9]|[1][0-2])\/([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])\/([0-9][0-9][0-9][0-9]))$/gm;
    };
    if (opts.dateFlex) {
        specific = /^(([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])\/([0][1-9]|[1][0-2])\/([0-9][0-9][0-9][0-9]))$/gm;
    };
    if (opts.repeat) {
        specific = /a{3,}|b{3,}|c{3,}|d{3,}|e{3,}|f{3,}|g{3,}|h{3,}|i{3,}|j{3,}|k{3,}|l{3,}|m{3,}|n{3,}|o{3,}|p{3,}|q{3,}|r{3,}|s{3,}|t{3,}|u{3,}|v{3,}|w{3,}|x{3,}|y{3,}|z{3,}|A{3,}|B{3,}|C{3,}|D{3,}|E{3,}|F{3,}|G{3,}|H{3,}|I{3,}|J{3,}|K{3,}|L{3,}|M{3,}|N{3,}|O{3,}|P{3,}|Q{3,}|R{3,}|S{3,}|T{3,}|U{3,}|V{3,}|W{3,}|X{3,}|Y{3,}|Z{3,}|0{3,}|1{3,}|2{3,}|3{3,}|4{3,}|5{3,}|6{3,}|7{3,}|8{3,}|9{3,}/g
    };
    if (opts.pattern) {
        specific = /qwer{1,}|asd{1,}|sdfg{1,}|zxc{1,}|xyz{1,}|abc{1,}|1234{1,}|2345{1,}|3456{1,}|4567{1,}|5678{1,}|6789{1,}/g;
    }
    /* Return filter */
    if (specific) {
        return { 
            filter: specific, 
            specialFilter: true 
        };
    } else {
        return { 
            filter: new RegExp("[^" + filter + adds + "]", "g"),
            specialFilter: false
        };
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