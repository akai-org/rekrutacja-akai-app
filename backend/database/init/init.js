db = db.getSiblingDB('akai-recruitment-app');

db.createUser({
    user: 'akai-recruitment-app',
    pwd: 'password',
    roles: [{ role: 'readWrite', db: 'akai-recruitment-app' }]
});

db.users.insertOne({
    email: 'marcin_kaczor@mail.com',
    password_hash: '$2y$10$jR1KvfGE3rj4PiyjVMq8MuO8QbMSjls7iDTw24liEADvYnAIDl3W6'
});
