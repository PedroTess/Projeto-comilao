// ==========================================
// DADOS DOS PRODUTOS
// ==========================================
const produtos = [
  // Lanches
  {
    id: 1,
    nome: "Hambúrguer Comilão",
    categoria: "lanches",
    descricao: "Hambúrguer artesanal 200g, queijo, alface, tomate e molho especial",
    preco: 28.9,
    emoji: "🍔",
  },
  {
    id: 2,
    nome: "X-Bacon Gigante",
    categoria: "lanches",
    descricao: "Pão, hambúrguer, bacon crocante, queijo, ovo e batata palha",
    preco: 32.9,
    emoji: "🥓",
  },
  {
    id: 3,
    nome: "Veggie Burger",
    categoria: "lanches",
    descricao: "Hambúrguer de grão-de-bico, queijo vegano e vegetais frescos",
    preco: 26.9,
    emoji: "🥗",
  },
  {
    id: 4,
    nome: "Frango Crocante",
    categoria: "lanches",
    descricao: "Peito de frango empanado, alface, tomate e maionese caseira",
    preco: 24.9,
    emoji: "🍗",
  },

  // Bebidas
  {
    id: 5,
    nome: "Refrigerante Lata",
    categoria: "bebidas",
    descricao: "Coca-Cola, Guaraná ou Sprite - 350ml",
    preco: 6.0,
    emoji: "🥤",
  },
  {
    id: 6,
    nome: "Suco Natural",
    categoria: "bebidas",
    descricao: "Laranja, limão ou morango - 500ml",
    preco: 10.0,
    emoji: "🧃",
  },
  {
    id: 7,
    nome: "Milkshake",
    categoria: "bebidas",
    descricao: "Chocolate, morango ou baunilha - 400ml",
    preco: 15.0,
    emoji: "🥛",
  },
  {
    id: 8,
    nome: "Água Mineral",
    categoria: "bebidas",
    descricao: "Água mineral sem gás - 500ml",
    preco: 4.0,
    emoji: "💧",
  },

  // Sobremesas
  {
    id: 9,
    nome: "Brownie com Sorvete",
    categoria: "sobremesas",
    descricao: "Brownie de chocolate quente com bola de sorvete de creme",
    preco: 16.9,
    emoji: "🍫",
  },
  {
    id: 10,
    nome: "Pudim Caseiro",
    categoria: "sobremesas",
    descricao: "Pudim de leite condensado tradicional",
    preco: 12.0,
    emoji: "🍮",
  },
  {
    id: 11,
    nome: "Torta de Morango",
    categoria: "sobremesas",
    descricao: "Fatia de torta com morangos frescos e chantilly",
    preco: 14.9,
    emoji: "🍓",
  },

  // Combos
  {
    id: 12,
    nome: "Combo Tradicional",
    categoria: "combos",
    descricao: "Hambúrguer Comilão + Batata Crocante + Refrigerante",
    preco: 39.9,
    emoji: "🍟",
  },
  {
    id: 13,
    nome: "Combo Família",
    categoria: "combos",
    descricao: "2 X-Bacon + Batata Grande + 2 Refrigerantes",
    preco: 69.9,
    emoji: "👨‍👩‍👧‍👦",
  },
  {
    id: 14,
    nome: "Combo Kids",
    categoria: "combos",
    descricao: "Mini hambúrguer + Batata pequena + Suco",
    preco: 24.9,
    emoji: "🧒",
  },
]

// ==========================================
// VARIÁVEIS GLOBAIS
// ==========================================
let carrinho = [] // Array para armazenar itens do carrinho
let categoriaAtual = "todos" // Categoria selecionada
let metodoPagamento = null // Método de pagamento selecionado
let numeroPedidoAtual = 1 // Contador de pedidos
let pedidosEmPreparo = [] // Array de pedidos em preparo
const pedidosProntos = [] // Array de pedidos prontos

// ==========================================
// FUNÇÕES DE NAVEGAÇÃO ENTRE TELAS
// ==========================================

/**
 * Inicia o pedido - vai da tela inicial para o cardápio
 */
function iniciarPedido() {
  mudarTela("telaCardapio")
  carregarProdutos()
}

/**
 * Vai para a tela de revisão do pedido
 */
function irParaRevisao() {
  if (carrinho.length === 0) return
  mudarTela("telaRevisao")
  carregarRevisao()
}

/**
 * Volta para o cardápio a partir da revisão
 */
function voltarParaCardapio() {
  mudarTela("telaCardapio")
}

/**
 * Volta para a tela inicial
 */
function voltarAoInicio() {
  mudarTela("telaInicial")
  // Limpa o carrinho e reseta estado
  carrinho = []
  metodoPagamento = null
  atualizarCarrinho()
  if (window.innerWidth <= 768) {
    document.getElementById("carrinhoLateral").classList.remove("expandido")
    document.getElementById("carrinhoToggle").classList.remove("aberto")
  }
}

/**
 * Função auxiliar para mudar entre telas
 */
function mudarTela(idTela) {
  // Remove a classe 'ativa' de todas as telas
  document.querySelectorAll(".tela").forEach((tela) => {
    tela.classList.remove("ativa")
  })
  // Adiciona a classe 'ativa' na tela desejada
  document.getElementById(idTela).classList.add("ativa")
}

// ==========================================
// FUNÇÕES DO CARDÁPIO
// ==========================================

/**
 * Filtra produtos por categoria
 */
function filtrarPorCategoria(categoria) {
  categoriaAtual = categoria

  // Atualiza visual dos botões
  document.querySelectorAll(".btn-categoria").forEach((btn) => {
    btn.classList.remove("ativa")
  })
  document.querySelector(`[data-categoria="${categoria}"]`).classList.add("ativa")

  // Recarrega produtos
  carregarProdutos()
}

/**
 * Carrega os produtos na tela baseado na categoria atual
 */
function carregarProdutos() {
  const listaProdutos = document.getElementById("listaProdutos")
  listaProdutos.innerHTML = ""

  // Filtra produtos pela categoria
  const produtosFiltrados =
    categoriaAtual === "todos" ? produtos : produtos.filter((p) => p.categoria === categoriaAtual)

  // Cria um card para cada produto
  produtosFiltrados.forEach((produto) => {
    const card = document.createElement("div")
    card.className = "produto-card"
    card.style.cursor = "pointer"
    card.onclick = () => abrirModalProduto(produto.id)
    card.innerHTML = `
            <div style="font-size: 48px; text-align: center; margin-bottom: 10px;">${produto.emoji}</div>
            <h4>${produto.nome}</h4>
            <p>${produto.descricao}</p>
            <div class="produto-preco">R$ ${produto.preco.toFixed(2)}</div>
            <button class="btn-adicionar" onclick="event.stopPropagation(); adicionarAoCarrinho(${produto.id})">
                Adicionar
            </button>
        `
    listaProdutos.appendChild(card)
  })
}

/**
 * Abre o modal com detalhes do produto
 */
function abrirModalProduto(produtoId) {
  const produto = produtos.find((p) => p.id === produtoId)
  if (!produto) return

  // Preenche o modal com os dados do produto
  document.getElementById("modalEmoji").textContent = produto.emoji
  document.getElementById("modalNome").textContent = produto.nome
  document.getElementById("modalDescricao").textContent = produto.descricao
  document.getElementById("modalPreco").textContent = `R$ ${produto.preco.toFixed(2)}`

  // Configura o botão de adicionar
  const btnAdicionar = document.getElementById("modalBtnAdicionar")
  btnAdicionar.onclick = () => {
    adicionarAoCarrinho(produtoId)
    fecharModal()
  }

  // Mostra o modal
  document.getElementById("modalProduto").classList.add("ativo")
}

/**
 * Fecha o modal
 */
function fecharModal() {
  document.getElementById("modalProduto").classList.remove("ativo")
}

// ==========================================
// FUNÇÕES DO CARRINHO
// ==========================================

/**
 * Alterna exibicao do carrinho em mobile
 */
function toggleCarrinhoMobile() {
  if (window.innerWidth <= 768) {
    const carrinho = document.getElementById("carrinhoLateral")
    const toggle = document.getElementById("carrinhoToggle")

    carrinho.classList.toggle("expandido")
    toggle.classList.toggle("aberto")
  }
}

/**
 * Adiciona um produto ao carrinho
 */
function adicionarAoCarrinho(produtoId) {
  const produto = produtos.find((p) => p.id === produtoId)
  if (!produto) return

  // Verifica se o produto já está no carrinho
  const itemExistente = carrinho.find((item) => item.id === produtoId)

  if (itemExistente) {
    // Se já existe, aumenta a quantidade
    itemExistente.quantidade++
  } else {
    // Se não existe, adiciona novo item
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1,
      emoji: produto.emoji,
    })
  }

  atualizarCarrinho()

  if (window.innerWidth <= 768) {
    const carrinhoEl = document.getElementById("carrinhoLateral")
    const toggle = document.getElementById("carrinhoToggle")
    if (!carrinhoEl.classList.contains("expandido")) {
      carrinhoEl.classList.add("expandido")
      toggle.classList.add("aberto")
    }
  }
}

/**
 * Aumenta a quantidade de um item no carrinho
 */
function aumentarQuantidade(produtoId) {
  const item = carrinho.find((item) => item.id === produtoId)
  if (item) {
    item.quantidade++
    atualizarCarrinho()
  }
}

/**
 * Diminui a quantidade de um item no carrinho
 */
function diminuirQuantidade(produtoId) {
  const item = carrinho.find((item) => item.id === produtoId)
  if (item && item.quantidade > 1) {
    item.quantidade--
    atualizarCarrinho()
  }
}

/**
 * Remove um item do carrinho
 */
function removerDoCarrinho(produtoId) {
  carrinho = carrinho.filter((item) => item.id !== produtoId)
  atualizarCarrinho()
}

/**
 * Atualiza a exibição do carrinho
 */
function atualizarCarrinho() {
  const itensCarrinho = document.getElementById("itensCarrinho")
  const valorTotal = document.getElementById("valorTotal")
  const btnRevisar = document.getElementById("btnRevisar")

  // Se carrinho estiver vazio
  if (carrinho.length === 0) {
    itensCarrinho.innerHTML = '<p class="carrinho-vazio">Carrinho vazio</p>'
    valorTotal.textContent = "R$ 0,00"
    btnRevisar.disabled = true
    return
  }

  // Limpa e reconstrói a lista de itens
  itensCarrinho.innerHTML = ""
  let total = 0

  carrinho.forEach((item) => {
    const subtotal = item.preco * item.quantidade
    total += subtotal

    const itemDiv = document.createElement("div")
    itemDiv.className = "item-carrinho"
    itemDiv.innerHTML = `
            <div class="item-carrinho-header">
                <h4>${item.emoji} ${item.nome}</h4>
                <span class="item-carrinho-preco">R$ ${subtotal.toFixed(2)}</span>
            </div>
            <div class="item-carrinho-controles">
                <div class="controles-quantidade">
                    <button class="btn-quantidade" onclick="diminuirQuantidade(${item.id})">−</button>
                    <span class="quantidade">${item.quantidade}</span>
                    <button class="btn-quantidade" onclick="aumentarQuantidade(${item.id})">+</button>
                </div>
                <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">Remover</button>
            </div>
        `
    itensCarrinho.appendChild(itemDiv)
  })

  // Atualiza total
  valorTotal.textContent = `R$ ${total.toFixed(2)}`
  btnRevisar.disabled = false
}

// ==========================================
// FUNÇÕES DA REVISÃO DO PEDIDO
// ==========================================

/**
 * Carrega a tela de revisão com os itens do carrinho
 */
function carregarRevisao() {
  const listaRevisao = document.getElementById("listaRevisao")
  const valorTotalRevisao = document.getElementById("valorTotalRevisao")

  listaRevisao.innerHTML = ""
  let total = 0

  carrinho.forEach((item) => {
    const subtotal = item.preco * item.quantidade
    total += subtotal

    const itemDiv = document.createElement("div")
    itemDiv.className = "item-revisao"
    itemDiv.innerHTML = `
            <div class="item-revisao-info">
                <h4>${item.emoji} ${item.nome}</h4>
                <p>Quantidade: ${item.quantidade}</p>
            </div>
            <div class="item-revisao-valores">
                <div class="preco-unitario">R$ ${item.preco.toFixed(2)} cada</div>
                <div class="subtotal">R$ ${subtotal.toFixed(2)}</div>
            </div>
        `
    listaRevisao.appendChild(itemDiv)
  })

  valorTotalRevisao.textContent = `R$ ${total.toFixed(2)}`

  // Reseta seleção de pagamento
  metodoPagamento = null
  document.querySelectorAll(".btn-pagamento").forEach((btn) => {
    btn.classList.remove("selecionado")
  })
  document.getElementById("btnConfirmar").disabled = true
}

/**
 * Seleciona o método de pagamento
 */
function selecionarPagamento(metodo) {
  metodoPagamento = metodo

  // Atualiza visual dos botões
  document.querySelectorAll(".btn-pagamento").forEach((btn) => {
    btn.classList.remove("selecionado")
  })
  document.querySelector(`[data-metodo="${metodo}"]`).classList.add("selecionado")

  // Habilita botão de confirmar
  document.getElementById("btnConfirmar").disabled = false
}

// ==========================================
// FUNÇÕES DE CONFIRMAÇÃO E ACOMPANHAMENTO
// ==========================================

/**
 * Confirma o pedido e vai para a tela de acompanhamento
 */
function confirmarPedido() {
  if (!metodoPagamento) {
    alert("Por favor, selecione uma forma de pagamento")
    return
  }

  // Gera número do pedido (formato de 3 dígitos)
  const numeroPedido = String(numeroPedidoAtual).padStart(3, "0")
  numeroPedidoAtual++

  // Adiciona pedido à lista de "em preparo"
  pedidosEmPreparo.push(numeroPedido)

  // Vai para tela de acompanhamento
  mudarTela("telaAcompanhamento")

  // Exibe o número do pedido
  document.getElementById("numeroPedido").textContent = numeroPedido

  // Atualiza as listas de status
  atualizarStatusPedidos()

  // Simula mudança de status após 8 segundos
  setTimeout(() => {
    moverPedidoParaPronto(numeroPedido)
  }, 8000)

  // Limpa o carrinho
  carrinho = []
}

/**
 * Atualiza a exibição dos pedidos em preparo e prontos
 */
function atualizarStatusPedidos() {
  const emPreparoDiv = document.getElementById("pedidosEmPreparo")
  const prontosDiv = document.getElementById("pedidosProntos")

  // Atualiza "Em Preparo"
  if (pedidosEmPreparo.length === 0) {
    emPreparoDiv.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Nenhum pedido</p>'
  } else {
    emPreparoDiv.innerHTML = ""
    pedidosEmPreparo.forEach((numero) => {
      const pedidoDiv = document.createElement("div")
      pedidoDiv.className = "pedido-numero"
      pedidoDiv.textContent = `Nº ${numero}`
      emPreparoDiv.appendChild(pedidoDiv)
    })
  }

  // Atualiza "Prontos"
  if (pedidosProntos.length === 0) {
    prontosDiv.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Nenhum pedido</p>'
  } else {
    prontosDiv.innerHTML = ""
    pedidosProntos.forEach((numero) => {
      const pedidoDiv = document.createElement("div")
      pedidoDiv.className = "pedido-numero"
      pedidoDiv.textContent = `Nº ${numero}`
      pedidoDiv.style.backgroundColor = "#d4edda"
      pedidoDiv.style.color = "#28a745"
      prontosDiv.appendChild(pedidoDiv)
    })
  }
}

/**
 * Move um pedido de "em preparo" para "pronto"
 */
function moverPedidoParaPronto(numeroPedido) {
  // Remove de "em preparo"
  pedidosEmPreparo = pedidosEmPreparo.filter((n) => n !== numeroPedido)

  // Adiciona em "prontos"
  pedidosProntos.push(numeroPedido)

  // Atualiza exibição
  atualizarStatusPedidos()
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

// Quando a página carregar, garante que a tela inicial está ativa
document.addEventListener("DOMContentLoaded", () => {
  mudarTela("telaInicial")
})
