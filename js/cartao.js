(function () {
  var S = window.SITE;
  var $ = function (s) { return document.querySelector(s); };

  /* WhatsApp com mensagem do cartão */
  var wa = window.waLink('cartao');
  $('#btn-wa').href = wa; $('#c-wa').href = wa;

  /* campos opcionais (só aparecem se preenchidos em js/config.js) */
  if (S.instagram) {
    var u = S.instagram.replace('@', '');
    var ig = $('#c-ig'); ig.href = 'https://instagram.com/' + u; ig.querySelector('.t').textContent = '@' + u; ig.hidden = false;
  }
  if (S.email) {
    var m = $('#c-mail'); m.href = 'mailto:' + S.email; m.querySelector('.t').textContent = S.email; m.hidden = false;
  }
  $('#c-site').querySelector('.t').textContent = S.url.replace(/^https?:\/\//, '');
  $('#c-site').href = S.url + '/';

  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('show'); }, 2600);
  }

  /* ---------- VCF ---------- */
  function buildVcf() {
    var L = [
      'BEGIN:VCARD', 'VERSION:3.0',
      'N:Gonçalves;Gabriel;;;', 'FN:' + S.nome,
      'TITLE:Marketing Digital e Soluções de Presença Digital',
      'TEL;TYPE=CELL,VOICE,WORK:' + S.telefoneVcf,
      'URL:' + S.url + '/',
      'ADR;TYPE=WORK:;;;' + S.cidade + ';' + S.estado + ';;Brasil',
      'NOTE:Marketing digital em ' + S.cidade + ' – ' + S.estado + '.'
    ];
    if (S.email) L.push('EMAIL;TYPE=INTERNET:' + S.email);
    if (S.instagram) L.push('X-SOCIALPROFILE;TYPE=instagram:https://instagram.com/' + S.instagram.replace('@', ''));
    L.push('END:VCARD');
    return L.join('\r\n') + '\r\n';
  }
  $('#btn-vcf').addEventListener('click', function (e) {
    try {
      var blob = new Blob([buildVcf()], { type: 'text/vcard;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = 'Gabriel Gonçalves.vcf';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      e.preventDefault();
      toast('Contato baixado — abra o arquivo para salvar na agenda');
    } catch (err) { /* sem Blob: segue o link do arquivo .vcf estático */ }
  });
  window.__buildVcf = buildVcf;

  /* ---------- Compartilhar ---------- */
  $('#btn-share').addEventListener('click', function () {
    var data = {
      title: 'Gabriel Gonçalves | Cartão Digital',
      text: 'Cartão digital de Gabriel Gonçalves – Marketing Digital em Anápolis.',
      url: S.url + '/cartao'
    };
    if (navigator.share) {
      navigator.share(data).catch(function () { });
    } else if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(data.url).then(function () { toast('Link copiado!'); }, fallback);
    } else { fallback(); }
    function fallback() {
      var i = document.createElement('input'); i.value = data.url; document.body.appendChild(i); i.select();
      try { document.execCommand('copy'); toast('Link copiado!'); } catch (e) { prompt('Copie o link:', data.url); }
      i.remove();
    }
  });
})();
