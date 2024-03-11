# Frontend - Sistema de Gerenciamento de Projetos

## Trabalho 1 - Engenharia de Software 2

Implementação do frontend do 1º trabalho da disciplina de Engenharia de Software II sobre Scrum.

## Índice

1. [Descrição](#descrição)
2. [Tecnologias Utilizadas](#tecnologias)
3. [Instalação](#instalação)
   1. [Instalação do Frontend - Para desenvolvimento](#instalação-do-frontend)
   2. [Instalação da Api - Para desenvolvimento](#instalação-da-api)
4. [Execução](#execução)
   1. [Execução da Api - Para desenvolvimento](#execução-da-api)
   2. [Execução do Frontend - Para desenvolvimento](#execução-do-frontend)
5. [Estrutura do Projeto](#estrutura-do-projeto)
   1. [Diretórios](#estrutura-de-diretórios)
   2. [Descrição](#descrição-dos-diretórios)

---

## Descrição

O projeto consiste numa aplicação de Cadastros de Projetos utilizando o framework SCRUM. Essa é a implementação do frontend da aplicação. A aplicação encontra-se hospedada em: [https://t1-es2-frontend-648c67252b2e.herokuapp.com/](https://t1-es2-frontend-648c67252b2e.herokuapp.com/) para acesso público.

---

## Tecnologias

- [Next.js](https://nextjs.org/): Framework React para desenvolvimento da aplicação.
- [Material-UI](https://mui.com/material-ui/): Biblioteca de componentes React.
- [Docker](https://www.docker.com/): Plataforma para desenvolvimento, envio e execução de aplicativos em contêineres.
- [Docker Compose](https://docs.docker.com/compose/): Ferramenta para definir e executar aplicativos Docker de vários contêineres.

## Instalação

- Versão do Node: 20.11.1

### Instalação do frontend para desenvolvimento (repositório privado)

1. Clone o repositório do GitHub: [https://github.com/Larilw/trabalho1-es2-frontend](https://github.com/Larilw/trabalho1-es2-frontend)
2. Entre na raiz do repositório.
3. Instale as dependências com o comando:

```console
  npm install
```

### Instalação da api para desenvolvimento

1.  Siga as instruções de instalação do README do repositório do GitHub: [https://github.com/guilhermemon18/trabalho1-es2-backend](https://github.com/guilhermemon18/trabalho1-es2-backend)

---

## Execução para desenvolvimento

### Execução do frontend

1. Entre na raiz do repositório do projeto.
2. Execute o seguinte comando:

- ```console
  npm run dev
  ```

- Ao executar esse comando, o servidor de desenvolvimento do frontend irá tentar inicializar e rodar na porta 3000, se ocorrer algum erro será utilizada a porta 3001.

## Estrutura do projeto

### Estrutura de diretórios

Os arquivos do repositório seguem a seguinte estrutura:

```
── /public
│
└── /src
├── /app
├── /components
├── /models
└── /pages

```

### Descrição dos Diretórios

- '/public': Contém as imagens utilizadas no projeto.

- '/src/components': Contém componentes utilizados nas páginas da aplicação listas, dialogs e campo de busca.

- '/src/models': Contém as definições de interface para Endereço, Profissional, Projeto e Time.

- '/src/pages': Contém os layouts das páginas da aplicação juntamente com suas estruturas de funcionamento.
