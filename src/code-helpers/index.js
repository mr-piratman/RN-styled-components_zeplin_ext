import {
    generateLayerStyleObject,
    generateStyleguideTextStylesObject
} from "./style-object-helpers";
import {
    generateName,
    getColorMapByFormat,
    getColorStringByFormat,
    getResources
} from "../utils";

import { REACT_RULES_WITH_COLOR, JSON_SPACING } from "../constants";

function generateReactRule(styleObj, containerColorMap, mixin) {
    var selector = styleObj.selector;
    delete styleObj.selector;

    Object.keys(styleObj).forEach(function (prop) {
        if (prop === "mixinEntry") {
            return;
        }

        if (REACT_RULES_WITH_COLOR.includes(prop) && styleObj[prop] in containerColorMap) {
            styleObj[prop] = `colors.${containerColorMap[styleObj[prop]]}`;
        }
    });

    var selectorName = generateName(selector);
    console.log(styleObj)
    var styleObjText = objStyleToCss(styleObj)  //JSON.stringify(styleObj, null, JSON_SPACING)
        // .replace(/"(.+)":/g, "$1:")
        .replace( /([0-9]*\.?[0-9])+(;)?/g, "$1px;")
        .replace(/: colors\.(.*);/g, ": ${colors.$1};");

    return `const ${selectorName} = styled.View\`${styleObjText}\``;
}

function getStyleguideColorTexts(colorFormat, colors) {
    return colors.map(color => {
        var colorStyleObject = getColorStringByFormat(
            color,
            colorFormat
        );
        return `  ${color.name}: "${colorStyleObject}"`;
    });
}

function getStyleguideColorsCode(options, colors) {
    var { colorFormat } = options;
    var styleguideColorTexts = getStyleguideColorTexts(colorFormat, colors);
    return `const colors = {\n${styleguideColorTexts.join(",\n")}\n};`;
}

function getStyleguideTextStylesCode(options, containerAndType, textStyles) {
    var textStylesObj = generateStyleguideTextStylesObject(options, containerAndType, textStyles);

    var textStylesStr = objStyleToCss(textStylesObj)
    var processedTextStyles = textStylesStr.replace(/"(.+)":/g, "$1:").replace(/: "colors\.(.*)"/g, ": ${colors.$1}");
    return `const textStyles = styled.Text\`${processedTextStyles}\``;

    // var textStylesStr = JSON.stringify(textStylesObj, null, JSON_SPACING);
    // var processedTextStyles = textStylesStr.replace(/"(.+)":/g, "$1:").replace(/: "colors\.(.*)"/g, ": colors.$1");

    // return `const textStyles = StyleSheet.create(${processedTextStyles});`;
}

function getLayerCode(containerAndType, layer, options) {
    var { container, type } = containerAndType;
    var { useLinkedStyleguides, showDimensions, colorFormat, defaultValues } = options;

    var layerStyleRule = generateLayerStyleObject({
        layer,
        platform: container.type,
        densityDivisor: container.densityDivisor,
        showDimensions,
        colorFormat,
        defaultValues
    });

    var cssObjects = [];

    if (Object.keys(layerStyleRule).length > 1) {
        cssObjects.unshift(layerStyleRule);
    }
    var containerColors = getResources(container, type, useLinkedStyleguides, "colors");
    return cssObjects.map(cssObj =>
        generateReactRule(
            cssObj,
            getColorMapByFormat(containerColors, options.colorFormat)
        )
    ).join("\n\n");
}

function objStyleToCss(style) { 
    let str = Object.entries(style).reduce((styleString, [propName, propValue]) => {
    return `${styleString}\n    ${propName.replace(/([A-Z])/g, matches => `-${matches[0].toLowerCase()}`)}: ${propValue};`;
  }, '') + "\n"
  return str;
}

export {
    getStyleguideColorsCode,
    getStyleguideTextStylesCode,
    getLayerCode
};
