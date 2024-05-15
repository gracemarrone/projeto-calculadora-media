const formulario = document.getElementById("formulario-atividade");
let linhas = ' ';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji Triste de Reprovado">';
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji Triste de Aprovado">';
const atividades = [];
const notas = [];
const msgReprovado = '<span class="resultado reprovado">Reprovado</span>';
const msgAprovado = '<span class="resultado aprovado">Aprovado</span>';
const notaMinima = parseFloat(prompt("Qual a nota mínima para o parametro de aprovação"));

formulario.addEventListener("submit", function(e){
    e.preventDefault();

    adicionarLinha();
    atualizarTabela();
    atualizarMedia();

})

function adicionarLinha(){
    const inputNomeAtividade = document.getElementById("atividades");
    const inputNotaAtividade = document.getElementById("notas");

    // o if está colocando como condição se na váriavel do tipo array incluir o valor do input ele enviará a mensagem a seguir  e pulará para a limpeza dos campos sem incluir
    if(atividades.includes(inputNomeAtividade.value.toLowerCase())){  // o toLowerCase() é um metódo que faz a comparação identificando letras minúsculas e maiúsculas como a mesma letra, caso não utilizasemos ele as letras minúsculas e maiúsculas mesmo sendo a mesma letra seriam tratados como letras diferentes
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`);
    }else{
        // armazena no array da variável o valor dos inputs  
        atividades.push (inputNomeAtividade.value.toLowerCase());
        console.log(atividades);
        notas.push(parseFloat(inputNotaAtividade.value));
        //criação da linha na tabela isso é feito através da concatenação
        let linha = "<tr>"; 
        linha = linha + `<td>${inputNomeAtividade.value}`; // dentro dessa variavel estamos reservando o seguinte valor "<tr><td>conteudo do input</td>"
        linha += `<td>${inputNotaAtividade.value}`; // agora o valor armazenado passa a ser "<tr><td>conteudo do input nome atividade</td><td>conteudo do input nota ativida de</td>" 
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}`; // valor "<tr><td>conteudo do input nome atividade</td><td>conteudo do input nota ativida de</td><td>conteudo resposta operador ternário</td>"
        linha += "</tr>";

        //criado mais de uma linha para não substituir a linha já criada
        linhas += linha;

    }

        //limpar o campo depois que adicionar o conteudo;
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizarTabela(){
    console.log(linhas);
    const corpoTabela = document.querySelector('tbody');
    //introduzido no HTML o conteúdo criado da linha;
    corpoTabela.innerHTML = linhas;

}

function atualizarMedia(){

    const calculoMediaFinal = calculoMedia();

//-------------------------- DUAS FORMAS DE CHEGAR AO MESMO RESULTADO -------------------------------------

// let campoMediaNotas = document.getElementById("mediaNotas");
// campoMediaNotas.innerText = calculoMediaFinal; // acrescenta o texto entre as tags??

    document.getElementById("mediaNotas").innerText = calculoMediaFinal.toFixed(2);

//-------------------------- DUAS FORMAS DE CHEGAR AO MESMO RESULTADO -------------------------------------

// const linhaRodape = document.getElementById('resultado');
// let respotaAprovacao = calculoMediaFinal >= 7 ? msgAprovado : msgReprovado;
// linhaRodape.innerHTML = respotaAprovacao;

    document.getElementById('resultado').innerHTML = calculoMediaFinal >= notaMinima ? msgAprovado : msgReprovado;

}

function calculoMedia(){
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++){
        somaDasNotas += notas[i];
    }

    let media = somaDasNotas /  notas.length; 
    return media; // toFixed() é para anexar duas casas após a virgula
}

