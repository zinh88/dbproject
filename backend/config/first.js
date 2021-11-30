const pool = require('./db')
const bcrypt = require('bcrypt')

const makeFirst = async () => {
    const email = '23100008@lums.edu.pk';
    const name = 'Zain';
    const pass = '1234';
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(pass, salt);
    console.log(`hashed : ${hashed}`);
    pool.query(`INSERT INTO members VALUES (DEFAULT, \'${email}\', \'${hashed}\', \'${name}\')`, (error, results) => {
        if(error) throw error
        else console.log(results)
    })
}

makeFirst();