'use strict';

const openModal = () => document.getElementById('modal').classList.add('active');

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
};

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

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

const readClient = () => getLocalStorage();

const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
    updateTable();
};

const isValidFields = () => document.getElementById('form').reportValidity();

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = '');
    document.getElementById('nome').dataset.index = 'new';
    document.getElementById('modalTitle').textContent = 'Novo Cliente';
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

const createRow = (client, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `;
    document.querySelector('#tableClient>tbody').appendChild(newRow);
};

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.remove());
};

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow);
};

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('celular').value = client.celular;
    document.getElementById('cidade').value = client.cidade;
    document.getElementById('nome').dataset.index = client.index;
};

const editClient = (index) => {
    const client = readClient()[index];
    client.index = index;
    fillFields(client);
    document.getElementById('modalTitle').textContent = `Editando ${client.nome}`;
    openModal();
};

const editDelete = (event) => {
    if (event.target.type === 'button') {
        const [action, index] = event.target.id.split('-');
        if (action === 'edit') {
            editClient(index);
        } else if (action === 'delete') {
            const client = readClient()[index];
            const response = confirm(`Deseja realmente excluir o cliente ${client.nome}?`);
            if (response) {
                deleteClient(index);
            }
        }
    }
};

const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 11);
    const match = cleaned.match(/^(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})$/);

    let formattedNumber = '';

    if (match[1]) formattedNumber += `(${match[1]}`;
    if (match[2]) formattedNumber += `) ${match[2]}`;
    if (match[3]) formattedNumber += ` ${match[3]}`;
    if (match[4]) formattedNumber += `-${match[4]}`;

    return formattedNumber.trim();
};

const handlePhoneInput = (e) => {
    const input = e.target;
    let cursorPosition = input.selectionStart;
    const previousValue = input.value;
    const formattedValue = formatPhoneNumber(previousValue);

    if (formattedValue.length < previousValue.length && previousValue[cursorPosition - 1] === '-') {
        cursorPosition--;
    }

    input.value = formattedValue;
    cursorPosition = cursorPosition + (formattedValue.length - previousValue.length);

    if (formattedValue[cursorPosition - 1] === ' ' || formattedValue[cursorPosition - 1] === '-') {
        cursorPosition++;
    }

    input.setSelectionRange(cursorPosition, cursorPosition);
};

const restrictNonNumericInput = (e) => {
    const char = String.fromCharCode(e.keyCode);
    if (!/[0-9]/.test(char)) {
        e.preventDefault();
    }
};

const phoneInputElement = document.getElementById('celular');
phoneInputElement.addEventListener('input', handlePhoneInput);
phoneInputElement.addEventListener('keypress', restrictNonNumericInput);

updateTable();

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal);
document.getElementById('modalClose')
    .addEventListener('click', closeModal);
document.getElementById('salvar')
    .addEventListener('click', saveClient);
document.getElementById('cancelar')
    .addEventListener('click', closeModal);
document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete);
