INSERT INTO department (d_id, d_name)
VALUES (100, "Sales"),
    (200, "Quality Control"),
    (300, "Production"),
    (400, "Inventory"),
    (500, "Development"),
    (600, "Research");

INSERT INTO role (r_id, r_title, r_salary, r_department_id)
VALUES (480, "Assistant", 15000, 400),
       (170, "Manager", 20000, 100),
       (180, "Salesman", 70000, 100),
       (580, "Programmer", 15000, 500),
       (670, "Analyst", 20000, 600),
       (370, "Lineman", 70000, 300),
       (780, "Tester", 15000, 500),
       (270, "Packer", 20000, 300),
       (380, "Tagger", 70000, 300);

INSERT INTO employee (e_id, e_first_name, e_last_name, e_role_id, e_manager_id)
VALUES (2009, "Jones", "Mary", 170, 3),
       (2023, "Smith", "Alexa", 580, 1),
       (1009, "Davis", "Liam", 270, 4),
       (1023, "Hansen", "Jim", 180, 2),   
       (4009, "Lane", "Padi", 580, 3),
       (4023, "Nguyen", "Tran", 380, 9),
       (7009, "Abrahm", "AJ", 170, 3),
       (8023, "Peterson", "Alex", 780, 1),
       (6009, "Gentry", "Luna", 270, 4),
       (6023, "Adams", "Michael", 180, 5),   
       (5009, "Edwards", "George", 480, 3),
       (3023, "Nigel", "Pete", 380, 1),
       (2012, "Jerm", "Michelle", 670, 2),
       (2024, "Lindt", "Mandy", 580, 1),
       (1015, "Colonel", "Linda", 270, 8),
       (1053, "Handy", "Katie", 180, 2),   
       (4019, "Little", "Karen", 480, 7),
       (4073, "Nod", "Lucy", 380, 6);