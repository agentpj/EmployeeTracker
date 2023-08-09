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
VALUES (2009, "Jones", "Mary", 170, 1009),
       (2023, "Smith", "Alexa", 580, 1023),
       (1009, "Davis", "Liam", 270, 1023),
       (1023, "Hansen", "Jim", 180, 4009),   
       (4009, "Lane", "Padi", 580, 2009),
       (4023, "Nguyen", "Tran", 380, 2023),
       (7009, "Abrahm", "AJ", 170, 2009),
       (8023, "Peterson", "Alex", 780, 6023),
       (6009, "Gentry", "Luna", 270, 4023),
       (6023, "Adams", "Michael", 180, 1053),   
       (5009, "Edwards", "George", 480, 4023),
       (3023, "Nigel", "Pete", 380, 2012),
       (2012, "Jerm", "Michelle", 670, 1023),
       (2024, "Lindt", "Mandy", 580, 2009),
       (1015, "Colonel", "Linda", 270, 6023),
       (1053, "Handy", "Katie", 180, 7009),   
       (4019, "Little", "Karen", 480, 4023),
       (4073, "Nod", "Lucy", 380, 5009);