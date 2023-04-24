const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(__dirname + '/db.sqlite');

const DB = {
    getUserInfo: async ({user_id = null, username = null}) => {
        let subQuery = '';
        if (user_id === null && username === null) return null;
        user_id ? subQuery = `WHERE id = ${user_id}` : subQuery = `WHERE username = '${username}'`;

        return new Promise((resolve) => {
            db.get(`SELECT *
                    FROM users ${subQuery}`, (err, row) => {
                if (err) console.log(err);
                resolve(row);
            });
        });
    },

    createUser: async (username, hash_password) => {
        return new Promise((resolve) => {
            db.get(`INSERT INTO users (username, hash_password, role)
                    VALUES ('${username}', '${hash_password}', 0)
                    returning id`, (err, row) => {
                if (err) console.log(err);
                resolve(row.id);
            });
        });
    },
    changePassword: async (user_id, hash_password) => {
        return new Promise((resolve) => {
            db.run(`UPDATE users
                    SET hash_password = '${hash_password}'
                    WHERE id = ${user_id}`, (err) => {
                if (err) console.log(err);
                resolve();
            });
        });
    },
    addSession: async (user_id, token) => {
        return new Promise((resolve) => {
            db.run(`INSERT INTO sessions (user_id, token)
                    VALUES ('${user_id}', '${token}')`, (err) => {
                if (err) console.log(err);
                resolve();
            });
        });
    },

    checkSession: async (user_id, token) => {
        return new Promise((resolve) => {
            db.get(`SELECT *
                    FROM sessions
                    WHERE token = '${token}'
                      AND user_id = '${user_id}'
            `, (err, row) => {
                if (err) console.log(err);
                resolve(row);
            });
        });
    },
    deleteSession: async (user_id) => {
        return new Promise((resolve) => {
            db.run(`DELETE
                    FROM sessions
                    WHERE user_id = '${user_id}'`, (err) => {
                if (err) console.log(err);
                resolve();
            });
        });
    },
    setRole: async (user_id, role) => {
        return new Promise((resolve) => {
            db.run(`UPDATE users
                    SET role = '${role}'
                    WHERE id = '${user_id}'`, (err) => {
                if (err) console.log(err);
                resolve();
            });
        });
    }
};

module.exports = DB;
