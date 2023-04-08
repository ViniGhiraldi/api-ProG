# api-ProG

### IDEIA DO PROJETO:
Este sistema se resuma a uma ideia simples: permitir que o usuário seja capaz de criar, alterar, deletar e consultar projetos.
Para tal, ele precisa estar logado na API, através de um token de acesso que dura por 24 horas.
Para a continuidade deste projeto, esta API será consumida pelo front-end no futuro, e o mesmo será versionado no GitHub.

### FERRAMENTAS UTILIZADAS
TypeScript: Linguagem utilizada para escrever os códigos da aplicação;
NodeJs: Ambiente no qual a aplicação será executada após a conversão do TypeScript;
Express: Framework com recursos adicionais;
DotEnv: Pacote usado para gerenciar as váriaveis de ambiente;
ZOD: Construtor de validações de dados;
Knex: Construtor de consultas de banco de dados;
SQLite3: Biblioteca com uma base de dados pequena embutida, utilizada para testes no ambiente de desenvolvimento;
JsonWebToken: Utilizado para controle e gerenciamento de permissões na aplicação;
Bcryptjs: Biblioteca para encriptação de dados, utilizado em especial na senha dos usuários;
CORS: Controle da política de privacidade da aplicação, define quem pode fazer requisições para ela;
Jest e Supertest: Ambientes utilizados para desenvolver e executar os testes.

### OBJETIVO DA APLICAÇÃO
Desenvolvi este software com o intuito de testar a ferramenta ZOD.
