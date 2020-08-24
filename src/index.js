/* ------------ VALIDATION FUNCTIONS ----------- */



/* --------------------------------------------- */
/* ///////////////////////////////////////////// */
/* -------------- GENERATE FILTER -------------- */

function generateFilter(opts, cs) {
    let filter = "[^";
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
        filter = filter + "\\!#$%‰&'()*+,-./:;<=>?@[]^_`{|}~¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾⅛⅜⅝⅞¿Ð×Þßæð÷þ€≠≤≥√Ω↑↓←→№↔▲►▼◄■□▪▫●○◊" + '"';
    };
    if (opts.space) { /* Space bar */
        filter = filter + " ";
    };
    if (opts.pausation) { /* Text pausations */
        filter = filter + ".,";
    };
    if (opts.paragraph) { /* Complex paragraphs */
        filter = filter + ".,-:;()/ "
    };
    if (opts.currency) { /* Currency */
        filter = filter + "£¥€¢$₩"
    }
};

/* --------------------------------------------- */
/* ///////////////////////////////////////////// */
/* ------------------ RESULTS ------------------ */

let results = {
    ok: false,
    messages: []
};

/* --------------------------------------------- */
/* ///////////////////////////////////////////// */
/* --------------- CORE FUNCTION --------------- */

function strValidate(str, opts, cs, adds) {
    // Generate filter
    const filter = generateFilter(opts, cs);
    // Call validators
    if (alphabetOnly) onlyString(str, cs, adds);
};

/* --------------------------------------------- */

/* //////// TEST ////////// */
strValidate("hola", {
    alphabet: true,
    numbers: true,
    latin: true
}, "lower");
