const FIND_PEOPLE_NAMES = `SELECT name from people`;

const CREATE_PEOPLE_TABLE = `
  CREATE TABLE people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )
`;

const CHECK_TABLE = `
  SELECT COUNT(*)
  AS count
  FROM information_schema.tables 
  WHERE table_schema = 'nodedb' 
  AND table_name = 'people';
`;

export { FIND_PEOPLE_NAMES, CREATE_PEOPLE_TABLE, CHECK_TABLE };