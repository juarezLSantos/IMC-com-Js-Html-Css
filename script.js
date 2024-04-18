//IMC
//1.capturar valores
//2.calcular o IMC
//3.gerar classificação do IMC
//4.organizar as informações
//5.salvar os dados na lista
//6.ler a lista com os dados
//7.renderizar o conteúdo no HTML(tabela)
//8.botão de limpar os registros (clear (LocalStorage))

//responsável por chamar todas as outras funções
function CalcularValores(event) {
  event.preventDefault();

  let dadosUsuario = CapturarValores();

  let imc = CalcularImc(dadosUsuario.altura, dadosUsuario.peso);

  let classificacao = ClassificarImc(imc);

  let dadosUsuariosCompleto = OrganizarDados(dadosUsuario, imc, classificacao);

  CadastrarUsuario(dadosUsuariosCompleto);

  window.location.reload();
}

function CapturarValores() {
  const nome = document.getElementById("name").value;
  const altura = document.getElementById("height").value;
  const peso = document.getElementById("weight").value;

  const dadosUsuario = {
    nome: nome,
    altura: altura,
    peso: peso,
  };

  console.log(dadosUsuario);
  
  return dadosUsuario;
}

function CalcularImc(altura, peso) {
  const imc = peso / (altura * altura);

  return imc;
}

function ClassificarImc(imc) {
  if (imc < 18.5) {
    return "abaixo do peso";
  } else if (imc < 25) {
    return "peso normal";
  } else if (imc < 30) {
    return "sobrepeso";
  } else {
    return "obesidade";
  }
}

function OrganizarDados(dadosUsuario, valorImc, classificacaoImc) {
  const dataHoraAtual = Intl.DateTimeFormat("pt-BR", {
    timeStyle: "long",
    dataStyle: "short",
  }).format(Date.now());

  const dadosUsuarioCompleto = {
    ...dadosUsuario,
    imc: valorImc.toFixed(2),
    classificacaoImc: classificacaoImc,
    dataCadastro: dataHoraAtual,
  };

  return dadosUsuarioCompleto;
}
function CadastrarUsuario(usuario) {
  //cria um array vazio para armazenar os valores do usuário
  let listaUsuario = [];
  //verifica se dentro do localStorage eu tenho as informações do usuário
  if (localStorage.getItem("usuariosCadastrados")) {
    //se sim, eu guardo as informações dentro do array
    listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    //cadastrar o usuário dentro do array
  }
  listaUsuario.push(usuario);
  //caso contrário, um crio um novo item no localStorage
  //stringfy => objeto para JSON
  localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuario));
}

function CarregarUsuarios() {
  let listaUsuario = [];

  if (localStorage.getItem("usuariosCadastrados")) {
    listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"));
  }

  if (listaUsuario.length == 0) {
    let tabela = document.getElementById("corpo-tabela");

    tabela.innerHTML = `
        <tr class="linha-mensagem">
             <td colspan="6"> Nenhum usuário cadastrado </td>
        </tr>
    `;
  } else {
    montarTabela(listaUsuario);

    // alert("Deu ruim");
  }
}
window.addEventListener("DOMContentLoaded", () => CarregarUsuarios());

function montarTabela(listaDeCadastrados) {
  let tabela = document.getElementById("corpo-tabela");

  let template = "";

  listaDeCadastrados.forEach(pessoa => {
    template += `
    <tr>
    <td data-cell="nome">${pessoa.nome} </td>
    <td data-cell="altura"> ${pessoa.altura} </td>
    <td data-cell="peso"> ${pessoa.peso} </td>
    <td data-cell="imc"> ${pessoa.imc} </td>
    <td data-cell="classificação"> ${pessoa.classificacaoImc} </td>
    <td data-cell="dataCadastro"> ${pessoa.dataCadastro} </td>
    </tr>
    `;
  });
  tabela.innerHTML = template;
}

function deletarRegistros(){
      localStorage.removeItem("usuariosCadastrados")

      // localStorage.clear();
      
      window.location.reload();
  }
