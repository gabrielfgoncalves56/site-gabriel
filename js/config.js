/* =====================================================================
   CONFIGURAÇÃO CENTRAL — edite SÓ AQUI para atualizar contatos e links.
   Tudo que estiver vazio ("") fica oculto automaticamente no site.
   ===================================================================== */
window.SITE = {
  nome: "Gabriel Gonçalves",
  cargo: "Marketing Digital e Soluções de Presença Digital",

  // Endereço público do site (sem barra no final). Troque quando tiver domínio próprio.
  url: "https://gabrielgoncalves.pages.dev",

  whatsapp: "5562982205026",          // formato internacional, só números
  telefoneVcf: "+5562982205026",      // usado no arquivo de contato (VCF)
  telefoneExibicao: "(62) 98220-5026",

  // >>> PREENCHER <<<  (deixe "" enquanto não tiver; o campo some do site)
  email: "",                          // ex.: "contato@seudominio.com.br"
  instagram: "",                      // ex.: "gabriel.goncalves" (sem @)

  cidade: "Anápolis",
  estado: "GO",

  // Mensagens do WhatsApp por seção de origem
  mensagens: {
    geral:     "Olá, Gabriel! Vi seu site e gostaria de saber mais sobre seus serviços.",
    hero:      "Olá, Gabriel! Quero conhecer os serviços de marketing digital.",
    trafego:   "Olá, Gabriel! Tenho interesse em gestão de tráfego pago.",
    google:    "Olá, Gabriel! Quero melhorar o perfil da minha empresa no Google.",
    midia:     "Olá, Gabriel! Tenho interesse em fotos e vídeos profissionais para minha empresa.",
    site:      "Olá, Gabriel! Tenho interesse em desenvolver um site para minha empresa.",
    nfc:       "Olá, Gabriel! Quero conhecer as plaquinhas NFC e QR Code para avaliações.",
    exemplos:  "Olá, Gabriel! Vi os exemplos no seu site e quero algo parecido para minha empresa.",
    portfolio: "Olá, Gabriel! Vi seu portfólio e gostaria de pedir uma proposta.",
    sobre:     "Olá, Gabriel! Gostaria de conversar sobre o marketing digital da minha empresa.",
    proposta:  "Olá, Gabriel! Gostaria de solicitar uma proposta para minha empresa.",
    cartao:    "Olá, Gabriel! Conheci seu cartão digital e gostaria de saber mais sobre seus serviços."
  }
};

window.waLink = function (chave) {
  var s = window.SITE;
  var msg = s.mensagens[chave] || s.mensagens.geral;
  return "https://wa.me/" + s.whatsapp + "?text=" + encodeURIComponent(msg);
};
