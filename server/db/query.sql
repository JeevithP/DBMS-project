-- Create the 'department' table (parent for student and counsellor)
CREATE TABLE department (
    did INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)
);

-- Create the 'counsellor' table (references 'department')
CREATE TABLE counsellor (
    cid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    department_id INT UNSIGNED,
    username VARCHAR(255),
    password VARCHAR(255),
    FOREIGN KEY (department_id) REFERENCES department(did)
);

-- Create the 'student' table (references 'department' and 'counsellor')
CREATE TABLE student (
    sid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usn VARCHAR(255),
    name VARCHAR(255),
    email VARCHAR(255),
    department_id INT UNSIGNED,
    counsellor_id INT UNSIGNED,
    created_at TIMESTAMP,
    username VARCHAR(255),
    password VARCHAR(255),
    FOREIGN KEY (department_id) REFERENCES department(did),
    FOREIGN KEY (counsellor_id) REFERENCES counsellor(cid)
);

-- Create the 'club' table
CREATE TABLE club (
    cid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
);

-- Create the 'events' table (references 'club')
CREATE TABLE events (
    eid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    points INTEGER,
    club_id INT UNSIGNED,
    description TEXT,
    FOREIGN KEY (club_id) REFERENCES club(cid)
);

-- Create the 'event_student' table (references 'student' and 'events')
CREATE TABLE event_student (
    esid INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    points INTEGER,
    student_id INT UNSIGNED,
    event_id INT UNSIGNED,
    FOREIGN KEY (student_id) REFERENCES student(sid),
    FOREIGN KEY (event_id) REFERENCES events(eid)
);
