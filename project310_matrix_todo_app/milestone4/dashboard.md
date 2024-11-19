# Milestone 4 - Dashboard Summary

# Overview

The team has made progress in the development of the project over the last cycle. We've collectively tackled essential components to ensure both frontend and backend functionalities are coming together smoothly. Below is a summary of our progress so far, reflecting our efforts in an Agile environment.

### Activities Overview

1. **NextJS with Supabase Setup**
    - **PR #2** by `samjain215`: Initialized the NextJS application and established the Supabase database connection successfully. This setup forms the foundation of our project.
2. **Get Tasks Page UI Development**
    - **PR #3** by `anshr18`: Created the UI for the "Get Tasks" page, allowing users to view tasks. This PR set the baseline for the task management features.
3. **Add Task CRUD Operations**
    - **PR #4** by `samjain215`: Created the Add Task CRUD functionality. This allows users to create, read, update, and delete tasks, marking a significant backend milestone.
4. **Add Task UI Implementation**
    - **PR #5** by `anshr18` & `samjain215`: Developed and integrated the UI to support adding tasks, ensuring a more intuitive interface for user interaction.
5. **Get Tasks Endpoint Integration**
    - **PR #6** by `arjunsampat`: Added the "Get Tasks" functionality to retrieve tasks from the database, linking the backend data to the frontend.
6. **Authentication (Auth) UI and Backend Integration**
    - **PR #7** by `samjain215`: Designed and implemented both the UI and backend components for authentication, securing access to the application.
7. **Add Task Unit Testing**
    - **PR #8** by `arjunsampat`: Developed unit tests for the add task functionality, ensuring that all aspects of task addition work as expected and are reliable.

### Completed and Pending Tasks

- **Completed Tasks**:
    - Supabase setup with NextJS.
    - UI development for viewing and adding tasks.
    - Full CRUD functionality for tasks, including Add, Get
    - Authentication (Auth) integration.
    - Unit tests for Add Task feature.
- **Pending Tasks**:
    - Revamp the Authentication Using Supabase.
    - Implement task update and delete UI.
    - Develop additional test cases for all CRUD functionalities.
    - Integrate more robust error handling mechanisms.
    - Write Tests for the other APIs such as (Delete, Update, Authenticate, ...)
    - Share Tasks
    - Collaborate Tasks and Change the view based on the user
    - Dockerisation
    - CI/CD Pipeline (Automation of Tests)

### Agile Metrics

- **Velocity**: The team has completed 7 Pull Requests in this cycle.

### Review & Retrospective (R&R)

- **Successes**: Successful setup of the project foundation with the integration of NextJS and Supabase, seamless task management CRUD operations, and effective user authentication.
- **Challenges**: Implementing unit tests and integrating the backend with UI smoothly posed some challenges. We will focus on improving collaboration between the frontend and backend teams.
- **Process Reflection**: The team has reflected on our current Agile process. Overall, the process is working well, with good communication and coordination between team members. However, we need to streamline testing and merging procedures to improve efficiency and maintain velocity. No major changes are needed at this time, but we will keep monitoring our process for improvements.

### Branches/Tasks Completed and Merged

- **Branches Completed**:
    - `samyak/db-connection`: Initialized the project and set up the Supabase integration.
    - `ansh/UI_getTasks`: Developed the UI for viewing tasks.
    - `samyak/CRUD_operations`: Implemented CRUD operations for tasks.
    - `ansh/UI_addTask`: Added the UI for task addition.
    - `arjun/addTask_Test`: Added unit tests for task addition.
    - `samyak/auth_ui_plus_backend`: Developed authentication features.
    - `arjun/get-tasks`: Added unit tests for fetching task.

### Release Candidate

The project currently has a working version with partial functionality that includes task viewing, adding, and authentication. This version is available on the `requirements_engineering` branch and will be further refined in subsequent releases.

### Testing Report

- **What's Working**:
    - Authentication, task viewing, and adding are functioning as expected.
    - Unit tests for adding tasks have passed successfully.
- **What's Not**:
    - Task update and delete functionalities are still under development.
    - Additional test cases are needed for complete CRUD testing.

### Next Steps

- Focus on completing the update and delete UI for tasks.
- Expand test coverage to improve reliability and maintain code quality.
- Monitor our Agile metrics, such as velocity, to ensure we are meeting project goals.

### Summary

This dashboard summary provides a snapshot of our progress and serves as a reflection on the functioning of the project. While we have made significant headway, there is still more work to do. Reflecting on our progress allows us to keep track of where we are in the scope of the project and helps ensure alignment with our overall goals.