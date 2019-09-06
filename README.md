# Zeplin RN-styled-components Extension

Generates React Native Styled-Components Components from colors, text styles and layers. ⚛️📱

Sample colors output:
```js
const colors = {
  APP_GRAY: "#656565",
  APP_BLACK: "#000000",
  APP_BLUE: "#035fc7",
  APP_DARK_BLUE: "#03499a",
  APP_BG_GRAY: "#f4f4f4"
};
```

Sample text style output:
```scss
const TextStyle1 = styled.Text`
    font-family: Rubik;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: right;
    color: ${colors.APP_BLACK};
`

const TextStyle2 = styled.Text`
    font-family: Rubik;
    font-size: 11.3px;
    font-weight: normal;
    font-style: normal;
    line-height: 27.6px;
    letter-spacing: 0px;
    text-align: right;
    color: ${colors.APP_GRAY};
`
```

Sample layer output:
```scss
const RectangleCopy3 = styled.View`
    width: 225.7px;
    height: 28px;
    border-radius: 19.4px;
    background-color: ${colors.APP_BLUAPP_DARK_BLUEE_LIGHT};
    border-style: solid;
    border-width: 1px;
    border-color: ${colors.APP_DARK_BLUE};
`
```

## Options

#### Color format

Supports HEX, RGB or HSL. Sample colors output as HSL:
```js
const colors = {
  red: "hsl(0, 100%, 50%)",
  black50: "hsla(0, 0%, 0%, 0.5)"
};
```

#### Dimensions

Toggles generating `width` and `height` properties from layers.

#### Default values

Toggles always generating default values from layers or text styles, such as `font-weight` and `font-style`.

## Development

the code for this extension is at my repo on [gitHub](https://github.com/mr-piratman/RN-styled-components_zeplin_ext),
you can also submit issues and ask for new featurs

RN-styled-components extension is developed using [zem](https://github.com/zeplin/zem), Zeplin Extension Manager. zem is a command line tool that lets you quickly create and test extensions.

To learn more about zem, [see documentation](https://github.com/zeplin/zem).


