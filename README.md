# - Microservico de Authentication

- Notes: 

O reino que será por exemplo a empresa, 
e os clients, são as aplicações (softwares) usados nessa empresa.

Por exemplo, empresa (Microsoft) e client (AppRH).

O users, são afectos ao reino, desta feita poderam ter acesso aos clientes.

Existem roles para os reinos e para os clientes, todas elas podem ser aplicadas aos users,
ao fazer o login, o user deve especificar o reino e o cliente que ele pretente ter uma sessão aprovada (válida).




## Microservice -  Keycloak

- create microservice of authentication using keycloak
- Note: O microservice do keycloak está em container (docker), mas,existe uma pasta
microservice usada para teste de integração com o keycloak.

### STEPS

- install
    - cd microservice > yarn install
        - http://localhost:5000
    - docker-compose up (vai levantar os service de loadbalancer do keycload)
        - http://localhost:8000
            - user: admin & pass:admin
        

- config do keycloak
    - create a realm (o reino que pode ter várias empresas)
    - create a client (que serão as empresas)
    - create a users (usuários afeto as empresas)
    - create a roles (regras a serem aplicadas aos users e client)
    - create a groups (para associar users)


- criando a integracao 
   
- protegendo as rotas
    -


# keycloak_microservicos_docker
- Keycload Micro-Servocos e Docker
# STEPS

## criacao das realms (reinos) - gerencia autenticação de um grupo de clientes
## criacao dos users - que irão  fazer o login - podem ser associados depois a um client (ex: todos os colaboradores)
## criacao dos clients (serão os nossos microservicos) - deve ter uma porta bem definida
    - passar alguns parametros obrigatorios 
        - Valid Redirect URIs - ex.: http://localhost:3000/*
        - Root URL - ex.: http://localhost:3000
        - Web Origins - ex.: http://localhost:3000
        - Admin URL - ex.: http://localhost:3000/admin
    - na aba credentials vamos encontrar o client secret

## criacao das rules do realm e dos clients - depois podem ser add aos users

## criacao de grupo com certas roles e add um user no grupo criado




### DOC -  KEYCLOAK
- https://github.com/keycloak/keycloak-nodejs-admin-client


## DOC - API 

- in route /api-docs : temos a documentação em swagger
- import o ficheiro Insomnia.json, no seu insomnia, para testes 


### how to init 

- habilitar no tsconfig.json
    - "resolveJsonModule": true,    

- link para se basear no JSON do swagger
    - https://petstore.swagger.io/v2/swagger.json


