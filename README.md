## API Rest desenvolvida em Node.js - Cadastro de Funcionários

Recentemente comecei a estudar Autenticação de APIs Web e me deparei com JWT (Json Web Token), então resolvi fazer esse projetinho simples mesmo, somente para estudos...

### JWT - Json Web Token
O JSON Web Token é um padrão da Internet para a criação de dados com assinatura opcional e/ou criptografia cujo payload contém o JSON que afirma algum número de declarações. Os tokens são assinados usando um segredo privado ou uma chave pública/privada.

Link de uma matéria do site DevMedia sobre JWT: 
https://www.devmedia.com.br/como-o-jwt-funciona/40265

### Requisitos para rodar a API
Instale essas depêndencias:
- npm install nodemon express body-parser jsonwebtoken --save
ou
- yarn add nodemon express body-parser jsonwebtoken --save

Rodando a API:
-- nodemon src/app.js

![Terminal](https://user-images.githubusercontent.com/96146165/170122860-077a79d6-e578-41c8-bb95-71c27350d7ed.png)

### Testes no API Client Insomnia
- Ao realizar o Login com os dados de Usuário (user) e senha (password), será disponibilizado automaticamente um token caso os usuário tenha permissão para acessar o sistema, caso contrário acusará um erro 401

![Token](https://user-images.githubusercontent.com/96146165/170123599-3aeef456-39ce-4abe-a38b-31d250f06588.png)

- Para o usuário poder acessar as demais rotas privadas, ele deverá com anexar o Token de autenticação junto ao cabeçalho "x-access-token" na API Client Insomnia, caso contrário ele não terá permissão para acessar as rotas para cadastrar funcionários ou listá-los...

![Token 2](https://user-images.githubusercontent.com/96146165/170124434-f58c7637-f11e-44c8-a052-c279609989fd.png)

- Após o usuário realizar o Logout ele será disconectado e não terá mais acesso à nenhuma das rotas da API, para ele ter seu acesso concedido novamente ele deverá realizar todo o processo de Login lovamente...

![Logout](https://user-images.githubusercontent.com/96146165/170124682-aa3c1cd0-f97b-43e0-96ae-b8aed164ba71.png)
