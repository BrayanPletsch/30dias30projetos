<h1 align="center">
  30 dias, 30 projetos<br/>
  <a>30 days project. html, css &amp; javascript.</a>
</h1>

O projeto "30 Dias, 30 Projetos" tem como objetivo aprofundar meus conhecimentos em JavaScript. Consiste em 30 mini projetos, cada um explorando uma funcionalidade única, desenvolvidos com HTML, CSS e JavaScript.

Meu [LinkedIn](https://www.linkedin.com/in/brayan-pletsch/). Fico aberto a sugestões de novos projetos!

--- 

<p align="center">
  <a href="#">
    <img src="https://skillicons.dev/icons?i=git,javascript,html,css"/>
  </a>
</p>

# DIA 1 - Pesquisador de Perfis do GitHub

O projeto "Pesquisador de Perfis do GitHub" é uma aplicação simples, porém poderosa, que permite a qualquer pessoa buscar informações detalhadas sobre um usuário do GitHub. Ao digitar o nome de usuário, a aplicação traz dados como número de seguidores, quantidade de repositórios públicos, e os repositórios mais recentes, tudo de forma dinâmica e organizada. Isso é feito utilizando a API do GitHub para capturar as informações e exibi-las de forma visualmente atraente.



**(Clique no link abaixo para que você possa visualizar e testar o site)**

[Visualização no Vercel](https://brayan-github-profile-research.vercel.app/)

![github-profile](https://github.com/user-attachments/assets/fd202c81-0b24-4433-9f19-bdfce0ab20c2)

A interface foi pensada para ser clara e intuitiva, com um campo de busca centralizado onde o usuário insere o nome de usuário do GitHub que deseja pesquisar.

Assim que a busca é realizada, o perfil aparece com a foto do avatar, o nome de usuário (ou nome real, se disponível), bio, e uma lista de informações como seguidores, pessoas que o usuário segue e número de repositórios públicos.

**Code preview:**
```javascript
async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)
        createUserCard(data)
        getRepos(username)
    } catch (err) {
        if (err.response && err.response.status === 404) {
            createErrorCard('Usuário não encontrado')
        }
    }
}

function createUserCard(user) {
    const userID = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : ''
    const cardHTML = `
        <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${userID}</h2>
                ${userBio}
                <ul>
                    <li>${user.followers} <strong>Seguidores</strong></li>
                    <li>${user.following} <strong>Seguindo</strong></li>
                    <li>${user.public_repos} <strong>Repositórios</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `
    main.innerHTML = cardHTML
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = search.value
    if (user) {
        getUser(user)
        search.value = ''
    }
})
```

### Como funciona o código:

1. **Busca por usuários do GitHub**: A função `getUser` faz uma requisição à API do GitHub assim que o usuário submete o formulário. Ela retorna as informações do perfil que são processadas e exibidas em um card estilizado.
   
2. **Criação do card do usuário**: A função `createUserCard` monta o card com a foto de perfil, o nome, bio e outros dados do GitHub, e exibe tudo de forma bem organizada.

3. **Interação do usuário**: Um evento `submit` é associado ao formulário, permitindo que o nome de usuário seja capturado e passado para a função de busca, garantindo uma experiência fluida e rápida.

Essa aplicação é perfeita para quem deseja rapidamente visualizar o perfil de usuários do GitHub, ideal tanto para recrutadores como para desenvolvedores que querem acompanhar o trabalho de seus colegas!

---

# DIA 2 - Calculadora Web

Neste projeto, foi desenvolvida uma **Calculadora Web** completamente funcional, onde o usuário pode realizar operações matemáticas básicas como soma, subtração, multiplicação e divisão. A interface da calculadora é simples, mas moderna, com botões fáceis de interagir e uma área de exibição que mostra o número atual e o histórico da operação.

A calculadora também inclui funcionalidades como:
- **Limpeza de todos os valores** (AC);
- **Exclusão de um número** (DEL);
- **Exibição de resultados**.

**(Clique no link abaixo para que você possa visualizar e testar o site)**

[Visualização no Vercel](https://brayan-web-calculator.vercel.app/)

![web-calculator](https://github.com/user-attachments/assets/878148e6-99ea-4940-bfd7-226a204c0f14)

### Code preview:

```javascript
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") return;
        this.currentOperand = `${this.currentOperand}${number}`;
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.calculate();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    calculate() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "÷":
                result = prev / current;
                break;
            case "x":
                result = prev * current;
                break;
            default:
                return;
        }

        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation || ""}`;
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
}
```

### Como funciona o código:

1. **Adição de números**: A função `appendNumber` permite que o número digitado seja adicionado à operação corrente, concatenando os valores na tela.
  
2. **Escolha de operação**: A função `chooseOperation` guarda a operação selecionada pelo usuário (soma, subtração, etc.) e move o número atual para o histórico de operações.

3. **Cálculo do resultado**: A função `calculate` realiza a operação matemática escolhida, utilizando os valores armazenados e atualiza o visor com o resultado.

Com esse projeto, você pode realizar cálculos simples de forma fácil e rápida, diretamente do navegador.

---

# DIA 3 - CRUD de Clientes em JavaScript

Este projeto é um sistema de **CRUD (Create, Read, Update, Delete)** simples para cadastro de clientes. A aplicação permite ao usuário:
- Cadastrar novos clientes;
- Editar as informações dos clientes existentes;
- Excluir clientes;
- Visualizar a lista de clientes cadastrados.

A interface é organizada, com uma tabela exibindo os dados e um formulário que pode ser aberto em um modal para adicionar ou editar clientes.

**(Clique no link abaixo para que você possa visualizar e testar o site)**

[Visualização no Vercel](https://brayan-crud-in-js.vercel.app/)

![crud-em-js](https://github.com/user-attachments/assets/9b568bec-5b12-4df2-9196-d2cd0fcfb71b)

### Code preview:

```javascript
const openModal = () => document.getElementById('modal').classList.add('active');

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
};

const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
    updateTable();
};

const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
    updateTable();
};

const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
    updateTable();
};

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        };
        const index = document.getElementById('nome').dataset.index;
        index === 'new' ? createClient(client) : updateClient(index, client);
        closeModal();
    }
};
```

### Como funciona o código:

1. **Adicionar Cliente**: O cliente é criado usando a função `createClient`, que salva os dados no localStorage e atualiza a tabela com as informações do novo cliente.

2. **Atualizar Cliente**: Se um cliente existente for editado, a função `updateClient` substitui os dados no índice correspondente e atualiza o localStorage.

3. **Excluir Cliente**: A função `deleteClient` remove o cliente do array de clientes, atualiza o localStorage e exibe a tabela atualizada.

Com este CRUD, você pode gerenciar clientes facilmente com funções intuitivas e uma interface amigável.

---

# DIA 4 - Drag & Drop

O quarto mini projeto é um sistema de **Drag & Drop**, permitindo ao usuário arrastar itens de uma lista em um container para outro container ou reorganizá-los dentro do mesmo container. 

Essa funcionalidade é muito útil para criar interfaces interativas e organizadas, onde o usuário tem a liberdade de mover elementos de maneira intuitiva.

**(Clique no link abaixo para que você possa visualizar e testar o site)**

[Visualização no Vercel](https://brayan-drag-n-drop.vercel.app/)

![draganddrop](https://github.com/user-attachments/assets/eafe5513-a35f-435c-8f65-3b4300cc43ac)

### Code preview:
```javascript
let lists = document.getElementsByClassName("list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");

for (let list of lists) {
    list.addEventListener("dragstart", function(e){
        let selected = e.target;

        rightBox.addEventListener("dragover", function(e){
            e.preventDefault();
        });

        rightBox.addEventListener("drop", function(){
            rightBox.appendChild(selected);
            selected = null;
        });

        leftBox.addEventListener("dragover", function(e){
            e.preventDefault();
        });

        leftBox.addEventListener("drop", function(){
            leftBox.appendChild(selected);
            selected = null;
        });
    });
}
```

### Como funciona o código:

1. **Arrastar o item**: O evento `dragstart` detecta quando o usuário começa a arrastar um item da lista, armazenando o elemento selecionado.
   
2. **Sobreposição dos containers**: Os eventos `dragover` em ambos os containers (esquerda e direita) permitem que o elemento seja arrastado sobre eles sem interrupção.

3. **Soltar o item**: O evento `drop` é acionado quando o item é solto em um dos containers, e o item é movido para a nova posição.

Este projeto fornece uma experiência visual fluida, permitindo que o usuário organize os itens de forma prática.

---

---

# DIA 5 - Gerador de Senhas Aleatórias

O projeto "Gerador de Senhas Aleatórias" é uma ferramenta simples e eficiente que permite gerar senhas seguras e aleatórias com apenas um clique. Ele combina letras maiúsculas, minúsculas, números e símbolos, garantindo uma senha robusta de 12 caracteres. Além disso, há uma opção de copiar a senha gerada diretamente para a área de transferência, facilitando o uso imediato.

**(Clique no link abaixo para que você possa visualizar e testar o site)**

[Visualização no Vercel](https://brayan-password-generator.vercel.app/)

![password-generator](https://github.com/user-attachments/assets/b4d095c9-ef9b-4137-9aa1-ffd1b866ff5d)

### Code preview:

```javascript
const passwordBox = document.getElementById("password");
const length = 12;
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "0123456789";
const symbol = "!@#$%";
const allCharacter = upperCase + lowerCase + number + symbol;

function createPassword() {
    let password = "";
    password += upperCase[Math.floor(Math.random() * upperCase.length)];
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
    password += number[Math.floor(Math.random() * number.length)];
    password += symbol[Math.floor(Math.random() * symbol.length)];

    while (password.length < length) {
        password += allCharacter[Math.floor(Math.random() * allCharacter.length)];
    }

    passwordBox.value = shufflePassword(password);
}

function shufflePassword(password) {
    return password.split('').sort(() => 0.5 - Math.random()).join('');
}

function copyPassword() {
    passwordBox.select();
    navigator.clipboard.writeText(passwordBox.value);
}
```

### Como funciona o código:

1. **Geração de senha**: A função `createPassword` seleciona aleatoriamente caracteres de diferentes categorias (maiúsculas, minúsculas, números e símbolos), e os concatena até atingir o tamanho total de 12 caracteres.

2. **Embaralhamento da senha**: Para aumentar a aleatoriedade, a função `shufflePassword` embaralha os caracteres da senha antes de exibi-la no campo de texto.

3. **Cópia da senha**: Com a função `copyPassword`, a senha gerada pode ser copiada automaticamente para a área de transferência com um simples clique no ícone.

Este projeto é útil para quem deseja criar senhas seguras de forma rápida e conveniente.

---

# DIA 6 - Gerador de QR Code

O projeto "Gerador de QR Code" é uma aplicação prática e eficiente que permite a criação de códigos QR personalizados a partir de qualquer URL ou texto. Com apenas um clique, o usuário insere o conteúdo desejado e o sistema gera um QR Code correspondente, que pode ser facilmente utilizado em diversas aplicações.

**(Clique no link abaixo para que você possa visualizar e testar o site)**

[Visualização no Vercel](https://brayan-qr-code-generator.vercel.app/)

![qr-code-generator](https://github.com/user-attachments/assets/3af4119b-5c24-4254-9a61-2cf4f8758fdd)

### Code preview:

```javascript
const imgBox = document.getElementById("imgBox");
const qrImage = document.getElementById("qrImage");
const qrText = document.getElementById("qrText");

function generateQR() {
    const qrValue = qrText.value.trim();
    if (qrValue) {
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`;
        qrImage.style.display = 'block';
    } else {
        qrImage.style.display = 'none';
    }
}
```

### Como funciona o código:

1. **Entrada de dados**: O usuário insere um URL ou texto no campo de entrada (`qrText`). A função `generateQR` lê o valor e verifica se ele é válido.
   
2. **Geração do QR Code**: Utilizando a API `qrserver.com`, o QR Code é gerado dinamicamente com base no conteúdo inserido, e a imagem resultante é exibida na tela.

3. **Exibição condicional**: Se o campo de entrada estiver vazio, a imagem do QR Code é ocultada para evitar erros de exibição.

Este gerador de QR Code é ideal para quem precisa rapidamente criar códigos personalizados para compartilhar links ou informações de maneira fácil e acessível.

---
