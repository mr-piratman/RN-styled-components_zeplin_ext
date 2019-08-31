function lowercaseFirst(s) {
    return s.charAt(0).toLowerCase() + s.substring(1);
}

function uppercaseFirst(s) {
    return s.charAt(0).toUpperCase() + s.substring(1);
}

function joinTokens(components) {
    var name = components.map(uppercaseFirst).join("");
    return lowercaseFirst(name);
}

function tokensForString(str) {
    var tokenizer = /\d+|[a-z]+|[A-Z]+(?![a-z])|[A-Z][a-z]+/g;

    var matchResult = str.match(tokenizer);
    if (!matchResult) {
        return ["invalid", "name"];
    }

    return matchResult.map(function (token) {
        return jsUcfirst(token.toLowerCase());
    });
}

export function generateName(name) {
    return jsUcfirst(joinTokens(tokensForString(name)));
}

export function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}