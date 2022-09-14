# Referência
https://medium.com/@sevcsik/authentication-using-https-client-certificates-3c9d270e8326

# Servidor
## Criar certificado
```
openssl req -x509 -newkey rsa:4096 -keyout server_key.pem -out server_cert.pem -nodes -days 365 -subj "/CN=localhost/O=Client\ Certificate\ Demo"
```

# Cliente
## Criar chave
```
openssl req -newkey rsa:4096 -keyout alice_key.pem -out alice_csr.pem -nodes -days 365 -subj "/CN=Alice"
```

## Usar servidor como CA para certificar cliente
```
openssl x509 -req -in alice_csr.pem -CA server_cert.pem -CAkey server_key.pem -out alice_cert.pem -set_serial 01 -days 365
```

## Exportar certificado
```
openssl pkcs12 -export -clcerts -in alice_cert.pem -inkey alice_key.pem -out alice.p12
```

## Configurar o navegador para usar o certificado
In Firefox, go to Preferences -> Advanced -> View Certificates -> Import, and choose files.

# Como usar
## Ligar servidor
```
node app.js
```

## Acessar
```
https://localhost:8000
```