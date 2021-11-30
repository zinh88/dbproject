const pool = require('../config/db')
const bcrypt = require('bcrypt')

pool.query('SELECT * FROM members WHERE email = \'23100008@lums.edu.pk\'', (err, result) => {
    //if (err) throw err;
    //else console.log(result)
    const pass = result.rows[0].hashedpassword;
    console.log(pass);
    bcrypt.compare('1234', pass, (_, result) => {  // Compare
        // if passwords match
        if (result) {
              console.log('Correct password');
        }
        // if passwords do not match
        else {
              console.log('Wrong password');
        }
    });
});