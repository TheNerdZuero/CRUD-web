// This function is used to validate a form before adding data to the list
function validateForm(){
    // Get the values of form inputs by their IDs
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    
    // Check if the 'name' field is empty
    if(name == ""){
        alert("Name is required!"); // Show an alert message
        return false; // Prevent form submission if validation fails
    }

    // Check if the 'age' field is empty
    if(age == ""){
        alert("Age is required!"); // Show an alert message
        return false; // Prevent form submission if validation fails
    } else if(age < 1){
        alert("Age must not be 0 or less!"); // Show an alert message
        return false; // Prevent form submission if validation fails
    }

    // Check if the 'email' field is empty and contains '@'
    if(email == ""){
        alert("E-mail is required!"); // Show an alert message
        return false; // Prevent form submission if validation fails
    } else if(!email.includes("@")){
        alert("Invalid E-mail address!"); // Show an alert message
        return false; // Prevent form submission if validation fails
    }

    // If all validation passes, return true to allow form submission
    return true;
} 

// This function is used to display data in a table
function showData(){
    let peopleList;

    // Check if there is data in local storage, if not, initialize an empty array
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    } else {
        // If there is data, parse it from JSON format
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

    // Display the generated HTML in the table body
    document.querySelector("#crudTable tbody").innerHTML = html;
}

// This code executes when the window (page) loads
window.onload = showData();

// This function adds data to the list when the form is submitted
function AddData(){
    // Check if the form is valid by calling the validateForm function
    if(validateForm() == true){
        // Get the values from the form inputs
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let address = document.getElementById("address").value;
        let email = document.getElementById("email").value;

        let peopleList;

        // Check if there is data in local storage, if not, initialize an empty array
        if(localStorage.getItem("peopleList") == null){
            peopleList = [];
        } else {
            // If there is data, parse it from JSON format
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        // Add a new object to the peopleList array
        peopleList.push({
            name: name,
            age: age, 
            address: address, 
            email: email
        });

        // Store the updated data back in local storage
        localStorage.setItem("peopleList", JSON.stringify(peopleList));

        // Display the updated data in the table
        showData();

        // Clear the form fields
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";  
    }  
}

// This function deletes data from the list
function deleteData(index){
    let peopleList;

    // Check if there is data in local storage, if not, initialize an empty array
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    } else {
        // If there is data, parse it from JSON format
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    // Remove the data item at the specified index from the array
    peopleList.splice(index, 1);

    // Store the updated data back in local storage
    localStorage.setItem("peopleList", JSON.stringify(peopleList));

    // Display the updated data in the table
    showData();
}

// This function is used to update data in the list
function updateData(index) {
    // Hide the Submit button and show the Update button for editing
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let peopleList;

    // Check if there is data in local storage, if not, initialize an empty array
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        // If there is data, parse it from JSON format
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    // Populate the form fields with data for editing
    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;

    // Add an event listener to the Update button
    document.getElementById("Update").onclick = function () {
        // Check if the form is valid by calling the validateForm function
        if (validateForm() == true) {
            // Update the data in the peopleList array
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;

            // Store the updated data back in local storage
            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            // Display the updated data in the table
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
