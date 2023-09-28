// Esta função é usada para validar um formulário antes de adicionar dados à lista
function validateForm(){
    // Obter os valores dos campos do formulário pelos seus IDs
    let nome = document.getElementById("nome").value;
    let matricula = document.getElementById("matricula").value;
    let curso = document.getElementById("curso").value;
    let email = document.getElementById("email").value;
    
    // Verificar se o campo 'nome' está vazio
    if(nome == ""){
        alert("Nome é obrigatório!"); // Mostrar uma mensagem de alerta
        return false; // Impedir o envio do formulário se a validação falhar
    }

    // Verificar se o campo 'matricula' está vazio
    if(matricula == ""){
        alert("Matrícula é obrigatória!"); // Mostrar uma mensagem de alerta
        return false; // Impedir o envio do formulário se a validação falhar
    } 

    // Verificar se o campo 'email' está vazio e contém '@'
    if(email == ""){
        alert("E-mail é obrigatório!"); // Mostrar uma mensagem de alerta
        return false; // Impedir o envio do formulário se a validação falhar
    } else if(!email.includes("@")){
        alert("Endereço inválido!"); // Mostrar uma mensagem de alerta
        return false; // Impedir o envio do formulário se a validação falhar
    }

    // Se todas as validações passarem, retornar true para permitir o envio do formulário
    return true;
} 

// Esta função é usada para exibir dados em uma tabela
function showData(){
    let peopleList;

    // Verificar se há dados no armazenamento local; se não, inicializar um array vazio
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    } else {
        // Se houver dados, analisá-los no formato JSON
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    let html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.nome + "</td>";
        html += "<td>" + element.matricula + "</td>";
        html += "<td>" + element.curso + "</td>";
        html += "<td>" + element.email + "</td>";
        html += 
            '<td><button onclick="deleteData('+
            index+')" class="btn btn-danger">Excluir</button><button onclick="updateData('+
            index+')" class="btn btn-warning m-2">Editar</button></td>';
        html+="</tr>";
    });

    // Exibir o HTML gerado no corpo da tabela
    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Este código é executado quando a janela (página) é carregada
window.onload = showData();

// Esta função adiciona dados à lista quando o formulário é enviado
function AddData(){
    // Verificar se o formulário é válido chamando a função validateForm
    if(validateForm() == true){
        // Obter os valores dos campos do formulário
        let nome = document.getElementById("nome").value;
        let matricula = document.getElementById("matricula").value;
        let curso = document.getElementById("curso").value;
        let email = document.getElementById("email").value;

        let peopleList;

        // Verificar se há dados no armazenamento local; se não, inicializar um array vazio
        if(localStorage.getItem("peopleList") == null){
            peopleList = [];
        } else {
            // Se houver dados, analisá-los no formato JSON
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        // Adicionar um novo objeto à matriz peopleList
        peopleList.push({
            nome: nome,
            matricula: matricula, 
            curso: curso, 
            email: email
        });

        // Armazenar os dados atualizados de volta no armazenamento local
        localStorage.setItem("peopleList", JSON.stringify(peopleList));

        // Exibir os dados atualizados na tabela
        showData();

        // Limpar os campos do formulário
        document.getElementById("nome").value = "";
        document.getElementById("matricula").value = "";
        document.getElementById("curso").value = "";
        document.getElementById("email").value = "";  
    }  
}

// Esta função exclui dados da lista
function deleteData(index){
    let peopleList;

    // Verificar se há dados no armazenamento local; se não, inicializar um array vazio
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    } else {
        // Se houver dados, analisá-los no formato JSON
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    // Remover o item de dados no índice especificado da matriz
    peopleList.splice(index, 1);

    // Armazenar os dados atualizados de volta no armazenamento local
    localStorage.setItem("peopleList", JSON.stringify(peopleList));

    // Exibir os dados atualizados na tabela
    showData();
}

// Esta função é usada para atualizar dados na lista
function updateData(index) {
    // Ocultar o botão Enviar e mostrar o botão Atualizar para edição
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let peopleList;

    // Verificar se há dados no armazenamento local; se não, inicializar um array vazio
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        // Se houver dados, analisá-los no formato JSON
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    // Preencher os campos do formulário com dados para edição
    document.getElementById("nome").value = peopleList[index].nome;
    document.getElementById("matricula").value = peopleList[index].matricula;
    document.getElementById("curso").value = peopleList[index].curso;
    document.getElementById("email").value = peopleList[index].email;

    // Adicionar um ouvinte de eventos ao botão Atualizar
    document.getElementById("Update").onclick = function () {
        // Verificar se o formulário é válido chamando a função validateForm
        if (validateForm() == true) {
            // Atualizar os dados na matriz peopleList
            peopleList[index].nome = document.getElementById("nome").value;
            peopleList[index].matricula = document.getElementById("matricula").value;
            peopleList[index].curso = document.getElementById("curso").value;
            peopleList[index].email = document.getElementById("email").value;

            // Armazenar os dados atualizados de volta no armazenamento local
            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            // Exibir os dados atualizados na tabela
            showData();

            // Limpar os campos do formulário
            document.getElementById("nome").value = "";
            document.getElementById("matricula").value = "";
            document.getElementById("curso").value = "";
            document.getElementById("email").value = "";

            // Ocultar o botão Atualizar e mostrar o botão Enviar
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    };
}
