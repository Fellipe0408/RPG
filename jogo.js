// Classe Personagem
class Personagem {
    constructor(nome, nivel, energia, expPlayer) {
        this.nome = nome;
        this.nivel = nivel;
        this.energia = energia;  // Energia disponível para o personagem
        this.expPlayer = expPlayer;  // A experiência do personagem
    }

    // Método para exibir o status do personagem
    janeladestatus() {
        alert(`Nome: ${this.nome}\nNível: ${this.nivel}\nEnergia: ${this.energia}\nExperiência: ${this.expPlayer}`);
    }

    // Método para adicionar experiência ao personagem
    ganharExperiencia(expGanha) {
        this.expPlayer += expGanha;  // Aumenta a experiência
        alert(`${this.nome} ganhou ${expGanha} de experiência!`);

        // Verifica se o personagem subiu de nível
        this.verificarNivel();
    }

    // Método para verificar se o personagem subiu de nível
    verificarNivel() {
        let experienciaParaSubir = 100;  // 100 de experiência para cada nível
        while (this.expPlayer >= experienciaParaSubir) {
            this.nivel++;
            this.expPlayer -= experienciaParaSubir;  // Reseta a experiência para o próximo nível
            alert(`${this.nome} subiu para o nível ${this.nivel}!`);
        }
    }

    // Método para gastar energia ao realizar uma ação (por exemplo, atacar)
    gastarEnergia(quantidade) {
        if (this.energia >= quantidade) {
            this.energia -= quantidade;  // Reduz a energia disponível
            alert(`${this.nome} gastou ${quantidade} de energia! Energia restante: ${this.energia}`);
        } else {
            alert(`${this.nome} não tem energia suficiente para realizar essa ação!`);
        }
    }

    // Método para recuperar energia (por exemplo, descansando)
    recuperarEnergia(quantidade) {
        this.energia += quantidade;  // Recupera energia
        alert(`${this.nome} recuperou ${quantidade} de energia! Energia atual: ${this.energia}`);
    }
}

// Classe Inimigo
class Inimigo {
    constructor(bicho, nivelbicho, vida, exp) {
        this.bicho = bicho;
        this.nivelbicho = nivelbicho;
        this.vida = vida;
        this.exp = exp;  // Experiência que o inimigo vai dar ao personagem
    }

    // Método para lutar contra o inimigo
    lutar(personagem) {
        alert(`Você está lutando contra um ${this.bicho} de nível ${this.nivelbicho}.`);

        // Verifica se o personagem tem energia suficiente para atacar
        let energiaNecessaria = 20;  // Exemplo de energia necessária para atacar
        if (personagem.energia >= energiaNecessaria) {
            personagem.gastarEnergia(energiaNecessaria);  // O personagem gasta energia para atacar
            this.vida = 0;  // O inimigo é derrotado

            // O personagem ganha experiência após derrotar o inimigo
            personagem.ganharExperiencia(this.exp);

            // Mensagem de vitória
            alert(`${this.bicho} foi derrotado!`);
        } else {
            alert("Você não tem energia suficiente para atacar!");
        }
    }

    // Método para fugir da batalha
    fugir() {
        alert("Você fugiu da batalha!");
    }
}

// Função para gerar um inimigo aleatório
function gerarInimigo() {
    const tiposDeInimigos = [
        { nome: "Slime", nivel: 1, vida: 20, exp: 50 },
        { nome: "Goblin", nivel: 2, vida: 40, exp: 100 },
        { nome: "Esqueleto", nivel: 3, vida: 60, exp: 150 },
        { nome: "Dragão", nivel: 5, vida: 120, exp: 300 },
        { nome: "Lich", nivel: 6, vida: 150, exp: 400 },
    ];

    let inimigoAleatorio = tiposDeInimigos[Math.floor(Math.random() * tiposDeInimigos.length)];
    return new Inimigo(inimigoAleatorio.nome, inimigoAleatorio.nivel, inimigoAleatorio.vida, inimigoAleatorio.exp);
}


// Criando uma instância do Personagem
let personagem = new Personagem("Sung", 1, 100, 0);

// Exibindo as informações do personagem no início
alert(`Bem-vindo ao jogo, ${personagem.nome}!\nNível: ${personagem.nivel}\nEnergia: ${personagem.energia} de mana`);

function jogar() {
    // Gerando um inimigo aleatório
    let inimigo = gerarInimigo();  // Cria um inimigo aleatório a partir da lista

    // Perguntando ao jogador o que ele quer fazer
    let acao = prompt("Você encontrou um " + inimigo.bicho + " de nível " + inimigo.nivelbicho + "\nO que você fará? lutar ou fugir?");

    if (acao === "lutar") {
        inimigo.lutar(personagem);  // Chama o método de luta e passa o personagem para ganhar experiência
    } else if (acao === "fugir") {
        inimigo.fugir();  // Se o jogador escolher fugir
    } else {
        alert("Opção inválida!");
    }

    // Perguntando ao jogador se ele quer ver os status
    let abrirJanela = prompt("Você deseja abrir a janela de status? (s para sim, n para não)");

    if (abrirJanela === "s") {
        personagem.janeladestatus();  // Exibe os status do personagem
    } else {
        alert("Janela de status fechada.");
    }

    // Perguntando ao jogador se ele quer recuperar energia
    let recuperarEnergia = prompt("Você deseja recuperar energia? (s para sim, n para não)");

    if (recuperarEnergia === "s") {
        personagem.recuperarEnergia(10);  // Recupera energia conforme solicitado
    } else {
        alert("Você não recuperou energia.");
    }

    // Continuar jogando
    let continuar = prompt("Deseja continuar jogando? (s para sim, n para não)");
    if (continuar === "s") {
        jogar();  // Se o jogador escolher continuar, chama a função novamente
    } else if(Personagem) {
        alert("Você decidiu parar de jogar.");
        personagem.janeladestatus()
    }
}

// Iniciar o jogo
jogar();

