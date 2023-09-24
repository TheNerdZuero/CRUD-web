function validateForm(){
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    
    if(name == ""){
        alert("Name is required!");
        return false;
    }

    if(age == ""){
        alert("Age is required!");
        return false;
    }else if(age < 1){
        alert("Age must not be 0 or less!");
        return false;
    }
    if(email == ""){
        alert("E-mail is required!");
        return false;
    }else if(!email.includes("@")){
        alert("Invalid E-mail address!")
        return false;
    }

    return true;
} 

function showData(){
    let peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    let html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>";
    html += "<td>" + element.name + "</td>";
    html += "<td>" + element.age + "</td>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.address + "</td>";
    html += 
        '<td><button onclick="deleteData('+
        index+')" class="btn btn-danger">Delete</button><button onclick="updateData('+
        index+')" class="btn btn-warning m-2">Edit</button></td>';
    html+="</tr>";
    });
    

    document.querySelector("#crudTable tbody").innerHTML = html;
}
//loads all data when document or page loaded
window.onload = showData();

function AddData(){
    //if form is validate
    if(validateForm() == true){
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let address = document.getElementById("address").value;
        let email = document.getElementById("email").value;

        let peopleList;
        if(localStorage.getItem("peopleList") == null){
            peopleList = [];
        }else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name: name,
            age: age, 
            address: address, 
            email: email
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";  
    }  
}
function deleteData(index){
    let peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

function updateData(index) {
    // Submit button will hide and Update button will show for the updating of data
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    // Populate the form fields with data for editing
    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;

    // Add an event listener to the Update button
    document.getElementById("Update").onclick = function () {
        if (validateForm() == true) {
            // Update the data in the peopleList array
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;

            // Save the updated data back to localStorage
            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            // Refresh the table to reflect the changes
            showData();

            // Clear the form fields
            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";

            // Hide the Update button and show the Submit button
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    };
}
