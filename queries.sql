-- 4.1: SELECT ..... WHERE ....
-- With this query, i want to know if there are any equipments in use and not expired.

SELECT name, 
       manufacturer,
       start_date
FROM equipments
WHERE exp_date IS NULL AND start_date <= CURRENT_DATE;

--    name   | manufacturer | start_date 
-- ----------+--------------+------------
--  Computer | DELL         | 2024-09-07
--  Crane    | Western ORG  | 1994-08-01
-- (2 rows)


-- 4.2: JOIN
-- With this query, i want to know if there are any materials not in use in any specifications provided.

SELECT M.name, 
       M.type,
       M.price,
       M.measurement_unit,
       (M.alternative IS NOT NULL) has_alternative
FROM materials M
LEFT JOIN specifications S ON M.id = S.material_id
WHERE S IS NULL;

--   name  | type  | price | measurement_unit | has_alternative 
-- --------+-------+-------+------------------+-----------------
--  Copper | metal |  0.99 | kg               | t
-- (1 row)


-- 4.3: UPDATE (with non trivial WHERE clause)
-- With this query, we want to set 'Steel' as alternative material for any metal that has no alternative materials.

UPDATE materials
SET alternative = (
    SELECT id 
    FROM materials
    WHERE name = 'Steel'
)
WHERE id <> (
    SELECT id 
    FROM materials
    WHERE name = 'Steel'
)
  AND alternative IS NULL
  AND type = 'metal';

-- UPDATE 0 (no matches, the result is what we wanted)


-- 4.4: GROUP BY
-- With this query, we want to get the overall quantity of the same specifications used.

SELECT name, SUM(quantity) as overall_quantity
FROM specifications
GROUP BY name;

--        name       | overall_quantity 
-- ------------------+------------------
--  base             |             1000
--  head             |                1
--  projector part   |                2
--  controlling unit |                1
--  computing unit   |                3
--  shaft            |               10
-- (6 rows)


-- 4.5: SELECT with sub query
-- With this query, we want to get all specifications, that use materials labeled metal

SELECT name, duration
FROM specifications 
WHERE material_id = ANY (
    SELECT id
    FROM materials
    WHERE type = 'metal'
);

--  name  | duration 
-- -------+----------
--  head  |         
--  base  |         
--  shaft |    10.00
-- (3 rows)
