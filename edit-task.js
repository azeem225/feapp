import config from './config.js';

// You can access the apiUrl like this
const apiUrl = config.apiUrl;


document.addEventListener('DOMContentLoaded', () => {

// JavaScript code to retrieve query parameters and pre-fill form fields
const queryParams = new URLSearchParams(window.location.search);
const titleField = document.getElementById('title');
const descriptionField = document.getElementById('description');
const dateField = document.getElementById('date');
const completedField = document.getElementById('completed');


// Function to format date as "dd-mm-yyyy"
function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// Set form field values from query parameters
titleField.value = queryParams.get('title') || '';
descriptionField.value = queryParams.get('description') || '';
dateField.value = queryParams.get('date') || '';
completedField.checked = queryParams.get('completed') === 'true';

// Add event listener for form submission
const editTaskForm = document.getElementById('edit-task-form');
editTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Retrieve the task ID from the query parameters
    const taskId = queryParams.get('id');

    // Prepare data to send in the PUT request
    const formData = new FormData(editTaskForm);
    const requestData = {
        todoTitle: formData.get('title'),
        todoDescription: formData.get('description'),
        todoDate: formatDate(formData.get('date')), // Format the date
        isComplete: formData.get('completed') === 'on', // Checkbox value
    };

    try {
        // Send a PUT request to update the task
        const response = await fetch(`${apiUrl}/todo/updateitem/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (response.status === 200 || response.status === 204) {
            // Task updated successfully, display a success message
            alert('Task updated successfully.');

             // Redirect back to the manage task page
            window.location.href = 'manage-tasks.html';
            
        } else {
            // Task update failed, display an error message
            alert('Failed to update task. Please try again.');
        }
    } catch (error) {
        console.error('Error updating task:', error);
    }
});

});
