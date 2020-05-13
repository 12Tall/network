-- 不重复插入
INSERT INTO service (controller, service) 
    SELECT * FROM (SELECT  'User' AS controller,'add' AS service) AS temp 
        WHERE NOT EXISTS (SELECT controller, service FROM service WHERE controller = 'User' AND service = 'add' LIMIT 1);