let featureSteps = document.querySelector("#featureSteps")
let stepDefinition = document.querySelector("#stepDefinition")
let coreComponent = document.querySelector("#coreComponent")
let classReferenceJava = document.querySelector("#classReferenceJava")
let underscoredArray = ""
let methodInnerBlock = ""
let array = ""
let openingBracket = "("
let closingBracket = ")"
let openingParenthesis = "{"
let closingParenthesis = "}"
let brackets = "()"
let terminator = ";"
let atTheRate = "@"
let javaMethodConvention = "public void "
let dynamicValue_ = "_args_"
let dynamicValue = "args"
let argumentSeries
let writeImplementationHere = "// write implementation here"
let throwsThrowable = " throws Throwable"
let dynamicValueCount

if (localStorage.getItem("classReferenceJava") == "") {
    classReferenceJava.value = localStorage.setItem("classReferenceJava", "// ")
} else {
    classReferenceJava.value = localStorage.getItem("classReferenceJava")
}

if (localStorage.getItem("featureSteps") == "") {
    featureSteps.value = ""
} else {
    featureSteps.value = localStorage.getItem("featureSteps")
}

featureSteps.addEventListener("keyup", event => {
    console.log("inside featureSteps")
    localStorage.setItem("featureSteps", event.target.value)
    stepDefinition.value = this.generateStepDefinitionTemplate()
    coreComponent.value = this.generateStepDefinitionMethod()
});

classReferenceJava.addEventListener("keyup", event => {
    console.log("inside featureSteps")
    localStorage.setItem("classReferenceJava", event.target.value)
    writeImplementationHere.value = localStorage.getItem("classReferenceJava")
})

/*
 * Reference: First layer ->
 * general: public void this_is_the_first_layer
 * example: i_am_at_the_application_portal
 */
function generateStepDefinitionTemplate() {
        let array = localStorage.getItem("featureSteps")
                            .trim()
                            .replace("/", "")
                            .replace("-", "")
                            .split('\n')
        for (let i = 0 ; i < array.length; i++) {
            array[i] = array[i].trimStart()
            const keyword = array[i].split(/\s+/);
            const step = [keyword.shift().trimStart(), keyword.join(' ')];

            // work for replacing the dynamic variable/ value in steps
            const stepWithoutSpecialChars = step[1]
                                                .trimStart()
                                                .replace(/'([^']+)'/g, '(.+)')
                                                .replace(/"([^"]+)"/g, '\\"(.*?)\\"');

            // camel casing for inner method generation - step definition body
            const camelCasing = camelize(stepWithoutSpecialChars)

            console.log(`stepWithoutSpecialChars: ${stepWithoutSpecialChars}`)
            console.log(`camelCasing: ${camelCasing}`)

            array[i] = atTheRate
                        + step[0]
                        + openingBracket
                        + "\"^"
                        + stepWithoutSpecialChars
                        + "$\""
                        + closingBracket
                        + "\n"
                        + javaMethodConvention
                        + methodNameGeneratorInnerBodyOfStepDefinition(step[1])  // ref:01 this function is to generate inner step generation body/ core component method
        }
    return array.join("\n")
}

function generateStepDefinitionMethod() {
    let coreComponents = localStorage.getItem("featureSteps").split('\n')
    for (let i = 0; i < coreComponents.length; i++) {
        coreComponents[i] = coreComponents[i].trimStart();
        const keyword = coreComponents[i].split(/\s+/);
        const individualStepsForCoreComponent = [keyword.shift(), keyword.join(' ')];
        const stepWithoutSpecialChars = individualStepsForCoreComponent[1]
            .replace(/'([^']+)'/g, '(.+)')
            .replace(/"([^"]+)"/g, '\\"(.*?)\\"');

        coreComponents[i] = javaMethodConvention
                            + this.methodGeneratorStepDefinition_SecondLayer2(individualStepsForCoreComponent[1])
    }
    return coreComponents.join("\n")
}

/*
 * Reference: 01
 * Function/ operation: this method is used to generate inner body of step definition - which is the reference to core components.
 */
function methodNameGeneratorInnerBodyOfStepDefinition(array) {
    underscoredArray = array.replaceAll(" ", "_")
        .replace(/"([^"]+)"/g, dynamicValue)
        .replace(/'([^']+)'/g, dynamicValue);
    let noOfDynamicValues = 0
    dynamicValueCount = noOfDynamicValues
    for (let i = 0; i < array.length; i++) {
        if ((array[i] == "\"") || array[i] == "\'") {
            noOfDynamicValues = noOfDynamicValues + 1
        }
    }
    // console.log("catch this value..")
    console.log(`noOfDynamicValues: ${noOfDynamicValues}`)

    underscoredArray = underscoredArray +
        openingBracket +
        generateParameterF(noOfDynamicValues) +
        closingBracket +
        throwsThrowable +
        openingParenthesis +
        this.methodGeneratorInnerStepDefinitionBody_ThirdLayer(array, noOfDynamicValues) +
        closingParenthesis +
        "\n";

    console.log(`underscoredArray: ${underscoredArray}`)

    return underscoredArray
}

function methodGeneratorStepDefinition_SecondLayer2(array) {
    array = this.camelize(array)
    underscoredArray = array
        .replaceAll(/\s/g, '')
        .replace(/"([^"]+)"/g, dynamicValue_)
        .replace(/'([^']+)'/g, dynamicValue_);
    // underscoredArray = underscoredArray.replace(/"([^"]+)"/g, dynamicValue_).replace(/'([^']+)'/g, dynamicValue_);


    let noOfDynamicValues = 0
    dynamicValueCount = noOfDynamicValues
    for (let i = 0; i < array.length; i++) {
        if ((array[i] == "\"") || array[i] == "\'") {
            noOfDynamicValues = noOfDynamicValues + 1
        }
    }
    console.log("catch this value..")
    console.log(`noOfDynamicValues: ${noOfDynamicValues}`)

    underscoredArray = underscoredArray +
        openingBracket +
        this.generateParameterF(noOfDynamicValues) +
        closingBracket +
        throwsThrowable +
        openingParenthesis +
        "\n\t" +
        writeImplementationHere +
        "\n" +
        closingParenthesis +
        "\n";
    return underscoredArray
}

function methodGeneratorInnerStepDefinitionBody_ThirdLayer(array, noOfDynamicValues) {
    let arguments = this.generateArgumentsF(noOfDynamicValues)
    array = camelize(array)
    console.log(`camelArray: ${array}`)
    methodInnerBlock = array.replaceAll(/\s/g, '')
    methodInnerBlock = methodInnerBlock
        .replace("/", "")
        .replace("-", "")
        .replace(/"([^"]+)"/g, dynamicValue_).replace(/'([^']+)'/g, dynamicValue_);



    methodInnerBlock = "\n" +
        "\t"
        // + "// "
        // + classReferenceForJavaProgram
        +
        classReferenceJava.value +
        methodInnerBlock +
        openingBracket +
        arguments +
        // argumentss +
        closingBracket +
        terminator +
        "\n"

    console.log(`methodInnerBlock: ${methodInnerBlock}`)
    return methodInnerBlock
}

function generateArgumentsF(noOfDynamicValues) {
    console.log(`here noOfDynamicValues: ${noOfDynamicValues}`)
    let string = ""
    let noValue = ""
    if (noOfDynamicValues == 0) {
        string = noValue
    } else if (noOfDynamicValues == 2) {
        noOfDynamicValues = 1;
        for (let i = 1; i <= noOfDynamicValues; i++) {
            if (i == noOfDynamicValues) {
                string = string.concat(dynamicValue + i, "")
            } else {
                string = string.concat(dynamicValue + i, ", ")
            }
        }
    } else if (noOfDynamicValues % 2 == 0) {
        noOfDynamicValues = noOfDynamicValues / 2;
        for (let i = 1; i <= noOfDynamicValues; i++) {
            if (i == noOfDynamicValues) {
                string = string.concat(dynamicValue + i, "")
            } else {
                string = string.concat(dynamicValue + i, ", ")
            }
        }
    }
    return string
}

function generateParameterF(noOfDynamicValues) {
    console.log(`here dynamicValueCount: ${noOfDynamicValues}`)

    let string = ""
    let noValue = ""
    if (noOfDynamicValues == 0) {
        string = noValue
        console.log(`here noValue: ${noValue}`)
        console.log(`here string: ${string}`)
        console.log("after no value if block")
        // return string
    } else if (noOfDynamicValues == 2) {
        noOfDynamicValues = 1;
        for (let i = 1; i <= noOfDynamicValues; i++) {
            if (i == noOfDynamicValues) {
                string = string.concat("String " + dynamicValue + i, "")
            } else {
                string = string.concat("String " + dynamicValue + i, ", ")
            }
        }
    } else if (noOfDynamicValues % 2 == 0) {
        noOfDynamicValues = noOfDynamicValues / 2;
        for (let i = 1; i <= noOfDynamicValues; i++) {
            if (i == noOfDynamicValues) {
                string = string.concat("String " + dynamicValue + i, "")
            } else {
                string = string.concat("String " + dynamicValue + i, ", ")
            }
        }
    }
    return string
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}