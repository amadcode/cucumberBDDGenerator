let featureStepsPy = document.querySelector("#featureStepsPy")
let stepDefinitionPy = document.querySelector("#stepDefinitionPy")
let coreComponentPy = document.querySelector("#coreComponentPy")
let classReferencePython = document.querySelector("#classReferencePython")
let DYNAMIC_VALUE_PYTHON = 0
let sc_colons = ":"

if (localStorage.getItem("classReferencePython") == "") {
    classReferencePython.value = localStorage.setItem("classReferencePython", "// ")
} else {
    classReferencePython.value = localStorage.getItem("classReferencePython")
}

if (localStorage.getItem("featureStepsPy") == "") {
    featureStepsPy.value = ""
} else {
    featureStepsPy.value = localStorage.getItem("featureStepsPy")
}

featureStepsPy.addEventListener("keyup", event => {
    console.log("inside featureStepsPy")
    localStorage.setItem("featureStepsPy", event.target.value)
    stepDefinitionPy.value = section1_Py()
    coreComponentPy.value = section3_PY()
});

classReferencePython.addEventListener("keyup", event => {
    console.log("inside featureStepsPy")
    localStorage.setItem("classReferencePython", event.target.value)
    writeImplementationHere.value = localStorage.getItem("classReferencePython")
})

function section1_Py() {
    let array = localStorage.getItem("featureStepsPy")
                .trim()
                .replace("/", "")
                .replace("-", "")
                .split('\n')

    let toCalDV = localStorage.getItem("featureStepsPy")
    let noOfDynamicValues = 0
    for (let i = 0; i < toCalDV.length; i++) {
        if ((array[i] == "\"") || array[i] == "\'") {
            noOfDynamicValues = noOfDynamicValues + 1
            DYNAMIC_VALUE_PYTHON = noOfDynamicValues
        }
    }
    console.log(`HERE DYNAMIC_VALUE_PYTHON: ${DYNAMIC_VALUE_PYTHON}`)
    for (let i = 0; i < array.length; i++) {
        const keyword = array[i].split(/\s+/);
        const step = [keyword.shift(), keyword.join(' ')];
        const stepWithoutSpecialChars = step[1]
                                        .trimStart()
                                        .replace(/'([^']+)'/g, '(.+)')
                                        .replace(/"([^"]+)"/g, '\\"(.*?)\\"');
        GLOBAL_ARRAY = stepWithoutSpecialChars;
        CAMEL_CASED_STEP = camelize(stepWithoutSpecialChars)
        array[i] =
                step[0]
                + openingBracket
                + sc_doubleColons
                + stepWithoutSpecialChars
                + sc_doubleColons
                + sc_closingBracket
                + generateArgumentsPy(DYNAMIC_VALUE_PYTHON)
                + "\n\t"
                + classReferencePython.value
                + section2_Py()
                + "\n"
        array[i] = atTheRate + array[i]
        console.log(`HERE array: ${array[i]}`)
        }
    return array.join("\n")
}


function section2_Py() {
    arrayForInnerMethod = GLOBAL_ARRAY
    let val = camelize(arrayForInnerMethod);
    for (let i = 0; i < val.length; i++) {
    val = val.replaceAll(" ", "")
                                                .replace('(.+)', dynamicValueJS_)
                                                .replace('\\"(.*?)\\"', dynamicValueJS_)
    }
    let toCalDV = localStorage.getItem("featureStepsPy")
    let noOfDynamicValues = 0
    for (let i = 0; i < toCalDV.length; i++) {
        if ((toCalDV[i] == "\"") || toCalDV[i] == "\'") {
            noOfDynamicValues = noOfDynamicValues + 1
            DYNAMIC_VALUE_PYTHON = noOfDynamicValues
        }
    }
    let arguments = generateArgumentsPy(DYNAMIC_VALUE_PYTHON)
    arrayForInnerMethod = val + sc_openingBracket + arguments + sc_closingBracket
    return arrayForInnerMethod
}

function section3_PY() {
    let array = localStorage.getItem("featureStepsPy")
                .trim()
                .replace("/", "")
                .replace("-", "")
                .split('\n')

    let toCalDV = localStorage.getItem("featureStepsPy")
    let noOfDynamicValues = 0
    for (let i = 0; i < toCalDV.length; i++) {
        if ((toCalDV[i] == "\"") || toCalDV[i] == "\'") {
            noOfDynamicValues = noOfDynamicValues + 1
            DYNAMIC_VALUE_PYTHON = noOfDynamicValues
        }
    }

    console.log(`HERE DYNAMIC_VALUE_PYTHON: ${DYNAMIC_VALUE_PYTHON}`)


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

        console.log(`HERE2 DYNAMIC_VALUE_PYTHON: ${DYNAMIC_VALUE_PYTHON}`)

        array[i] =
                CAMEL_CASED_STEP
                + sc_openingBracket
                + generateArgumentsPy(DYNAMIC_VALUE_PYTHON)
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

function generateArgumentsPy(DYNAMIC_VALUE_PYTHON) {
    let string = ""
    let noValue = ""
    if (DYNAMIC_VALUE_PYTHON === 0) {
        string = noValue
    } else if (DYNAMIC_VALUE_PYTHON === 2) {
        DYNAMIC_VALUE_PYTHON = 1;
        for (let i = 1; i <= DYNAMIC_VALUE_PYTHON; i++) {
            if (i == DYNAMIC_VALUE_PYTHON) {
                string = string.concat(dynamicValJS + i, "")
            } else {
                string = string.concat(dynamicValJS + i, ", ")
            }
        }
    } else if (DYNAMIC_VALUE_PYTHON % 2 === 0) {
        DYNAMIC_VALUE_PYTHON = DYNAMIC_VALUE_PYTHON / 2;
        for (let i = 1; i <= DYNAMIC_VALUE_PYTHON; i++) {
            if (i == DYNAMIC_VALUE_PYTHON) {
                string = string.concat(dynamicValJS + i, "")
            } else {
                string = string.concat(dynamicValJS + i, ", ")
            }
        }
    }
    return string
}