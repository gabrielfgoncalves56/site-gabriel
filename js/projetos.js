/* =====================================================================
   PORTFÓLIO — como adicionar um projeto
   1) Coloque a imagem em /assets/portfolio/ (ex.: assets/portfolio/meu-projeto.jpg)
   2) Copie um bloco { ... } abaixo, cole no início da lista e edite:
        nome       → nome do projeto
        categoria  → "sites" | "identidade" | "trafego" | "conteudo" | "presenca"
        descricao  → frase curta
        imagem     → "assets/portfolio/meu-projeto.jpg"  (deixe "" para usar o mockup padrão)
        link       → endereço para visualizar (deixe "" se não existir)
        demo       → true = "Demonstração conceitual"; REMOVA/false quando for trabalho real
   Os itens abaixo são DEMONSTRAÇÕES CONCEITUAIS (não são clientes reais).
   ===================================================================== */
window.CATEGORIAS = [
  { id: "todos",      nome: "Todos" },
  { id: "sites",      nome: "Sites e landing pages" },
  { id: "identidade", nome: "Identidade visual e design" },
  { id: "trafego",    nome: "Tráfego pago" },
  { id: "conteudo",   nome: "Conteúdo e vídeos" },
  { id: "presenca",   nome: "Presença digital" }
];

window.PROJETOS = [
  {
    nome: "Landing page para clínica",
    categoria: "sites",
    descricao: "Página de apresentação com botão de agendamento pelo WhatsApp.",
    imagem: "", link: "", demo: true, mockup: "site"
  },
  {
    nome: "Site institucional para prestador de serviços",
    categoria: "sites",
    descricao: "Estrutura enxuta: serviços, diferenciais e contato direto.",
    imagem: "", link: "", demo: true, mockup: "site"
  },
  {
    nome: "Identidade visual para comércio local",
    categoria: "identidade",
    descricao: "Logotipo, paleta e aplicações básicas para redes sociais.",
    imagem: "", link: "", demo: true, mockup: "marca"
  },
  {
    nome: "Estrutura de campanha de captação",
    categoria: "trafego",
    descricao: "Organização de campanhas no Google Ads e Meta Ads para geração de contatos.",
    imagem: "", link: "", demo: true, mockup: "campanha"
  },
  {
    nome: "Reels e fotos de produto",
    categoria: "conteudo",
    descricao: "Roteiro, captação e edição de conteúdo para Instagram.",
    imagem: "", link: "", demo: true, mockup: "video"
  },
  {
    nome: "Perfil do Google organizado",
    categoria: "presenca",
    descricao: "Informações, fotos, serviços e avaliações em ordem.",
    imagem: "", link: "", demo: true, mockup: "perfil"
  },
  {
    nome: "Plaquinha NFC + QR Code de avaliações",
    categoria: "presenca",
    descricao: "Acesso direto à página de avaliações do Google com um toque ou leitura.",
    imagem: "", link: "", demo: true, mockup: "nfc"
  }
];
