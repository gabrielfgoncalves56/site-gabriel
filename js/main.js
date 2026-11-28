(function () {
  var S = window.SITE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ic = function (n, cls) { return '<svg class="icon ' + (cls || '') + '"><use href="#i-' + n + '"/></svg>'; };

  /* WhatsApp por seção */
  $$('[data-wa]').forEach(function (a) { a.href = window.waLink(a.getAttribute('data-wa')); });

  /* contatos opcionais no rodapé */
  if (S.instagram) { var ig = $('.ig-link'); ig.href = 'https://instagram.com/' + S.instagram.replace('@', ''); ig.hidden = false; }
  if (S.email) { var ml = $('.mail-link'); ml.href = 'mailto:' + S.email; ml.hidden = false; }
  $('#ano').textContent = new Date().getFullYear();

  /* menu mobile */
  var btn = $('.menu-btn'), nav = $('#nav');
  function closeMenu() { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  /* header / botão flutuante */
  var header = $('.header'), fab = $('#fab');
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 8);
    fab.classList.toggle('show', y > 520);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Exemplos ---------- */
  var QR = '<svg class="qr"><use href="#i-qrfill"/></svg>';
  var stars = '<div class="stars">' + [1, 2, 3, 4, 5].map(function () { return ic('star'); }).join('') + '</div>';
  function ph(label) { return '<div class="ph">' + ic('cam') + '<em>' + label + '</em></div>'; }
  function google(nome, cat, foto, chips) {
    return '<div class="mk mk-g">' + ph(foto) + '<b>' + nome + '</b>' + stars + '<small>' + cat + ' · Anápolis, GO</small><div class="chips">' +
      chips.map(function (c, i) { return '<span class="chip' + (i === 0 ? ' on' : '') + '">' + c + '</span>'; }).join('') + '</div></div>';
  }
  function site(url, titulo, sub, cta, tiles) {
    return '<div class="mk mk-site"><div class="mk-bar"><i></i><i></i><i></i><span>' + url + '</span></div>' +
      '<div class="mk-hero"><b>' + titulo + '</b><small>' + sub + '</small><span class="pill">' + cta + '</span></div>' +
      '<div class="mk-tiles">' + tiles.map(ph).join('') + '</div></div>';
  }

  var DEMOS = [
    {
      id: 'restaurante', nome: 'Restaurante', tone: ['#eadfce', '#d6c3a5'],
      titulo: 'Restaurante: ser a escolha de quem está com fome',
      texto: 'Quem busca onde comer decide em segundos, olhando fotos, avaliações e o cardápio.',
      hoje: 'Perfil incompleto, fotos escuras e sem cardápio à mão.',
      depois: 'Perfil organizado, fotos que dão água na boca e uma página com cardápio e pedido pelo WhatsApp.',
      itens: ['Perfil do Google completo (horário, fotos, cardápio)', 'Fotos profissionais dos pratos mais pedidos', 'Vídeo curto para Reels e anúncios', 'Página simples com cardápio e botão de pedido', 'Plaquinha NFC/QR Code na mesa e no caixa'],
      wa: 'Olá, Gabriel! Vi o exemplo de restaurante no seu site e quero algo assim para minha empresa.',
      html: function () {
        return site('seurestaurante.com.br', 'Sabor que faz voltar', 'Cardápio, endereço e pedido em uma só página.', 'Ver cardápio', ['Prato 1', 'Prato 2', 'Prato 3']) +
          google('Restaurante Exemplo', 'Restaurante', 'Foto do prato', ['Ligar', 'Rotas', 'Cardápio']) +
          '<div class="mk mk-y"><div class="vid">' + ic('play') + '</div><small>Vídeo promocional</small></div>';
      }
    },
    {
      id: 'clinica', nome: 'Clínica', tone: ['#e2e8ee', '#c6d2dd'],
      titulo: 'Clínica: passar confiança antes da primeira consulta',
      texto: 'O paciente pesquisa, compara avaliações e escolhe quem parece mais seguro e fácil de contatar.',
      hoje: 'Pouca informação online e agendamento só por ligação.',
      depois: 'Site claro com equipe e especialidades, perfil do Google atualizado e agendamento em um toque.',
      itens: ['Site institucional com especialidades e equipe', 'Botão de agendamento pelo WhatsApp', 'Perfil do Google organizado e atualizado', 'Fotos profissionais da estrutura e do atendimento', 'Campanhas para receber novos contatos'],
      wa: 'Olá, Gabriel! Vi o exemplo de clínica no seu site e quero algo assim para minha empresa.',
      html: function () {
        return site('suaclinica.com.br', 'Cuidado com quem entende', 'Especialidades, equipe e agendamento direto.', 'Agendar pelo WhatsApp', ['Equipe', 'Estrutura', 'Atendimento']) +
          google('Clínica Exemplo', 'Clínica', 'Foto da fachada', ['Agendar', 'Rotas', 'Site']) +
          '<div class="mk mk-x"><h4>Agendamento</h4><div class="bubble">Olá! Gostaria de agendar uma consulta.</div><div class="bubble me">Claro! Qual o melhor dia para você?</div><div class="row">' + ic('wa') + 'Botão de WhatsApp no site</div></div>';
      }
    },
    {
      id: 'loja', nome: 'Loja comercial', tone: ['#e6e3dc', '#cfcabd'],
      titulo: 'Loja: vitrine aberta o dia todo',
      texto: 'Mostre seus produtos, divulgue ofertas e facilite a avaliação de quem já comprou.',
      hoje: 'Produtos só no balcão e poucos clientes avaliando.',
      depois: 'Catálogo organizado, ofertas divulgadas e plaquinha na bancada levando o cliente à avaliação.',
      itens: ['Catálogo de produtos com fotos profissionais', 'Divulgação de ofertas nas redes e no Google', 'Campanhas de tráfego pago para a loja', 'Perfil do Google com produtos cadastrados', 'Plaquinha NFC/QR Code para avaliações'],
      wa: 'Olá, Gabriel! Vi o exemplo de loja no seu site e quero algo assim para minha empresa.',
      html: function () {
        return site('sualoja.com.br', 'Catálogo e ofertas', 'Produtos organizados e pedido direto no WhatsApp.', 'Ver catálogo', ['Produto 1', 'Produto 2', 'Produto 3']) +
          google('Loja Exemplo', 'Loja', 'Foto da loja', ['Ligar', 'Rotas', 'Produtos']) +
          '<div class="mk mk-y">' + QR + '<h4>Avalie nossa loja</h4><span class="tag">NFC + QR</span></div>';
      }
    },
    {
      id: 'prestador', nome: 'Prestador de serviços', tone: ['#dfe2e8', '#c3c9d4'],
      titulo: 'Prestador de serviços: contato fácil, imagem profissional',
      texto: 'Eletricista, advogado, designer, mecânico: quem se apresenta bem e é fácil de chamar fecha mais conversas.',
      hoje: 'Contato espalhado e nenhuma página para mostrar o trabalho.',
      depois: 'Cartão digital, site enxuto com seus serviços e presença no Google, tudo com botão de WhatsApp.',
      itens: ['Cartão de visita digital para enviar pelo WhatsApp', 'Site profissional com serviços e diferenciais', 'Botão de WhatsApp em todas as páginas', 'Perfil no Google para ser achado na região'],
      wa: 'Olá, Gabriel! Vi o exemplo de prestador de serviços no seu site e quero algo assim para minha empresa.',
      html: function () {
        return site('seunome.com.br', 'Serviço de confiança', 'O que faço, onde atendo e como falar comigo.', 'Chamar no WhatsApp', ['Serviço 1', 'Serviço 2', 'Serviço 3']) +
          google('Profissional Exemplo', 'Serviços', 'Foto do trabalho', ['Ligar', 'Rotas', 'Site']) +
          '<div class="mk mk-x"><h4>Cartão digital</h4><div class="row">' + ic('phone') + 'Salvar contato</div><div class="row">' + ic('wa') + 'Conversar no WhatsApp</div><div class="row">' + ic('share') + 'Compartilhar cartão</div></div>';
      }
    }
  ];

  var tabs = $('#demo-tabs'), panels = $('#demo-panels');
  DEMOS.forEach(function (d, i) {
    var t = document.createElement('button');
    t.className = 'tab'; t.type = 'button'; t.id = 'tab-' + d.id; t.setAttribute('role', 'tab');
    t.setAttribute('aria-selected', i === 0); t.setAttribute('aria-controls', 'pn-' + d.id); t.textContent = d.nome;
    t.addEventListener('click', function () { select(i); });
    tabs.appendChild(t);

    var p = document.createElement('div');
    p.className = 'demo-panel'; p.id = 'pn-' + d.id; p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', t.id);
    if (i) p.hidden = true;
    p.innerHTML =
      '<div class="demo-info"><span class="badge">Exemplo demonstrativo · conceitual</span>' +
      '<h3>' + d.titulo + '</h3><p>' + d.texto + '</p>' +
      '<div class="ba"><div><span>Hoje</span>' + d.hoje + '</div><div class="after"><span>Com o meu trabalho</span>' + d.depois + '</div></div>' +
      '<h4 class="recebe">O que você recebe</h4>' +
      '<ul>' + d.itens.map(function (it) { return '<li>' + ic('check') + it + '</li>'; }).join('') + '</ul>' +
      '<a class="btn btn-wa" target="_blank" rel="noopener" href="https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent(d.wa) + '">' + ic('wa') + 'Quero algo assim</a></div>' +
      '<div class="mocks" style="--tone:' + d.tone[0] + ';--tone2:' + d.tone[1] + '" aria-label="Composição ilustrativa">' + d.html() + '</div>';
    panels.appendChild(p);
  });
  function select(n) {
    $$('.tab', tabs).forEach(function (t, i) { t.setAttribute('aria-selected', i === n); });
    $$('.demo-panel', panels).forEach(function (p, i) { p.hidden = i !== n; });
  }
  tabs.addEventListener('keydown', function (e) {
    var all = $$('.tab', tabs), i = all.indexOf(document.activeElement);
    if (i < 0) return;
    if (e.key === 'ArrowRight') { all[(i + 1) % all.length].focus(); all[(i + 1) % all.length].click(); }
    if (e.key === 'ArrowLeft') { all[(i + all.length - 1) % all.length].focus(); all[(i + all.length - 1) % all.length].click(); }
  });

  /* ---------- Portfólio ---------- */
  var grid = $('#grid'), filters = $('#filters'), cur = 'todos';
  function catName(id) { var c = window.CATEGORIAS.filter(function (x) { return x.id === id; })[0]; return c ? c.nome : id; }
  function mock(t) {
    var m = {
      site: '<div class="pm"><i class="h"></i><i class="l"></i><i class="l s"></i><i class="b"></i></div>',
      marca: '<div class="pm marca"><div class="lg">G</div><div class="sw"><i style="background:#111318"></i><i style="background:#1f45f5"></i><i style="background:#e3e1da"></i></div></div>',
      campanha: '<div class="pm camp"><div class="bars"><i style="height:30%"></i><i style="height:46%"></i><i style="height:40%"></i><i style="height:66%"></i><i style="height:100%"></i></div></div>',
      video: '<div class="pm vid"><i class="v">' + ic('play') + '</i></div>',
      perfil: '<div class="pm"><i class="h"></i><i class="l"></i><div class="stars" style="margin:0">' + [1, 2, 3, 4, 5].map(function () { return ic('star'); }).join('') + '</div><i class="l s"></i></div>',
      nfc: '<div class="pm nfc">' + QR + '<div class="sw" style="color:var(--accent)">' + ic('nfc', '') + '</div></div>'
    };
    return m[t] || m.site;
  }
  function render() {
    grid.innerHTML = '';
    window.PROJETOS.filter(function (p) { return cur === 'todos' || p.categoria === cur; }).forEach(function (p) {
      var el = document.createElement('article');
      el.className = 'proj';
      var img = p.imagem ? '<img loading="lazy" src="' + p.imagem + '" alt="' + p.nome + '">' : mock(p.mockup);
      el.innerHTML = '<div class="proj-img">' + img + '</div><div class="proj-body"><span class="proj-cat">' + catName(p.categoria) + '</span><h3>' + p.nome + '</h3><p>' + p.descricao + '</p>' +
        (p.link ? '<a class="view" href="' + p.link + '" target="_blank" rel="noopener">Visualizar ' + ic('arrow') + '</a>' : '') +
        (p.demo ? '<span class="demo-tag">Demonstração conceitual</span>' : '') + '</div>';
      grid.appendChild(el);
    });
    var inv = document.createElement('article');
    inv.className = 'proj invite';
    inv.innerHTML = '<div class="proj-body"><span class="proj-cat">Próximo case</span><h3>O próximo projeto pode ser o seu</h3><p>Me conte o que sua empresa precisa e eu monto uma proposta sob medida.</p>' +
      '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + window.waLink('portfolio') + '">' + ic('wa') + 'Pedir proposta</a></div>';
    grid.appendChild(inv);
  }
  window.CATEGORIAS.forEach(function (c) {
    var b = document.createElement('button');
    b.className = 'filter'; b.type = 'button'; b.textContent = c.nome; b.setAttribute('aria-pressed', c.id === cur);
    b.addEventListener('click', function () {
      cur = c.id; render();
      $$('.filter', filters).forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    });
    filters.appendChild(b);
  });
  render();


  /* ---------- Mostruário: o que eu faço, na prática ---------- */
  var bento = $('#bento');
  if (bento) {
    var M = window.MOSTRUARIO || [];
    var vis = {
      video: '<div class="bv-video"><div class="ph9">' + ic('play') + '</div><i class="prog"></i><span class="chipx">Reels</span></div>',
      foto: '<div class="bv-foto"><div class="ph">' + ic('cam') + '</div><div class="ph">' + ic('cam') + '</div><div class="ph">' + ic('cam') + '</div><div class="ph">' + ic('cam') + '</div><i class="flash"></i></div>',
      site: '<div class="bv-site"><div class="bar"><i></i><i></i><i></i></div><div class="view"><div class="inner"><div class="hero2"><b></b><u></u><span></span></div><div class="row3"><i></i><i></i><i></i></div><div class="row3"><i></i><i></i><i></i></div></div></div></div>',
      google: '<div class="bv-google"><div class="gcard"><div class="lg">SE</div><div><b>Sua Empresa</b><div class="stars">' + [1, 2, 3, 4, 5].map(function () { return ic('star'); }).join('') + '</div></div></div><div class="bars"><i style="height:30%"></i><i style="height:44%"></i><i style="height:38%"></i><i style="height:64%"></i><i style="height:100%"></i></div></div>'
    };
    M.forEach(function (m) {
      var el = document.createElement('article');
      el.className = 'bt rv';
      var media;
      if (m.video) media = '<video src="' + m.video + '" muted loop autoplay playsinline preload="metadata"></video>';
      else if (m.imagem) media = '<img loading="lazy" src="' + m.imagem + '" alt="' + m.titulo + '">';
      else media = vis[m.tipo];
      el.innerHTML = '<div class="bt-vis">' + media + (m.video || m.imagem ? '' : '<span class="model">Modelo ilustrativo</span>') + '</div>' +
        '<div class="bt-txt"><h3>' + m.titulo + '</h3><p>' + m.texto + '</p></div>';
      bento.appendChild(el);
    });
  }

  /* ---------- Revelar ao rolar ---------- */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }
})();

/* ---- fluxo animado de avaliações ---- */
(function(){
  var f=document.getElementById('flow'); if(!f) return;
  var scr=[].slice.call(f.querySelectorAll('.scr')), li=[].slice.call(f.querySelectorAll('.steps li')), i=0, t=null;
  function go(n){ i=n; scr.forEach(function(s,k){ s.classList.toggle('on',k===n); }); li.forEach(function(l,k){ l.classList.toggle('on',k===n); }); }
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function play(){ clearInterval(t); if(still) return; t=setInterval(function(){ go((i+1)%scr.length); }, 3200); }
  go(0);
  f.querySelectorAll('[data-go]').forEach(function(b){ b.addEventListener('click',function(){ go(+b.getAttribute('data-go')); play(); }); });
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ go(0); play(); } else { clearInterval(t); } }); },{threshold:.35}).observe(f);
  } else play();
})();

/* ---- vídeo demonstrativo: toca só quando visível ---- */
(function(){
  var v=document.getElementById('demo-nfc'); if(!v) return;
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(still){ v.controls=true; return; }
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){ es.forEach(function(e){
      if(e.isIntersecting){ var pr=v.play(); if(pr&&pr.catch) pr.catch(function(){ v.controls=true; }); } else v.pause();
    }); },{threshold:.4}).observe(v);
  } else { v.controls=true; }
})();

/* ---- simulação de busca no Google (hero) ---- */
(function(){
  var list=document.getElementById('gs-list'); if(!list) return;
  var qEl=document.getElementById('gs-q'), badge=document.getElementById('gs-badge'), ping=document.getElementById('gs-ping'),
      tabsEl=document.getElementById('gs-tabs'), box=list.closest('.gs');
  var SC=[
    {tab:'Floricultura', q:'floricultura em anápolis', mine:'Sua floricultura', mi:'VC', o:'Outra floricultura', oi:'OF'},
    {tab:'Sorveteria', q:'sorveteria em anápolis', mine:'Sua sorveteria', mi:'VC', o:'Outra sorveteria', oi:'OS'},
    {tab:'Restaurante', q:'restaurante em anápolis', mine:'Seu restaurante', mi:'VC', o:'Outro restaurante', oi:'OR'}
  ];
  var RH=80, GAP=10, token=0, idx=0, rows=[], mine=null;
  var STAR='<svg class="icon"><use href="#i-star"/></svg>';
  function stars(n){ var h=''; for(var i=0;i<5;i++) h+=STAR.replace('class="icon"','class="icon'+(i<n?'':' off')+'"'); return '<div class="stars">'+h+'</div>'; }
  function top(i){ return i*(RH+GAP); }
  function wait(ms,t){ return new Promise(function(r){ setTimeout(function(){ r(t===token); },ms); }); }
  SC.forEach(function(sc,i){ var c=document.createElement('span'); c.className='chip'; c.textContent=sc.tab; tabsEl.appendChild(c); });
  function setTab(i){ [].forEach.call(tabsEl.children,function(c,k){ c.classList.toggle('on',k===i); }); }
  function build(sc){
    list.innerHTML=''; rows=[];
    for(var i=0;i<4;i++){
      var m=(i===3), el=document.createElement('div');
      el.className='row'+(m?' mine weak':'');
      el.style.top=top(i)+'px';
      el.innerHTML='<div class="logo">'+(m?sc.mi:sc.oi)+'</div><div><b>'+(m?sc.mine:sc.o)+'</b>'+stars(m?2:4)+'<small>'+(m?'Perfil incompleto · sem fotos':'Anápolis, GO · Aberto agora')+'</small></div><span class="rank">1º</span>';
      list.appendChild(el); rows.push(el);
    }
    mine=rows[3];
  }
  function setBadge(after){ badge.className=after?'after':'before'; badge.textContent=after?'Com o meu trabalho':'Hoje'; }
  function upgrade(){
    mine.classList.remove('weak'); mine.classList.add('strong');
    mine.querySelector('small').textContent='Perfil completo · fotos · Aberto agora';
  }
  function place(){ // mine sobe para 1º; os demais descem uma posição
    mine.style.top=top(0)+'px'; mine.classList.add('top');
    for(var i=0;i<3;i++) rows[i].style.top=top(i+1)+'px';
  }
  async function loop(){
    var t=++token;
    while(t===token){
      var sc=SC[idx]; setTab(idx); build(sc); setBadge(false); ping.classList.remove('show'); qEl.textContent='';
      for(var i=0;i<sc.q.length;i++){ qEl.textContent=sc.q.slice(0,i+1); if(!await wait(55,t)) return; }
      if(!await wait(350,t)) return;
      for(var r=0;r<4;r++){ rows[r].classList.add('in'); if(!await wait(140,t)) return; }
      if(!await wait(1400,t)) return;
      setBadge(true); upgrade();
      var st=mine.querySelectorAll('.stars .icon');
      for(var k=0;k<5;k++){ st[k].classList.remove('off'); if(!await wait(110,t)) return; }
      if(!await wait(500,t)) return;
      place();
      if(!await wait(1150,t)) return;
      ping.classList.add('show');
      if(!await wait(2800,t)) return;
      ping.classList.remove('show'); rows.forEach(function(el){ el.classList.remove('in'); });
      if(!await wait(550,t)) return;
      idx=(idx+1)%SC.length;
    }
  }
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(still){
    box.classList.add('static'); setTab(0); build(SC[0]); qEl.textContent=SC[0].q; setBadge(true); upgrade();
    [].forEach.call(mine.querySelectorAll('.stars .icon'),function(s){ s.classList.remove('off'); });
    place(); rows.forEach(function(el){ el.classList.add('in'); }); ping.classList.add('show');
    return;
  }
  setTab(0); build(SC[0]);
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ loop(); } else { token++; } }); },{threshold:.25}).observe(document.querySelector('.serp-stage'));
  } else loop();
})();
