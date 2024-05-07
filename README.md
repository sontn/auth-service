# auth-service

Authentication and Blog services

## How to run code

```bash
$ openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
```

create .env file in auth-service folder to store PostgreSQL credentials

```bash
DB_HOST=localhost  
DB_PORT=5432  
DB_USER=postgres  
DB_PASS=  
DB_NAME=userdb  
```

```bash
$ npm install

$ yarn run start
```