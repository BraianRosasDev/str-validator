/* ------------ VALIDATION FUNCTION ----------- */

function validation(str, filter) {
    if (filter.specialFilter) { /* For specific filters only */
        if (str.match(filter.specific)) {
            return true;
        } else {
            return false;
        };
    } else { /* For non-specific filters */
        if (str.match(filter)) {
            return true;
        } else {
            return false;
        };
    };
};

/* --------------------------------------------- */
/* ///////////////////////////////////////////// */
/* -------------- GENERATE FILTER -------------- */

function generateFilter(opts, cs, adds) {
    let filter = "";
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

module.exports = {
    
    stringValidation(str, opts, cs, adds) {
        // Generate filter
        const filter = generateFilter(opts, cs, adds);
        // Call validators
        return validation(str, filter);
    }

};

/* --------------------------------------------- */
