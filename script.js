//-------JavaScript Functionality 
//-----Implement functionality to add new student records.--------
document.addEventListener("DOMContentLoaded", () => {
  
  const form = document.getElementById("studentForm");
  const nameInput = document.getElementById("name");
  const idInput = document.getElementById("studentId");
  const emailInput = document.getElementById("email");
  const contactInput = document.getElementById("contact");
  const tableBody = document.getElementById("tableBody");
  const tableWrapper = document.getElementById("tableWrapper");

  if (!form || !nameInput || !idInput || !emailInput || !contactInput) {
    console.error("errors in your form tag.");
    return;
  }
  renderTable();
  form.addEventListener("submit", (event) => {
    event.preventDefault();
///------Validate input fields to ensure student ID and contact number accept only
//numbers, student name accepts only characters, and email accepts only
//valid email addresses. The Contact Number accepts at least 10 digits.///
    if (!validateInputs()) return;
    const student = {
      name: nameInput.value.trim(),
      id: idInput.value.trim(),
      email: emailInput.value.trim(),
      contact: contactInput.value.trim(),
    };
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    form.reset();
    renderTable();
  });
///----------Allow users to adding and edit existing records.
  function validateInputs() {
    const name = nameInput.value.trim();
    const id = idInput.value.trim();
    const email = emailInput.value.trim();
    const contact = contactInput.value.trim();

    if (!name || !id || !email || !contact) {
      alert("Can you please fill all the fields");
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
      alert("Name Section should contain only letters!");
      return false;
    }
    if (isNaN(id)) {
      alert("Student id should be in numberic representation!");
      return false;
    }
    if (!email.includes("@") || !email.includes(".")) {
      alert("Provide Proper email id!");
      return false;
    }
    if (!/^\d{10}$/.test(contact)) {
      alert("Contact number should be in 10+ digits only!");
      return  false;
    }
    return true;
  }
  ////-------Rendering on the student table-----
  function renderTable() {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td><button class="delete-btn" data-index="${index}">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
////---Add a vertical scrollbar dynamically. ---
    tableWrapper.style.overflowY = students.length > 5 ? "scroll" : "auto";
  }
  //////------------Handaling the Delete operations for the student records (or) Provide options for deleting records.------
  tableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.getAttribute("data-index");
      deleteStudent(index);
    }
  });
  function deleteStudent(index) {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
  }
});
