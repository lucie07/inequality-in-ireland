function myFunction(){
    var professional = document.getElementById("professional").value;
    var purpose = document.getElementById("professional").name;
    var personal = document.getElementById("personal").value;
    var purposeValue;

    var priorKnowledge = document.getElementById("yes").name;
    var knowledgeYes = document.getElementById("yes").value;
    var knowledgeNo = document.getElementById("no").value;
    var knowledgeValue;

    var topicValues = ["labour", "demographic", "education", "health", "social"];
    var valuesRange=[];

    for (var i=0; i<topicValues.length; i++){
        let currentID=topicValues[i];
        let currentValue=document.getElementById(currentID).value;
        if (document.getElementById(currentID).checked){
            valuesRange.push("yes");
        }
        else{
            valuesRange.push("no");
        }
    }

    console.log(valuesRange);

    var topics = {};
// var arrayOfTopics =[];
    for (var i=0; i<topicValues.length; i++){


        topics[topicValues[i]]= valuesRange[i];

        // arrayOfTopics.push(topics);
    }
    console.log(topics);

    var topicsSerialised = JSON.stringify(topics);
    localStorage.setItem("topics",topicsSerialised);
    console.log(localStorage);


//Checking if the radio button is checked//

    if (document.getElementById("professional").checked){
        purposeValue=professional;
    }
    else if (document.getElementById("personal").checked){
        purposeValue=personal;
    }

    if (document.getElementById("yes").checked){

        knowledgeValue = knowledgeYes;
    }
    else if (document.getElementById("no").checked){
        knowledgeValue = knowledgeNo;
    }


    // console.log(professional);
    // console.log(purposeValue);
    // console.log(personal);


    localStorage.setItem(purpose, purposeValue);
    localStorage.setItem(priorKnowledge,knowledgeValue);


    let topicsDeserialised = JSON.parse(localStorage.getItem("topics"));
    console.log(topicsDeserialised);



    alert("The form was submitted." );


    //to check whether the radio button is selected, dont submit empty form
    var empt = document.form1.priorKnowledge.value;
    var empt = document.form1.purpose.value;
    if (empt === "")
    {
        alert("Please fill in the form");
        return false;
    }
    // reture valid;

    else
    {
        // alert('Thank you for submitting the form!');
        return true;
    }
    // return true;
}