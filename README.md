# auth-service

Authentication service

## How to run code

openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

create .env file in auth-service folder to store PostgreSQL credentials

DB_HOST=localhost  
DB_PORT=5432  
DB_USER=postgres  
DB_PASS=  
DB_NAME=userdb  

npm install

yarn run start