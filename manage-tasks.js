import config from './config.js';

// You can access the apiUrl like this
const apiUrl = config.apiUrl;


document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
});

async function fetchTasks() {
    try {
        const response = await fetch(`${apiUrl}/todo/todolist`); // Updated API endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const tasks = await response.json();
        displayTasks(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function displayTasks(tasks) {
    const taskTableBody = document.querySelector('#task-table tbody');
    taskTableBody.innerHTML = '';

    tasks.forEach(task => {
        // Log the todoId for each task
        console.log('Todo ID:', task.todoId);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.todoTitle}</td>
            <td>${task.todoDescription}</td>
            <td>${task.todoDate}</td>
            <td>${task.isComplete ? 'Yes' : 'No'}</td>
            <td>
                <button class="edit-button" data-taskid="${task.todoId}">Edit</button>
                <button class="delete-button" data-taskid="${task.todoId}">Delete</button>
            </td>
        `;

        // Add event listeners for edit and delete buttons
        const editButton = row.querySelector('.edit-button');
        const deleteButton = row.querySelector('.delete-button');

        editButton.addEventListener('click', async () => {
            // Get the task ID from the task object
            const taskId = task.todoId;
            console.log(`Edit button clicked for task ID: ${taskId}`);
        
            try {
                // Fetch the task list
                const response = await fetch(`${apiUrl}/todo/todolist`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
        
                const tasks = await response.json();
        
                // Find the task with the matching taskId
                const taskToEdit = tasks.find(task => task.todoId === taskId);
        
                if (taskToEdit) {
                    // Redirect to the edit task page with pre-filled values
                    // Replace 'edit-task.html' with the correct URL of your edit task page
                    window.location.href = `edit-task.html?id=${taskId}&title=${taskToEdit.todoTitle}&description=${taskToEdit.todoDescription}&date=${taskToEdit.todoDate}&completed=${taskToEdit.isComplete}`;
                } else {
                    console.error(`Task with ID ${taskId} not found.`);
                }
            } catch (error) {
                console.error('Error fetching task details for edit:', error);
            }
        });
        
        

        deleteButton.addEventListener('click', async () => {
            // Get the task ID from the task object
            const taskId = task.todoId;
            console.log(`Delete button clicked for task ID: ${taskId}`);

            // Confirm the deletion with the user (optional)
            const confirmed = confirm('Are you sure you want to delete this task?');

            if (confirmed) {
                try {
                    // Send a DELETE request to the API to delete the task
                    const response = await fetch(`${apiUrl}/todo/deleteitem/${taskId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    console.log(response.status);
        
                    if (response.status === 204 || response.status === 200) {
                        // Task deleted successfully, remove the row from the table
                        row.remove();
                    } else {
                        console.error('Failed to delete task:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error deleting task:', error);
                }
            }
        });

        taskTableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTasks();
    const homeButton = document.getElementById('home-button');
    homeButton.addEventListener('click', () => {
        // Navigate back to the index page
        window.location.href = 'index.html';
    });
});
