let featureSteps = document.querySelector("#featureSteps")
let stepDefinition = document.querySelector("#stepDefinition")
let coreComponent = document.querySelector("#coreComponent")
let noValueToDisplay = "nothing to display. Please add some lines"
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

featureSteps.value = localStorage.getItem("featureSteps")

featureSteps.addEventListener("keyup", event => {
    console.log("inside featureSteps")
    localStorage.setItem("featureSteps", event.target.value)
    stepDefinition.value = this.generateStepDefinition()
    this.generateStepDefinition()
    this.generateCoreComponents()
});

function generateStepDefinition() {
    let a = localStorage.getItem("featureSteps")
    let array = ""
    if (a === "") {
        console.log(noValueToDisplay)
    } else {
        array = a.split('\n')
        for (let i = 0 ; i < array.length; i++) {
            const aa = array[i].split(/\s+/);
            const arr = [aa.shift(), aa.join(' ')];
            array[i] = atTheRate
                        + arr[0]
                        + openingBracket
                        + "\""
                        + arr[1]
                        + "\""
                        + closingBracket
                        + "\n"
                        + javaMethodConvention
                        + methodGeneratorStepDefinition(arr[1])
        }
    }
    stepDefinition.value = array.join("\n")
}

function generateCoreComponents() {
    let a = localStorage.getItem("featureSteps")
    let array = ""
    if (a === "") {
        console.log(noValueToDisplay)
    } else {
        array = a.split('\n')
        for (let i = 0 ; i < array.length; i++) {
            const aa = array[i].split(/\s+/);
            const arr = [aa.shift(), aa.join(' ')];
            array[i] = ""
                        + "public void "
                        + methodGeneratorInnerCoreComponent(arr[1])
                        + openingBracket + closingBracket
                        + " throws Throwable"
                        + openingParenthesis
                        + "\n\t"
                        + "// write implementation here"
                        + "\n"
                        + closingParenthesis
                        + "\n"
        }
    }
    coreComponent.value = array.join("\n")
}

function methodGeneratorStepDefinition(array) {
    underscoredArray = array.replaceAll(" ", "_")
    underscoredArray = underscoredArray + "() throws Throwable"
                                        + openingParenthesis
                                        +  methodGeneratorInnerStepDefinitionBody(array)
                                        + closingParenthesis
                                        +"\n"
    console.log(underscoredArray)
    return underscoredArray
}

function methodGeneratorInnerStepDefinitionBody(array) {
    methodInnerBlock = array.replaceAll(/\s/g, '')
    methodInnerBlock = "\n"
                            + "\t"
                            + methodInnerBlock.toLowerCase()
                            + openingBracket + closingBracket + terminator
                            + "\n"
    console.log(`underscoredArray2${methodInnerBlock}`)
    return methodInnerBlock
}

function methodGeneratorInnerCoreComponent(array) {
    methodInnerBlock = array.replaceAll(/\s/g, '')
    methodInnerBlock = ""
                            + ""
                            + methodInnerBlock.toLowerCase()
    console.log(`underscoredArray2${methodInnerBlock}`)
    return methodInnerBlock
}