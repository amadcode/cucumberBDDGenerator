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
let dynamicValueJS = "args";
let dynamicValueJS_ = "_args_";
let CAMEL_CASED_STEP = "";


if (localStorage.getItem("classReferenceJavaScript") == "") {
    classReferenceJavaScript.value = localStorage.setItem("classReferenceJavaScript", "// ")
} else {
    classReferenceJavaScript.value = localStorage.getItem("classReferenceJavaScript")
}

if (localStorage.getItem("featureStepsJS") == "") {
    featureStepsJS.value = ""
} else {
    featureStepsJS.value = localStorage.getItem("featureStepsJS")
}

featureStepsJS.addEventListener("keyup", event => {
    console.log("inside featureStepsJS")
    localStorage.setItem("featureStepsJS", event.target.value)
    // stepDefinitionJS.value = this.generateStepDefinitionJSTemplate()
    stepDefinitionJS.value = section1JS()
    coreComponentJS.value = section3JS()
    gArgsJS()
});

classReferenceJavaScript.addEventListener("keyup", event => {
    console.log("inside featureStepsJS")
    localStorage.setItem("classReferenceJavaScript", event.target.value)
    writeImplementationHere.value = localStorage.getItem("classReferenceJavaScript")
})

/*
 * Reference: First layer ->
 * general: public void this_is_the_first_layer
 * example: i_am_at_the_application_portal
 */

function section1JS() {
    let array = localStorage.getItem("featureStepsJS")
                .trim()
                .replace("/", "")
                .replace("-", "")
                .split('\n')

    let toCalDV = localStorage.getItem("featureStepsJS")
    let noOfDynamicValues = 0
    for (let i = 0; i < toCalDV.length; i++) {
        if ((array[i] == "\"") || array[i] == "\'") {
            noOfDynamicValues = noOfDynamicValues + 1
            DYNAMIC_VALUE_JAVASCRIPT = noOfDynamicValues
        }
    }

    console.log(`HERE DYNAMIC_VALUE_JAVASCRIPT: ${DYNAMIC_VALUE_JAVASCRIPT}`)


    for (let i = 0; i < array.length; i++) {
        const keyword = array[i].split(/\s+/);
        const step = [keyword.shift(), keyword.join(' ')];
        const stepWithoutSpecialChars = step[1]
                                        .trimStart()
                                        .replace(/'([^']+)'/g, '(.+)')
                                        .replace(/"([^"]+)"/g, '\\"(.*?)\\"');

        GLOBAL_ARRAY = stepWithoutSpecialChars;
        CAMEL_CASED_STEP = camelize(stepWithoutSpecialChars)

        console.log(`HERE2 DYNAMIC_VALUE_JAVASCRIPT: ${DYNAMIC_VALUE_JAVASCRIPT}`)

        array[i] =
                step[0]
                + openingBracket
                + sc_doubleColons
                + stepWithoutSpecialChars
                + sc_doubleColons
                + sc_comma
                + sc_openingBracket
                + generateArgumentsJS(DYNAMIC_VALUE_JAVASCRIPT)
                // + genrateArgsJS()
                + sc_closingBracket + sc_space
                + sc_equalSign + sc_greaterThanSign
                + sc_openingCurlyParenthesis + sc_space
                + "\n\t"
                + classReferenceJavaScript.value
                + section2JS()
                + "\n"
                + sc_closingCurlyParenthesis + sc_closingBracket
                + "\n"
        }
    return array.join("\n")
}


function section2JS() {
    // console.log(`CAMEL_CASED_STEP: ${CAMEL_CASED_STEP}`)
    // console.log(`GLOBAL_ARRAY: ${GLOBAL_ARRAY}`)
    // console.log(`arrayForInnerMethod: ${arrayForInnerMethod}`)
    arrayForInnerMethod = GLOBAL_ARRAY
    let val = camelize(arrayForInnerMethod);

    for (let i = 0; i < val.length; i++) {
    val = val.replaceAll(" ", "")
                                                .replace('(.+)', dynamicValueJS_)
                                                .replace('\\"(.*?)\\"', dynamicValueJS_)
    }


    let toCalDV = localStorage.getItem("featureStepsJS")
    let noOfDynamicValues = 0
    for (let i = 0; i < toCalDV.length; i++) {
        if ((toCalDV[i] == "\"") || toCalDV[i] == "\'") {
            noOfDynamicValues = noOfDynamicValues + 1
            DYNAMIC_VALUE_JAVASCRIPT = noOfDynamicValues
        }
    }

    let arguments = generateArgumentsJS(DYNAMIC_VALUE_JAVASCRIPT)

    // console.log(`camelize: ${val}`)
    // console.log(`DYNAMIC_VALUE_JAVASCRIPT: ${DYNAMIC_VALUE_JAVASCRIPT}`)
    arrayForInnerMethod = val + sc_openingBracket + arguments + sc_closingBracket
    // console.log(`underscoredArray: ${arrayForInnerMethod}`)
    return arrayForInnerMethod
}

function section3JS() {
    let array = localStorage.getItem("featureStepsJS")
                .trim()
                .replace("/", "")
                .replace("-", "")
                .split('\n')

    let toCalDV = localStorage.getItem("featureStepsJS")
    let noOfDynamicValues = 0
    for (let i = 0; i < toCalDV.length; i++) {
        if ((toCalDV[i] == "\"") || toCalDV[i] == "\'") {
            noOfDynamicValues = noOfDynamicValues + 1
            DYNAMIC_VALUE_JAVASCRIPT = noOfDynamicValues
        }
    }

    console.log(`HERE DYNAMIC_VALUE_JAVASCRIPT: ${DYNAMIC_VALUE_JAVASCRIPT}`)


    for (let i = 0; i < array.length; i++) {
        const keyword = array[i].split(/\s+/);
        const step = [keyword.shift(), keyword.join(' ')];

        step[1] = camelize(step[1])
        const stepWithoutSpecialChars =     step[1].trimStart().replaceAll(" ", "")
                                                .replace('(.+)', dynamicValueJS_)
                                                .replace('\\"(.*?)\\"', dynamicValueJS_)
                                                .replace(/'([^']+)'/g, dynamicValueJS_)
                                                .replace(/"([^"]+)"/g, dynamicValueJS_);
        GLOBAL_ARRAY = stepWithoutSpecialChars;
        CAMEL_CASED_STEP = camelize(GLOBAL_ARRAY)

        console.log(`HERE2 DYNAMIC_VALUE_JAVASCRIPT: ${DYNAMIC_VALUE_JAVASCRIPT}`)

        array[i] =
                CAMEL_CASED_STEP
                + sc_openingBracket
                + generateArgumentsJS(DYNAMIC_VALUE_JAVASCRIPT)
                // + genrateArgsJS()
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

function genrateArgsJS() {
    let string = ""
    let noOfDynamicValues = 0
    let arrayWhichCanContainDynamicValues = localStorage.getItem("featureStepsJS")
                .trim()
                .replace("/", "")
                .replace("-", "")
                .split('\n')
    let toCalDV = localStorage.getItem("featureStepsJS")
    for (let i = 0; i < arrayWhichCanContainDynamicValues.length; i++) {
        if ((arrayWhichCanContainDynamicValues[i] == "\"") || arrayWhichCanContainDynamicValues[i] == "\'") {
            noOfDynamicValues = noOfDynamicValues + 1
            DYNAMIC_VALUE_JAVASCRIPT = noOfDynamicValues
        }
    }

    if (DYNAMIC_VALUE_JAVASCRIPT == 0) {
        arguments = null
    }
    else if (DYNAMIC_VALUE_JAVASCRIPT === 2) {
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


function gArgsJS() {
    let arrayWhichCanContainDynamicValues = localStorage.getItem("featureStepsJS").split(/\s+/);
    let arrayWithoutKeyword = [arrayWhichCanContainDynamicValues.shift(), arrayWhichCanContainDynamicValues.join(' ')];
        const stepWithoutSpecialChars = arrayWithoutKeyword[1]
                                        .trimStart()
                                        .replace(/'([^']+)'/g, '(.+)')
                                        .replace(/"([^"]+)"/g, '\\"(.*?)\\"');

    console.log(`stepWithoutSpecialChars: ${stepWithoutSpecialChars}`)

}


function generateArgumentsJS(DYNAMIC_VALUE_JAVASCRIPT) {

    console.log(`noOfDynamicValuesJS when this is called: ${DYNAMIC_VALUE_JAVASCRIPT}`)

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