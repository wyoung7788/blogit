const bcrypt = require('bcryptjs');

const passwordHash = 'pw123';

bcrypt.hash(passwordHash, 10, (err, hash) => {
    if (err){
        console.error('Error hashing:', error)
        return;
    }
    console.log(hash);
});