// let featureSteps = document.querySelector("#featureSteps")
// let stepDefinition = document.querySelector("#stepDefinition")
// let coreComponent = document.querySelector("#coreComponent")
// let noValueToDisplay = "nothing to display. Please add some lines"
// let underscoredArray = ""
// let methodInnerBlock = ""
// let array = ""
// let openingBracket = "("
// let closingBracket = ")"
// let openingParenthesis = "{"
// let closingParenthesis = "}"
// let brackets = "()"
// let terminator = ";"
// let atTheRate = "@"
// let javaMethodConvention = "public void "
// let dynamicValue_ = "_args_"
// let dynamicValue = "args"
// let argumentSeries
// let writeImplementationHere = "// write implementation here"
// let throwsThrowable = " throws Throwable"
// let dynamicValueCount
//
// if (localStorage.getItem("featureSteps") == "") {
//     featureSteps.value = ""
// } else {
//     featureSteps.value = localStorage.getItem("featureSteps")
// }
// // featureSteps.value = localStorage.getItem("featureSteps")
//
// featureSteps.addEventListener("keyup", event => {
//     console.log("inside featureSteps")
//     localStorage.setItem("featureSteps", event.target.value)
//     stepDefinition.value = this.generateStepDefinition_FirstLayer()
//     this.generateStepDefinition_FirstLayer()
//     // this.genCoreComponents()
// });
//
// function generateStepDefinition_FirstLayer() {
//     let a = localStorage.getItem("featureSteps")
//     let array = ""
//         array = a.trim();
//         array = array.replace("/", "").replace("-", "");
//         array = array.split('\n')
//         // array = array.trim()
//         for (let i = 0 ; i < array.length; i++) {
//             array[i] = array[i].trimStart()
//             const keyword = array[i].split(/\s+/);
//             const step = [keyword.shift().trimStart(), keyword.join(' ')];
//
//             // work for replacing the dynamic variable/ value in steps
//             // const stepWhichCanContainSpecialChars = step[1]
//             const stepWithoutSpecialChars = step[1]
//                                                 .trimStart()
//                                                 .replace(" ", "")
//                                                 .replace(/'([^']+)'/g, '(.+)')
//                                                 .replace(/"([^"]+)"/g, '\\"(.*?)\\"');
//             // const stepWithoutSpecialCharsDQ = stepWithoutSpecialCharsSQ.replace(/"([^"]+)"/g, '\\"(.*?)\\"');
//             // const stepWithoutSpecialChars = stepWithoutSpecialCharsDQ
//
//             // camel casing for inner method generation - step definition body
//             const camelCasing = camelize(stepWithoutSpecialChars)
//
//             console.log(`stepWithoutSpecialChars: ${stepWithoutSpecialChars}`)
//             console.log(`camelCasing: ${camelCasing}`)
//
//             array[i] = atTheRate
//                         + step[0].trimStart()
//                         + openingBracket
//                         + "\""
//                         + stepWithoutSpecialChars
//                         + "\""
//                         + closingBracket
//                         + "\n"
//                         + javaMethodConvention
//                         + methodNameGeneratorInnerBodyOfStepDefinition(step[1])  // ref:01 this function is to generate inner step generation body/ core component method
//             array[i] = array[i].trim()
//         }
//
//         stepDefinition.value = array.join("\n")
//
//         /// cc work
//
//     let l2 = localStorage.getItem("featureSteps")
//         let arrayb = l2.split('\n')
//         for (let i = 0 ; i < arrayb.length; i++) {
//             const keyword = arrayb[i].split(/\s+/);
//             const step2 = [keyword.shift(), keyword.join(' ')];
//
//             // work for replacing the dynamic variable/ value in steps
//             const stepWhichCanContainSpecialChars = step2[1]
//             const stepWithoutSpecialCharsSQ = stepWhichCanContainSpecialChars.replace(/'([^']+)'/g, '(.+)');
//             const stepWithoutSpecialCharsDQ = stepWithoutSpecialCharsSQ.replace(/"([^"]+)"/g, '\\"(.*?)\\"');
//             const stepWithoutSpecialChars = stepWithoutSpecialCharsDQ
//
//             // camel casing for inner method generation - step definition body
//             const camelCasing = camelize(stepWithoutSpecialChars)
//             console.log(`stepWithoutSpecialChars: ${stepWithoutSpecialChars}`)
//             console.log(`camelCasing: ${camelCasing}`)
//             arrayb[i] = javaMethodConvention
//                         + methodGeneratorStepDefinition_SecondLayer2(step2[1])  // ref:01 this function is to generate inner step generation body/ core component method
//         }
//     coreComponent.value = arrayb.join("\n")
// }
//
// /*
// * Reference: 01
// * Function/ operation: this method is used to generate inner body of step definition - which is the reference to core components.
// */
// function methodNameGeneratorInnerBodyOfStepDefinition(array) {
//     underscoredArray = array.replaceAll(" ", "_")
//                                             // .replace("/", "")
//                                             // .replace("-", "")
//                                             .replace(/"([^"]+)"/g, dynamicValue)
//                                             .replace(/'([^']+)'/g, dynamicValue);
//     let noOfDynamicValues = 0
//     dynamicValueCount = noOfDynamicValues
//     for (let i = 0; i < array.length; i++) {
//         if ((array[i] == "\"") || array[i] == "\'") {
//             noOfDynamicValues = noOfDynamicValues + 1
//         }
//     }
//     console.log("catch this value..")
//     console.log(`noOfDynamicValues: ${noOfDynamicValues}`)
//
//     underscoredArray = underscoredArray
//                                         + openingBracket
//                                         + generateParameterF(noOfDynamicValues)
//                                         + closingBracket
//                                         + throwsThrowable
//                                         + openingParenthesis
//                                         + methodGeneratorInnerStepDefinitionBody_ThirdLayer(array, noOfDynamicValues)
//                                         + closingParenthesis
//                                         +"\n"
//
//     return underscoredArray
// }
//
// function methodGeneratorStepDefinition_SecondLayer2(array) {
//     array = camelize(array)
//     underscoredArray = array.replaceAll(/\s/g, '')
//     underscoredArray = underscoredArray.replace(/"([^"]+)"/g, dynamicValue_).replace(/'([^']+)'/g, dynamicValue_);
//
//
//     let noOfDynamicValues = 0
//     dynamicValueCount = noOfDynamicValues
//     for (let i = 0; i < array.length; i++) {
//         if ((array[i] == "\"") || array[i] == "\'") {
//             noOfDynamicValues = noOfDynamicValues + 1
//         }
//     }
//     console.log("catch this value..")
//     console.log(`noOfDynamicValues: ${noOfDynamicValues}`)
//
//     underscoredArray = underscoredArray
//                                         + openingBracket
//                                         + generateParameterF(noOfDynamicValues)
//                                         + closingBracket
//                                         + throwsThrowable
//                                         + openingParenthesis
//                                         + "\n\t"
//                                         + writeImplementationHere
//                                         + "\n"
//                                         + closingParenthesis
//                                         +"\n"
//
//     return underscoredArray
// }
//
// function methodGeneratorInnerStepDefinitionBody_ThirdLayer(array, noOfDynamicValues) {
//     let arguments = generateArgumentsF(noOfDynamicValues)
//     array = camelize(array)
//     console.log(`camelArray: ${array}`)
//     methodInnerBlock = array.replaceAll(/\s/g, '')
//     methodInnerBlock = methodInnerBlock
//                             .replace("/", "")
//                             .replace("-", "")
//                             .replace(/"([^"]+)"/g, dynamicValue_).replace(/'([^']+)'/g, dynamicValue_);
//     methodInnerBlock = "\n"
//                             + "\t"
//                             + "// "
//                             + methodInnerBlock
//                             + openingBracket
//                             + arguments
//                             + closingBracket
//                             + terminator
//                             + "\n"
//     return methodInnerBlock
// }
//
// function generateArgumentsF(noOfDynamicValues) {
//     console.log(`here noOfDynamicValues: ${noOfDynamicValues}`)
//     let string = ""
//     let noValue = ""
//     if (noOfDynamicValues == 0){
//         string = noValue
//     }
//     else if (noOfDynamicValues == 2) {
//         noOfDynamicValues = 1;
//         for (let i = 1; i <= noOfDynamicValues; i++) {
//             if (i == noOfDynamicValues) {
//                 string = string.concat(dynamicValue+i, "")
//             } else {
//              string = string.concat(dynamicValue+i, ", ")
//             }
//         }
//     } else if (noOfDynamicValues%2 == 0) {
//         noOfDynamicValues = noOfDynamicValues/2;
//         for (let i = 1; i <= noOfDynamicValues; i++) {
//             if (i == noOfDynamicValues) {
//                 string = string.concat(dynamicValue+i, "")
//             } else {
//              string = string.concat(dynamicValue+i, ", ")
//             }
//         }
//     }
//     return string
// }
//
// function generateParameterF(noOfDynamicValues) {
//     console.log(`here dynamicValueCount: ${noOfDynamicValues}`)
//
//     let string = ""
//     let noValue = ""
//         if (noOfDynamicValues == 0) {
//             string = noValue
//             console.log(`here noValue: ${noValue}`)
//             console.log(`here string: ${string}`)
//             console.log("after no value if block")
//             // return string
//         } else if (noOfDynamicValues == 2) {
//             noOfDynamicValues = 1;
//             for (let i = 1; i <= noOfDynamicValues; i++) {
//                 if (i == noOfDynamicValues) {
//                     string = string.concat("String " + dynamicValue + i, "")
//                 } else {
//                     string = string.concat("String " + dynamicValue + i, ", ")
//                 }
//             }
//         } else if (noOfDynamicValues % 2 == 0) {
//             noOfDynamicValues = noOfDynamicValues / 2;
//             for (let i = 1; i <= noOfDynamicValues; i++) {
//                 if (i == noOfDynamicValues) {
//                     string = string.concat("String " + dynamicValue + i, "")
//                 } else {
//                     string = string.concat("String " + dynamicValue + i, ", ")
//                 }
//             }
//         }
//     return string
// }
//
// function camelize(str) {
//   return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
//     return index === 0 ? word.toLowerCase() : word.toUpperCase();
//   }).replace(/\s+/g, '');
// }