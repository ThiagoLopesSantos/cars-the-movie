document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a[href^='#']");
    const botoes = document.querySelectorAll(".personagens-card__ver-mais");
    const miniMenu = document.getElementById('miniMenu');
    const miniMenuList = document.getElementById('miniMenuList');
    const hamburguer = document.getElementById('hamburgerBtn');
    
    //suavizar rolamentop de pagina
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    //botoes dos cards personagens
    botoes.forEach(botao => {
        botao.addEventListener("click", function () {
            const card = this.closest(".personagens-card");
            const aberto = card.classList.contains("expandido");

            // Fecha os outros cards
            document.querySelectorAll(".personagens-card.expandido").forEach(c => {
                if (c !== card) {
                    const alturaFechada = calcularAlturaFechada(c);
                    c.style.height = alturaFechada + "px";
                    c.classList.remove("expandido");
                    c.querySelector(".personagens-card__ver-mais").textContent = "Ver mais";
                }
            });
    
            // Alterna o atual
            if (!aberto) {
                const alturaExpandida = calcularAlturaExpandida(card);
                card.style.height = alturaExpandida + "px";
                card.classList.add("expandido");
                this.textContent = "Ver menos";
            } else {
                const alturaFechada = calcularAlturaFechada(card);
                card.style.height = alturaFechada + "px";
                card.classList.remove("expandido");
                this.textContent = "Ver mais";
            }
        });
    });

    // Função para calcular altura só com imagem, título e botão
    function calcularAlturaFechada(card) {
        const img = card.querySelector(".personagens-card__img");
        const title = card.querySelector(".personagens-card__title");
        const button = card.querySelector(".personagens-card__ver-mais");
        return img.offsetHeight + title.offsetHeight + button.offsetHeight + 10; 
    }

    // Função para calcular altura total com texto
    function calcularAlturaExpandida(card) {
        const img = card.querySelector(".personagens-card__img");
        const title = card.querySelector(".personagens-card__title");
        const text = card.querySelector(".personagens-card__text");
        const button = card.querySelector(".personagens-card__ver-mais");
        return img.offsetHeight + title.offsetHeight + text.scrollHeight + button.offsetHeight + 0;
    }


    // mostra o mini menu após sair da tela principal
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.5) {
            miniMenu.classList.remove('hidden');
        } else {
            miniMenu.classList.add('hidden');
        }
    });

    // menu hamburger para tablet e celular
    hamburguer.addEventListener('click', () => {
        miniMenuList.classList.toggle('hiddenList');
    });

});
