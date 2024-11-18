DROP TABLE IF EXISTS Reminders;
DROP TABLE IF EXISTS Task_Collaborators;
DROP TABLE IF EXISTS Tasks;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Priorities;
DROP TABLE IF EXISTS Permissions;
DROP TABLE IF EXISTS Users;

-- Users Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories Table
CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Priorities Table
CREATE TABLE Priorities (
    priority_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    level INT NOT NULL, -- Lower values = higher priority
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Permissions Table
CREATE TABLE Permissions (
    permission_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Tasks Table
CREATE TABLE Tasks (
    task_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT REFERENCES Categories(category_id) ON DELETE SET NULL,
    priority_id INT REFERENCES Priorities(priority_id) ON DELETE SET NULL,
    due_date DATE,
    status TEXT CHECK (status IN ('Pending', 'In Progress', 'Completed')) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Task Collaborators Table
CREATE TABLE Task_Collaborators (
    task_id INT NOT NULL REFERENCES Tasks(task_id) ON DELETE CASCADE,
    collaborator_id INT NOT NULL REFERENCES Users(user_id) ON DELETE CASCADE,
    permission_id INT NOT NULL REFERENCES Permissions(permission_id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (task_id, collaborator_id)
);

-- Reminders Table
CREATE TABLE Reminders (
    reminder_id SERIAL PRIMARY KEY,
    task_id INT NOT NULL REFERENCES Tasks(task_id) ON DELETE CASCADE,
    reminder_date TIMESTAMP NOT NULL,
    notification_method TEXT CHECK (notification_method IN ('Email', 'SMS', 'Push Notification')) DEFAULT 'Push Notification',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert Categories
INSERT INTO Categories (name)
VALUES
('Work'),
('Personal'),
('Health'),
('Urgent'),
('Education'),
('Shopping'),
('Fitness'),
('Hobbies'),
('Travel'),
('Finance');