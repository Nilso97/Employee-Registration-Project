## API Rest desenvolvida em Node.js - Cadastro de Funcionários  👨‍💻 👨‍🔧 👩‍🔧

Recentemente comecei a estudar Autenticação de APIs Web e me deparei com JWT (Json Web Token), então resolvi fazer esse projetinho simples mesmo, somente para estudos...

- As rotas "/home", "/login" são públicas;
- Já as rotas "/employees/registration", "/employees/:name", "/employees" e "/logout" são todas privadas;

Para realizar a <strong>LISTAGEM (Único usuário) / ATUALIZAÇÂO / DELEÇÂO</strong>, a busca será feita através do ":name"
Ex: http://localhost:3000/employees/John

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

![bash](https://user-images.githubusercontent.com/96146165/171494132-7badb183-d71a-4b07-b2e1-50fd2346627f.png)

### Testes no API Client Insomnia
- A primeira rota Pública será a Home Page do Sistema:

![Home Page](https://user-images.githubusercontent.com/96146165/171482160-5e7179a8-6b10-40a7-a27a-95f0c93fdcde.png)

- Ao realizar o Login com os dados de Usuário (user) e senha (password), será disponibilizado automaticamente um token caso os usuário tenha permissão para acessar o sistema

![Login - Token](https://user-images.githubusercontent.com/96146165/171476785-404059c0-aab6-449a-92a8-344c23a949ad.png)

Caso contrário acusará um erro 401 - Usuário não tem autorização para acessar essa rota...

![Erro - Token](https://user-images.githubusercontent.com/96146165/171476829-06c98b92-645b-4e5a-b12d-fe4d009e1917.png)

- Para o usuário poder acessar as demais rotas privadas, ele deverá com anexar o Token de autenticação junto ao cabeçalho "x-access-token" na API Client Insomnia, caso contrário ele não terá permissão para acessar as rotas para cadastrar funcionários ou listá-los...

![Inserir Token](https://user-images.githubusercontent.com/96146165/171476898-b8c5abef-04d4-4e52-b9e0-ec5910145d3d.png)

- Usuário Registrado com sucesso!!!

![Registrado](https://user-images.githubusercontent.com/96146165/171482627-8d535762-5fb0-494f-8093-43d5dd27217d.png)

- Caso queira deletar algum usuário, precisará fazer a busca pelo "Primeiro nome" do usuário...
Ex: /John

![Deletado com sucesso](https://user-images.githubusercontent.com/96146165/171482739-d8bca5f6-5bce-47bf-a95a-3df6ec0a3172.png)

- Se o usuário não foi cadastrado anteriormente no Sistema ou seja não consta na lista de "usuários cadastrados" será exibido uma mensagem na tela:

![Erro - Funcionário não encontrado](https://user-images.githubusercontent.com/96146165/171484011-746e8ec1-50d8-4e24-9104-4f21e0c3bb8d.png)

- Após o usuário realizar o Logout ele será disconectado e não terá mais acesso à nenhuma das rotas da API, para ele ter seu acesso concedido novamente ele deverá realizar todo o processo de Login lovamente...

![Logout](https://user-images.githubusercontent.com/96146165/171478326-9e93a0a3-0432-4ffb-81e1-883d310ce1e9.png)

