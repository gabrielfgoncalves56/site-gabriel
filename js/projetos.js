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
    nome: "Perfil do Google otimizado",
    categoria: "presenca",
    descricao: "Perfil completo, com fotos, serviços e avaliações, pronto para ser encontrado e escolhido.",
    imagem: "", link: "", demo: true, mockup: "perfil"
  },
  {
    nome: "Placa de avaliação com aproximação e QR Code",
    categoria: "presenca",
    descricao: "Acesso direto à página de avaliações do Google com um toque ou leitura.",
    imagem: "", link: "", demo: true, mockup: "nfc"
  }
];

/* =====================================================================
   MOSTRUÁRIO — "O que eu faço, na prática" (4 blocos visuais)
   Para trocar o modelo ilustrado por uma foto ou vídeo REAL seu:
     imagem: "assets/portfolio/minha-foto.jpg"   ou   video: "assets/portfolio/meu-reels.mp4"
   (vídeo curto, sem som, até ~5 MB). Deixe "" para manter o modelo desenhado.
   ===================================================================== */
window.MOSTRUARIO = [
  { tipo: "video",  titulo: "Vídeos profissionais", texto: "Reels, vídeos institucionais e de produtos que prendem a atenção.", imagem: "", video: "" },
  { tipo: "foto",   titulo: "Fotos profissionais",  texto: "Fotos de produtos, equipe e ambiente que valorizam sua empresa.",   imagem: "", video: "" },
  { tipo: "site",   titulo: "Sites e páginas",      texto: "Seu negócio apresentado de forma clara, rápida e com botão de WhatsApp.", imagem: "", video: "" },
  { tipo: "google", titulo: "Google e anúncios",    texto: "Perfil otimizado, avaliações e campanhas para aparecer a quem procura.", imagem: "", video: "" }
];
