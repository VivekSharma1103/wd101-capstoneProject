let userform = document.getElementById('user-form'); 

const retrieveEnteries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

let userEntries = retrieveEnteries();

const displayEntries = () => {
    let entries = retrieveEnteries();  
    const tableEntries = entries.map((entry) => {
        const nameCell = `<td class='border px-4 py-2 text-white'>${entry.name}</td>`;  
        const emailCell = `<td class='border px-4 py-2 text-white'>${entry.email}</td>`;
        const passwordCell = `<td class='border px-4 py-2 text-white'>${entry.password}</td>`;
        const dobCell = `<td class='border px-4 py-2 text-white'>${entry.dob}</td>`;
        const acceptTermsCell = `<td class='border px-4 py-2 text-white'>${entry.acceptedTerms}</td>`;  
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join('\n');

    const table = `
        <table class='table-auto w-full'>
            <tr>
                <th class='px-4 py-2 text-white'>Name</th>
                <th class='px-4 py-2 text-white'>Email</th>
                <th class='px-4 py-2 text-white'>Password</th>
                <th class='px-4 py-2 text-white'>DOB</th>
                <th class='px-4 py-2 text-white'>Accepted Terms?</th>
            </tr>
            ${tableEntries}
        </table>
    `;

    let details = document.getElementById('user-entries');
    details.innerHTML = table;
}

const saveUserForm = (event) => {
    event.preventDefault();  // Prevent form submission
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('terms').checked;

    const entry = {
        name,   
        email,
        password,
        dob,
        acceptedTerms
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
    userform.reset();  // Reset the form after submission
}

// Add event listener to form submission
userform.addEventListener("submit", saveUserForm);

// Initial call to display the entries when the page loads
displayEntries();
