# 310 MATRIX CODE DOCUMENTATION

# To-Do App Documentation

## Table of Contents

1. Introduction
2. Project Overview
3. Requirements
   - Functional Requirements
   - Non-Functional Requirements
4. System Architecture
5. User Stories
6. API Documentation
7. Database Schema
8. Frontend Design
9. Testing Strategy
10. Deployment
11. Future Enhancements

---

## 1. Introduction

### Purpose

This document provides a comprehensive guide to developing, deploying, and maintaining the To-Do App. It is intended for the project's developers and testers.

### Scope

The To-Do App enables users to create, update, delete, and organize tasks efficiently. It includes features such as task categorization, priority settings, and due dates.

### Audience

- Developers
- Quality Assurance Teams
- Project Managers
- End-Users

---

## 2. Project Overview

### Project Goals

- Simplify task management for individual users.
- Provide a clean and intuitive user interface.

### Key Features

- User authentication.
- Task creation, editing, and deletion.
- Categorization of tasks (e.g., Work, Personal, Health, Urgent, Education, Shopping, Fitness, Hobbies, Travel, Finance, Clients).
- Priority levels (e.g., Urgent & Important, Not Urgent & Important, Urgent & Not Important, Not Urgent & Not Important).
- Due date.

---

## 3. Requirements

### Functional Requirements

- Users can create, edit, and delete tasks.
- Tasks can be categorized and prioritized.
- Users can add due dates.

---

## 4. System Architecture

### High-Level Architecture

- **Frontend**: Built with Next.js using React and Tailwind CSS.
- **Backend**: Built with Next.js for server-side API endpoints.
- **Database**: Supabase for structured task storage.
- **Authentication**: Supabase authentication.
- **Containerization**: Docker for development.
- **Heroku** for deployment.

### Diagram

Include a system architecture diagram showing the interaction between frontend, backend, database, and external APIs.

![image.png](./diagrams/architecture_diagram.png)

---

## 5. User Stories

- As a user, I want to add a new task so that I can track my to-do items.
- As a user, I want to set a priority for my tasks to focus on important items first.
- As a user, I want to receive reminders for tasks to ensure timely completion.
- As a user, I want to categorize my tasks for better organization.
- As a user, I want to access my tasks across multiple devices.

---

## 6. API Documentation

### Endpoints

1. **GET /API/categories**

   - Description: Retrieve a list of all categories.
   - Request Body: None
   - Response:

   ```json
   {
     "error": false,
     "message": "Categories Found",
     "data": {
       "categories": [
         {
           "category_id": "string",
           "name": "string"
         },
         ...
       ]
     }
   }

   ```

   - Error Response:

   ```json
   {
     "error": true,
     "message": "Error Fetching Categories",
     "data": null
   }
   ```

   OR

   ```json
   {
     "error": true,
     "message": "Categories Not Found",
     "data": null
   }
   ```

2. **POST /API/tasks/getTasks**

   - Description: Retrieve tasks based on category or fetch all tasks if no category is specified.
   - Request Body:

   ```json
   {
     "category": "integer" (optional)
   }

   ```

   - Response:

   ```json
   {
     "data": {
       "tasks": {
         "UI": [
           {
             "task_id": "string",
             "user_id": "string",
             "title": "string",
             "description": "string",
             "completed": "boolean",
             "due_date": "string",
             "priority_id": "integer",
             "category_id": "integer",
             "display_due_date": "string"
           }
         ],
         "NUI": [], // Same for all the arrays
         "UNI": [], // Same for all the arrays
         "NUNI": [] // Same for all the arrays
       }
     }
   }
   ```

   - Note: The `display_due_date` is dynamically set to "Today", "Tomorrow", or a formatted date string based on the task's due date.

3. **POST /API/tasks/addTask**

   - Description: Add a new task.
   - Request Body:

   ```json
   {
     "reqTaskData": {
       "user_id": "string",
       "title": "string",
       "description": "string",
       "completed": "boolean",
       "due_date": "string",
       "priority_id": "integer",
       "category_id": "integer"
     }
   }
   ```

   - Response:

   ```json
   {
     "error": false,
     "message": "Task Added Successfully"
   }
   ```

   - Error Response:

   ```json
   {
     "error": true,
     "message": "Unable to create task."
   }
   ```

4. **POST /API/tasks/updateTask**

   - Description: Update an existing task.
   - Request Body:

   ```json
   {
     "reqTaskData": {
       "task_id": "integer",
       "user_id": "string",
       "title": "string",
       "description": "string",
       "completed": "boolean",
       "due_date": "string",
       "priority_id": "integer",
       "category_id": "integer"
     }
   }
   ```

   - Response:

   ```json
   {
     "error": false,
     "message": "Task Complete"
   }
   ```

   - Error Response:

   ```json
   {
     "error": true,
     "message": "Unable to update task."
   }
   ```

5. **POST /API/tasks/deleteTask**

   - Description: Delete a task by its ID.
   - Request Body:

   ```json
   {
     "taskID": "integer"
   }
   ```

   - Response:

   ```json
   {
     "error": false,
     "message": "TaskID : <taskID> is deleted successfully"
   }
   ```

   - Error Response:

   ```json
   {
     "error": true,
     "message": "Unable to delete task."
   }
   ```

6. **GET /API/hello**

   - Description: Returns a simple greeting message.
   - Request Body: None
   - Response:

   ```json
   {
     "message": "Hello World"
   }
   ```

7. **POST /API/users/getUserDetails**

   - Description: Retrieve user details by user ID.
   - Request Body:

   ```json
   {
     "userID": "string"
   }
   ```

   - Response:

   ```json
   {
     "data": {
       "profile": {
         "username": "string",
         "status": "string",
         "description": "string"
       }
     }
   }
   ```

   - Error Response:

   ```json
   {
     "data": null,
     "error": "Error message"
   }
   ```

8. **POST /API/users/upsertUser**

   - Description: Insert or update a user based on their user ID.
   - Request Body:

   ```json
   {
     "user_id": "string",
     "username": "string",
     "email": "string",
     "description": "string",
     "status": "string"
   }
   ```

   - Response:

   ```json
   {
     "error": false,
     "message": "User Saved Successfully"
   }
   ```

   - Error Response:

   ```json
   {
     "error": "string",
     "message": "Action Not Successfully"
   }
   ```

---

## 7. Database Schema

### Tables

1. **Categories**
   - **category_id** (PK): A unique identifier for each category (auto-incremented).
   - **name**: The name of the category (unique).
   - **created_at**: The timestamp when the category was created (default: `now()`).
   - **updated_at**: The timestamp when the category was last updated (default: `now()`).
2. **Tasks**
   - **task_id** (PK): A unique identifier for each task (auto-incremented).
   - **user_id** (FK): Links to the `user_id` in the **Users** table, indicating the task owner.
   - **title**: The title of the task (max 255 characters).
   - **description**: A detailed description of the task (optional).
   - **category_id** (FK): Links to the `category_id` in the **Categories** table, categorizing the task.
   - **priority_id** (FK): Links to the `priority_id` in the **Priorities** table, representing task urgency.
   - **due_date**: The deadline for the task completion (optional).
   - **status**: The current status of the task, constrained to `Pending`, `In Progress`, or `Completed` (default: `Pending`).
   - **created_at**: The timestamp when the task was created (default: UTC `now()`).
   - **updated_at**: The timestamp when the task was last updated (optional).
   - **completed**: Indicates whether the task is completed (default: `false`).
3. **Users**
   - **user_id** (PK): A unique identifier for each user.
   - **username**: The name of the user (unique, max 50 characters).
   - **email**: The email address of the user (unique, max 100 characters).
   - **created_at**: The timestamp when the user account was created (default: `now()`).
   - **updated_at**: The timestamp when the user account was last updated (default: `now()`).
   - **password**: The hashed password for user authentication (optional).
   - **description**: Additional user details (optional).
   - **status**: The current status of the user (optional).

---

### Relationships

- **Users** ↔ **Tasks**:
  - **1-to-Many**: Each user can have multiple tasks.
  - `Tasks.user_id` is a foreign key referencing `Users.user_id`.
- **Tasks** ↔ **Categories**:
  - **Many-to-1**: Each task belongs to one category.
  - `Tasks.category_id` is a foreign key referencing `Categories.category_id` (on delete: set null).
- **Tasks** ↔ **Priorities** (not provided in the schema but mentioned):
  - **Many-to-1**: Each task has one priority level.
  - `Tasks.priority_id` is a foreign key referencing `Priorities.priority_id` (on delete: set null).

---

## 8. Frontend Design

### UI Wireframes

Attach wireframes or describe key screens:

- **Home Screen**: Displays categorized task lists.
- **Task Details Screen**: Shows full details of a task.
- **Add/Edit Task Screen**: Allows users to input or update task information.

### Components

- TaskCard
- TaskForm
- CategoryFilter
- PrioritySelector

---

## 9. Testing Strategy

### Unit Testing

- Framework: Jest
- Example: Test task creation API functionality.

---

## 10. Deployment

### Hosting

- Frontend and Backend: Hosted on Heroku.
- Database: Supabase.

### CI/CD Pipeline

- GitHub Actions for continuous integration and deployment.
- Docker for containerized development and deployment on Heroku.

---

## 11. Future Enhancements

- Add collaboration features for shared task lists.
- Integrate AI to suggest task prioritization.
- Include offline mode with local storage.

---

## 12. Appendices

### Glossary

- **Task**: An item on a user’s to-do list.
- **Category**: A grouping for related tasks.
- **Priority**: The level of importance of a task.

### References

- Next.js Documentation
- Supabase Documentation
- Tailwind CSS Documentation
- Docker Documentation
- Heroku Documentation
- ChatGPT
- StackOverflow
- GeeksForGeeks
