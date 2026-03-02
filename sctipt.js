// Função para buscar os dados
async function buscarEndereco(cep) {
    console.log("Iniciando busca para o CEP: " + cep);
    
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await response.json();

        if (dados.erro) {
            alert("CEP não encontrado!");
            return;
        }

        console.log("Dados recebidos:", dados);

        // Preenchendo os campos com segurança
        document.getElementById('rua').textContent = dados.logradouro || "Não disponível";
        document.getElementById('bairro').textContent = dados.bairro || "Não disponível";
        document.getElementById('cidade').textContent = dados.localidade;
        document.getElementById('estado').textContent = dados.uf;
        document.getElementById('cep_resultado').textContent = dados.cep;

    } catch (erro) {
        console.error("Erro na busca:", erro);
        alert("Erro ao consultar a API.");
    }
}

// Configura o evento assim que a página abre
window.onload = function() {
    const campoCep = document.getElementById('cep');

    campoCep.addEventListener('input', () => {
        // Remove hífens e pontos para contar apenas os números
        let valor = campoCep.value.replace(/\D/g, '');
        
        console.log("Digitando... números atuais: " + valor.length);

        if (valor.length === 8) {
            buscarEndereco(valor);
        }
    });
};