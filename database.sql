-- RAHAYOO DB QUERY

-- CREATE DATABASE RAHAYOO
CREATE DATABASE rahayoover2_db;

-- TABLE company
CREATE TABLE company (
  company_id INT PRIMARY KEY AUTO_INCREMENT,
  company_name VARCHAR(50)
);

-- TABLE DEPARTMENT
CREATE TABLE department (
  department_id INT PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(50),
  company_id INT,
  FOREIGN KEY (company_id) REFERENCES company(company_id)
);

-- TABLE HRD
CREATE TABLE hrd (
  hrd_id INT PRIMARY KEY AUTO_INCREMENT,
  hrd_name VARCHAR(50),
  username VARCHAR(50),
  password VARCHAR(50),
  company_id INT,
  FOREIGN KEY (company_id) REFERENCES company(company_id)
);

-- TABLE EMPLOYEES
CREATE TABLE employees (
  employee_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50),
  address TEXT,
  date_of_birth DATE,
  age INT,
  department_id INT,
  email VARCHAR(50),
  FOREIGN KEY (department_id) REFERENCES department(department_id)
);

-- TABLE MOOD
CREATE TABLE mood (
  mood_id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT,
  date DATE,
  mood_value INT,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

-- TABLE STRESS LEVEL
CREATE TABLE stress_level (
  stress_id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT,
  date DATE,
  stress_value INT,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
