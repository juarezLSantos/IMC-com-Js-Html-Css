//IMC
//1.capturar valores
//2.calcular o IMC
//3.gerar classificação do IMC
//4.organizar as informações
//5.salvar os dados na lista 
//6.ler a lista com os dados 
//7.renderizar o conteúdo no HTML(tabela)
//8.botão de limpar os registros (clicar (LocalStorage))




function CapturarValores() {
    const nome = document.getElementById('name').Value;
    const altura =  document.getElementById('height').Value;
    const peso = document.getElementById('weight').Value;

    const dadosUsuario = {
        nome: nome,
        altura: altura,
        peso: peso

    }

    return dadosUsuario;


}

function CalcularImc(altura,peso){

    const imc = peso / (altura* altura)

    return imc

}

function ClassificarImc(imc) {
    if (imc < 18.5) {
        return "abaixo do peso"
    }else if (imc < 25){
        return "peso normal"
    }else if (imc < 30){
        return "sobrepeso"
    }else{
        return "obesidade"

    }
    }

    function OrganizarDados(dadosUsuario, valorImc, classificacaoImc){
        const dataHoraAtual = intl.DateTimeFormat("pt-BR",{timeStyle: "long",dataStyle: "short"}).format(Date.now());
        const dadosUsuarioCompleto = {
            ...dadosUsuario,
            imc: valorImc.toFixed(2),
            classificacaoImc: classificacaoImc,
            dataCadastro: dataHoraAtual
        }

        return dadosUsuarioCompleto;


    }





    
    
    


