# Site de Gabriel Gonçalves — Marketing Digital (Anápolis – GO)

Site 100% estático (HTML + CSS + JS puro). Sem banco de dados, sem build, sem custo.

## Estrutura
```
index.html              página principal
cartao/index.html       cartão digital  →  seusite.pages.dev/cartao
js/config.js            ★ CONTATOS E MENSAGENS DO WHATSAPP (edite aqui)
js/projetos.js          ★ PORTFÓLIO (adicione projetos aqui)
assets/gabriel.jpg      ★ sua foto (crie/envie este arquivo)
assets/og-image.png     prévia do WhatsApp (site)
assets/og-cartao.png    prévia do WhatsApp (cartão)
gabriel-goncalves.vcf   contato para salvar na agenda (reserva)
tools/gerar-imagens.py  regera as imagens de prévia
```

## O que preencher
1. **E-mail e Instagram** → `js/config.js` (campos `email` e `instagram`). Vazios = ocultos.
2. **Foto** → salve como `assets/gabriel.jpg` (vertical 4:5, ~800×1000 px, leve). Aparece no Sobre e no cartão.
3. **Endereço do site** → quando souber a URL final, troque `https://gabrielgoncalves.pages.dev`
   em todos os arquivos (Ctrl+Shift+H no VS Code → "substituir em todos os arquivos") e em `js/config.js`.
   Também em `gabriel-goncalves.vcf`, `sitemap.xml`, `robots.txt`.
4. Depois de pôr a foto: `python tools/gerar-imagens.py` (inclui a foto na prévia do cartão).

## Adicionar projetos ao portfólio
Abra `js/projetos.js`, copie um bloco `{ ... }`, cole no topo e edite nome, categoria, descrição, imagem (`assets/portfolio/arquivo.jpg`) e link. Remova `demo: true` quando for trabalho real.

## Testar no computador
```
python -m http.server 8000
```
e abra http://localhost:8000

## Publicar no Cloudflare Pages (grátis, via GitHub)
1. Crie conta em github.com e um repositório novo (ex.: `site-gabriel`), público ou privado.
2. Envie esta pasta (GitHub Desktop, ou no terminal dentro da pasta):
   ```
   git init
   git add .
   git commit -m "Site Gabriel Gonçalves"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/site-gabriel.git
   git push -u origin main
   ```
3. Em dash.cloudflare.com crie/entre na conta → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → autorize o GitHub e escolha o repositório.
4. Configuração de build: **Framework preset: None** · **Build command: (vazio)** · **Build output directory: `/`** (raiz). Clique em **Save and Deploy**.
5. Em ~1 minuto o site fica em `https://NOME-DO-PROJETO.pages.dev`. O nome do projeto define o endereço (ex.: projeto `gabrielgoncalves` → `gabrielgoncalves.pages.dev`; se estiver ocupado, a Cloudflare acrescenta números — aí ajuste a URL conforme o passo 3 acima).
6. Atualizações: edite, `git commit` + `git push` → publica sozinho.

## Usar o cartão no dia a dia
Envie pelo WhatsApp: `https://SEU-SITE.pages.dev/cartao`
A prévia mostra título, descrição e imagem. Dica: abra o link uma vez no seu celular e salve nos favoritos / crie um atalho na tela inicial, ou gere um QR Code dele.
(Se a prévia não atualizar após mudar a imagem, o WhatsApp guarda cache: acrescente `?v=2` ao link.)

## Domínio próprio no futuro
Pages → seu projeto → **Custom domains** → Set up a domain → digite o domínio. Depois troque a URL nos arquivos (item 3) e publique de novo.

## Trocar os modelos por trabalhos REAIS
- **"Na prática" (4 blocos)** e **Portfólio** ficam em `js/projetos.js`.
- Mostruário: preencha `imagem: "assets/portfolio/arquivo.jpg"` ou `video: "assets/portfolio/reels.mp4"` (vídeo curto, sem som, até ~5 MB). O selo "Modelo ilustrativo" some sozinho.
- Portfólio: copie um bloco `{ ... }`, cole no topo, use `imagem` e `link` e **remova `demo: true`**.
- Só publique trabalhos de clientes com autorização deles.
