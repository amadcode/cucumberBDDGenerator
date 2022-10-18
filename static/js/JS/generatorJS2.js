let featureStepsJS = document.querySelector("#featureStepsJS")
let stepDefinitionJS = document.querySelector("#stepDefinitionJS")
let coreComponentJS = document.querySelector("#coreComponentJS")
let classReferenceJavaScript = document.querySelector("#classReferenceJavaScript")
let DYNAMIC_VALUE_JAVASCRIPT = 0
// let openingBracket = "(";
let sc_doubleColons = "\"";
let sc_comma = ",";
let sc_openingBracket = "(";
let sc_closingBracket = ")";
let sc_space = " ";
let sc_equalSign = "=";
let sc_greaterThanSign = ">";
let sc_openingCurlyParenthesis = "{";
let sc_closingCurlyParenthesis = "}";
let dynamicValJS = "args";
let arrayForInnerMethod = "";
let GLOBAL_ARRAY = "";
let GLOBAL_ARRAY_ForSection2JS = "";
let dynamicValueJS = "args";
let dynamicValueJS_ = "_args_";
let CAMEL_CASED_STEP = "";
let string = "{string}"
let arrayValueAtIndex = ""
let static_keyword = "static "


if (localStorage.getItem("classReferenceJavaScript") == "") {
    classReferenceJavaScript.value = localStorage.setItem("classReferenceJavaScript", "// ")
} else {
    classReferenceJavaScript.value = localStorage.getItem("classReferenceJavaScript")
}

if (localStorage.getItem("featureStepsJS") == "") {
    featureStepsJS.value = ""
} else {
    featureStepsJS.value = JSON.parse(localStorage.getItem("featureStepsJS"))
}

featureStepsJS.addEventListener("keyup", event => {
    localStorage.setItem("featureStepsJS", event.target.value)
    stepDefinitionJS.value = section1JS()
    coreComponentJS.value = section3JS()
});

classReferenceJavaScript.addEventListener("keyup", event => {
    localStorage.setItem("classReferenceJavaScript", event.target.value)
    writeImplementationHere.value = localStorage.getItem("classReferenceJavaScript")
})

function section1JS() {
    let array = localStorage.getItem("featureStepsJS")
                .trim()
                .replace("/", "")
                .replace("-", "")
                .split('\n')

    // console.log(`complete array: ${array}`)

    for (let i = 0; i < array.length; i++) {
        let toCalDV = array[i]
        arrayValueAtIndex = toCalDV
        console.log(`array${[i]}: ${array[i]}`)
        console.log(`toCalDV${[i]}: ${toCalDV}`)
        console.log(`toCalDV.length: ${array[i].length}`)

        let noOfDynamicValues = 0
        for (let i = 0; i < toCalDV.length; i++) {
             console.log(`for loop toCalDV${[i]}: ${toCalDV[i]}`)
            if ((toCalDV[i] == '\"') || (toCalDV[i] == '\'')) {
                noOfDynamicValues = noOfDynamicValues + 1
                DYNAMIC_VALUE_JAVASCRIPT = noOfDynamicValues
                console.log(`inside for loop array${[i]}: ${array[i]}`)

            } else {
                DYNAMIC_VALUE_JAVASCRIPT = 0
            }
        }

        console.log(`DYNAMIC_VALUE_JAVASCRIPT after comparison: ${DYNAMIC_VALUE_JAVASCRIPT}`)

        const keyword = array[i].trimStart().split(/\s+/);
        const step = [keyword.shift().trimStart(), keyword.join(' ')];
        let stepWithoutSpecialChars = step[1].trimStart()
        stepWithoutSpecialChars = step[1]
                                        .trimStart()
                                        .replace(/'([^']+)'/g, string)
                                        .replace(/"([^"]+)"/g, string);

        const stepWithoutSpecialCharsForSection2JS = step[1]
                                        .trimStart()
                                        .replace(/'([^']+)'/g, '(.+)')
                                        .replace(/"([^"]+)"/g, '\\"(.*?)\\"');


        GLOBAL_ARRAY = stepWithoutSpecialChars
        GLOBAL_ARRAY_ForSection2JS = stepWithoutSpecialCharsForSection2JS
        CAMEL_CASED_STEP = camelize(stepWithoutSpecialChars)

        let arguments = generateArgumentsJS(DYNAMIC_VALUE_JAVASCRIPT)
        array[i] =
                step[0].trimStart()
                + openingBracket
                + sc_doubleColons
                + stepWithoutSpecialChars
                + sc_doubleColons
                + sc_comma
                + sc_openingBracket
                + arguments
                + sc_closingBracket + sc_space
                + sc_equalSign + sc_greaterThanSign
                + sc_openingCurlyParenthesis + sc_space
                + "\n\t"
                + classReferenceJavaScript.value
                // + section2JS()
                + section2JS()
                + "\n"
                + sc_closingCurlyParenthesis + sc_closingBracket
                + "\n"
        }
    return array.join("\n")
}

function section2JS() {
    arrayForInnerMethod = GLOBAL_ARRAY_ForSection2JS.trimStart()
    console.log(`section2JS arrayForInnerMethod: ${arrayForInnerMethod}`)
    let val = camelize(arrayForInnerMethod);
    for (let i = 0; i < val.length; i++) {
    val = val.replaceAll(" ", "")
                                                .replace('(.+)', dynamicValueJS_)
                                                .replace('\\"(.*?)\\"', dynamicValueJS_)
    }

    DYNAMIC_VALUE_JAVASCRIPT = 0
    let noOfDynamicValues = 0
    for (let i = 0; i < GLOBAL_ARRAY_ForSection2JS.length; i++) {
        // if (array[i] == "{") {
        if ((arrayForInnerMethod[i] == '\"') || (arrayForInnerMethod[i] == '\'')) {
            noOfDynamicValues = noOfDynamicValues + 1
            DYNAMIC_VALUE_JAVASCRIPT = noOfDynamicValues
        } else {
            DYNAMIC_VALUE_JAVASCRIPT = 0
        }
    }
    let arguments = generateArgumentsJS(DYNAMIC_VALUE_JAVASCRIPT)
    arrayForInnerMethod = val + sc_openingBracket + arguments + sc_closingBracket
    return arrayForInnerMethod
}

function section3JS() {
    let array = localStorage.getItem("featureStepsJS")
                .trim()
                .replace("/", "")
                .replace("-", "")
                .split('\n')
    for (let i = 0; i < array.length; i++) {
        let toCalDV = array[i]
        arrayValueAtIndex = toCalDV
        console.log(`array${[i]}: ${array[i]}`)
        console.log(`toCalDV${[i]}: ${toCalDV}`)
        console.log(`toCalDV.length: ${array[i].length}`)
        let noOfDynamicValues = 0
        for (let i = 0; i < toCalDV.length; i++) {
             console.log(`for loop toCalDV${[i]}: ${toCalDV[i]}`)
            if ((toCalDV[i] == '\"') || (toCalDV[i] == '\'')) {
                noOfDynamicValues = noOfDynamicValues + 1
                DYNAMIC_VALUE_JAVASCRIPT = noOfDynamicValues
                console.log(`inside for loop array${[i]}: ${array[i]}`)
            } else {
                DYNAMIC_VALUE_JAVASCRIPT = 0
            }
        }

    console.log(`DYNAMIC_VALUE_JAVASCRIPT section3JS: ${DYNAMIC_VALUE_JAVASCRIPT}`)
        const keyword = array[i].trimStart().split(/\s+/);
        const step = [keyword.shift(), keyword.join(' ')];
        step[1] = camelize(step[1])
        const stepWithoutSpecialChars =     step[1].trimStart().replaceAll(" ", "")
                                                .replace('(.+)', dynamicValueJS_)
                                                .replace('\\"(.*?)\\"', dynamicValueJS_)
                                                .replace(/'([^']+)'/g, dynamicValueJS_)
                                                .replace(/"([^"]+)"/g, dynamicValueJS_);
        GLOBAL_ARRAY = stepWithoutSpecialChars;
        CAMEL_CASED_STEP = camelize(GLOBAL_ARRAY)
        array[i] =
                static_keyword
                + CAMEL_CASED_STEP
                + sc_openingBracket
                + generateArgumentsJS(DYNAMIC_VALUE_JAVASCRIPT)
                + sc_closingBracket + sc_space
                + sc_openingCurlyParenthesis + sc_space
                + "\n"
                + "\t" + writeImplementationHere
                + "\n"
                + sc_closingCurlyParenthesis
                + "\n"
        }
    return array.join("\n")
}

function generateArgumentsJS(DYNAMIC_VALUE_JAVASCRIPT) {
    let string = ""
    let noValue = ""
    if (DYNAMIC_VALUE_JAVASCRIPT === 0) {
        string = noValue
    } else if (DYNAMIC_VALUE_JAVASCRIPT === 2) {
        DYNAMIC_VALUE_JAVASCRIPT = 1;
        for (let i = 1; i <= DYNAMIC_VALUE_JAVASCRIPT; i++) {
            if (i == DYNAMIC_VALUE_JAVASCRIPT) {
                string = string.concat(dynamicValJS + i, "")
            } else {
                string = string.concat(dynamicValJS + i, ", ")
            }
        }
    } else if (DYNAMIC_VALUE_JAVASCRIPT % 2 === 0) {
        DYNAMIC_VALUE_JAVASCRIPT = DYNAMIC_VALUE_JAVASCRIPT / 2;
        for (let i = 1; i <= DYNAMIC_VALUE_JAVASCRIPT; i++) {
            if (i == DYNAMIC_VALUE_JAVASCRIPT) {
                string = string.concat(dynamicValJS + i, "")
            } else {
                string = string.concat(dynamicValJS + i, ", ")
            }
        }
    }
    return string
}