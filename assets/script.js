document.addEventListener("DOMContentLoaded", function() {

    var impostos = [];

    function calcular() {

        var nomeCliente = document.getElementById("nomeCliente").value;
        var valorServico = parseFloat(document.getElementById("valorServico").value);

        var totalImpostos = 0;
        var linhasImpostos = "";

        for (var i = 0; i < impostos.length; i++) {
            var porcentagem = impostos[i].porcentagem || 0; 
            var valorImposto = (porcentagem / 100) * valorServico;

            linhasImpostos += `<p><strong>${impostos[i].nome} (${porcentagem}%):</strong> R$ ${valorImposto.toFixed(2)}</p>`;

            totalImpostos = totalImpostos + valorImposto;
        }

        var totalNota = totalImpostos + valorServico;

        
        var cpf = document.getElementById("cpf");
        var removePointCpf = cpf.value.replace(/\D/g, '');
        
        if (removePointCpf.length === 11) {
            cpf.value = removePointCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        } else if (removePointCpf.length === 9) {
            cpf.value = removePointCpf.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
        } else {
            alert("CPF inválido. Por favor, insira um CPF válido.");
        }
        

        var notaFiscal = `
            <h2>Nota Fiscal de Serviço</h2>
            <p><strong>Cliente:</strong> ${nomeCliente}</p>
            <p><strong>CPF do Cliente:</strong> ${cpf.value}</p>
            ${linhasImpostos}
            <p><strong>Total da Nota Fiscal:</strong> R$ ${totalNota.toFixed(2)}</p>
        `;

        document.getElementById("resultado").innerHTML = notaFiscal;
    }

    function adicionarImposto() {
        var nomeImposto = document.getElementById("nomeImposto").value;
        var valorImposto = parseFloat(document.getElementById("precoImposto").value) || 0;
        
        impostos.push({ nome: nomeImposto, valor: valorImposto, porcentagem: valorImposto });

        document.getElementById("nomeImposto").value = "";
        document.getElementById("precoImposto").value = "";

        alert("Imposto " + nomeImposto + " adicionado com sucesso!");
    }
    
    document.getElementById("adicionarButton").addEventListener("click", adicionarImposto);
    document.getElementById("calcularButton").addEventListener("click", calcular);
});