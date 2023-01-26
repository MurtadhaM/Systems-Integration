let students = [];
function setInputFilter(textbox, inputFilter, errMsg) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function(event) {
      textbox.addEventListener(event, function(e) {
        if (inputFilter(this.value)) {
          // Accepted value
          if (["keydown","mousedown","focusout"].indexOf(e.type) >= 0){
            this.classList.remove("input-error");
            this.setCustomValidity("");
          }
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          // Rejected value - restore the previous one
          this.classList.add("input-error");
          this.setCustomValidity(errMsg);
          this.reportValidity();
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          // Rejected value - nothing to restore
          this.value = "";
        }
      });
    });
  }
  
$(document).ready(function(){
    // INPUT VALIDATION
    setInputFilter(document.getElementById("ROLLID"), function(value) {
        return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 500); }, "Must be between 0 and 500");

    setInputFilter(document.getElementById("NAME"), function(value) { 
        return /^[a-zA-Z ]*$/.test(value); } , "Must be a string");

    setInputFilter(document.getElementById("TITLE"), function(value) {
        return /^[a-zA-Z ]*$/.test(value); } , "Must be a string");

    setInputFilter(document.getElementById("CLASS"), function(value) {
        return /^[a-zA-Z ]*$/.test(value); }
        , "Must be a string");


    }
    
    
    
    
    );



const notifyToast = (message, type) => {

    if(message == "Student added successfully"){
        background = "#00d1b2";
    }else{
        background = "#ff3860";

    }

        


    Toastify({
        
        text: message,
        duration: 2000,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true,
        style: {
          background:  background,
            color: "red",
        
        },
        callback:  () => {

            if(message == "Student added successfully"){
            } else if(message == "Student updated successfully"){
                location.reload();
            } else if(message == "Student deleted successfully"){
                location.reload();

            } else {
                $('#ROLLID').css("border", "1px solid #f44336");

            }
             
        }
        
        ,

      
      }).showToast();
};

$(document).ready(function(){
       
                // LISTEN ON THE DROPDOWN
              
                $('.option').on('click', function(){

                    var section = $(this).attr("value");

                    console.log(section);

                    $('#SECTION')[0].innerHTML = section;
                                     }); 

                                
                var dropdown = document.querySelector('#DROP');
                  
                //addEventListener - attaches an event handler to the specified element.
                dropdown.addEventListener('click', function(event) {
                  

                    
                   //classList.toggle - it toggles between adding and removing a class name from an element
                   dropdown.classList.toggle('is-active');
                });
});

/*
UPDATE STUDENT
*/
$(document).on("click", '.update-button', function(){
var id = $(this).attr("id");
var element = $(this);
toggleModal();

//Get the student from the array
var student = students.find(function(student){
    return student.ROLLID == id;
});

$('#addStudentBTN').text('Update Student')

  
document.getElementById("NAME").value = student.NAME;
document.getElementById("TITLE").value = student.TITLE;
document.getElementById("CLASS").value = student.CLASS;
document.getElementById("SECTION").innerHTML = student.SECTION;
document.getElementById("ROLLID").value = student.ROLLID;

//Set the values of the form


console.log(this);    

 



});



            
/*
listen on all the delete buttons
when a delete button is clicked, get the id of the student
*/
$(document).on("click", ".delete-button", function(){
var id = $(this).attr("id");
console.log(id);
deleteStudent(id);
});
    


$(document).on("click", "#addStudentBTN", function(){

//Check if the form is valid
let isValid = true;
$('input').each(function(){
    if($(this).val() == ""){
        isValid = false;    
    } 
    

});

if(isValid && $('#addStudentBTN').text() == 'Add Student'){
    addStudent();
} else if(isValid && $('#addStudentBTN').text() == 'Update Student'){
    updateStudent( document.getElementById("ROLLID").value);
}

else{
    notifyToast("Please fill out all the fields", "error");
}

});

$(document).on("click", "#ShowModal", function(){

$('#addStudentBTN').text('Add Student')

toggleModal();
});
$(document).on("click", "#closeModalButton", function(){


toggleModal();
});

$(document).on("click", ".modal-background", function(){


toggleModal();
});

// Toggle the Modal
function toggleModal() {
var modal = document.querySelector('.modal');
modal.classList.toggle('is-active');
}


$(document).on("click", "#getStudentsBTN", function(){
getStudents();
});


function getStudents(){
    // Reset the output div
    document.getElementById("output").innerHTML = "";
    axios.get('http://45.55.32.24:8080/getStudents/',
    {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            


        
        
        },
        crossDomain:true,
    })
    .then(function(response){

        // For each student in the response, create a div with the student's name and id
        for (var i = 0; i < response.data.length; i++){
   
            var student = response.data[i];
            students.push(student)


          let studentCard =   `<div class="student"> 
                <div class="card">
                    <div class="card-content">
                      <p class="title has-text-centered">
                        ${student.NAME} ${student.TITLE}
                      </p>
                     
                    </div>
                    <footer class="card-footer">
                      <p class="card-footer-item">
                        <button class="button btn update-button is-warning"  id=${student.ROLLID}>Update</button>
            
                      </p>
                      <p class="card-footer-item">
                        <button class="button btn delete-button is-warning" id=${student.ROLLID}>Delete</button>
            
                      </p>
                    </footer>
                  </div>
            
            
            </div>`
        
            document.getElementById("output").innerHTML += studentCard;

     

        }

        
    })
    .catch(function(error){
        console.log(error);
        
    });


    return students;
     
}


function addStudent(){
    var name = document.getElementById("NAME").value;
    var title = document.getElementById("TITLE").value;
    var class1 = document.getElementById("CLASS").value;
    var section = document.getElementById("SECTION").innerHTML;
    var rollid = document.getElementById("ROLLID").value;

    console.log(name);

    axios.post('http://45.55.32.24:8080/addStudent',
    {
        NAME: name,
        TITLE: title,
        CLASS: class1,
        SECTION: section,
        ROLLID: rollid,
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        crossDomain:true,
    })
    .then(function(response){
    console.log(response);

    notifyToast('Student Added', "success");
    // Refresh the list of students
    getStudents();  
    

    })
    .catch(function(error){


        console.log(error.response.data.error);
        notifyToast(error.response.data.error, "error");

    });
}

function deleteStudent(id){
//            var rollid = document.getElementById("ROLLID").value;

    //Remove the student from the Dom
    var student = document.getElementById(id);
    
    
    axios.delete('http://45.55.32.24:8080/deleteStudent/'+id,
    
   
    {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        crossDomain:true,
    })
    .then(function(response){
    console.log(response);

    
    //Remove the student from the Dom
    // student.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(student.parentNode.parentNode.parentNode.parentNode);
    
    // Refresh the list of students
    getStudents();  

    
    notifyToast('User Deleted!', "success");

    

    })
    .catch(function(error){
        console.log(error.response);

        notifyToast(error.message, "error");
    });
}

// Update a student
function updateStudent(id){
    var name = document.getElementById("NAME").value;
    var title = document.getElementById("TITLE").value;
    var class1 = document.getElementById("CLASS").value;
    var section = document.getElementById("SECTION").innerText;
    var rollid = id;

    console.log(name);

    axios.put('http://45.55.32.24:8080/updateStudent/'+id,
    {
        NAME: name,
        TITLE: title,
        CLASS: class1,
        SECTION: section,
        ROLLID: rollid,
    },
    {
        headers: {
            'Content-Type': 'application/json',
        },
        crossDomain:true,
    })
    .then(function(response){
    console.log(response);


    notifyToast('User Updated Successfully', "success");
        // Refresh the list of students
        getStudents();  

    })
    .catch(function(error){
        console.log(error.response);
    
        notifyToast(error.response.data, "error");
    });
}