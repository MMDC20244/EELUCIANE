# DEMBEFLIX — pacote para reenvio ao repositório EELUCIANE

## Como enviar ao GitHub

Este ZIP já está organizado para que os arquivos fiquem diretamente na raiz do repositório (não existe uma pasta externa ProjetoNetflix envolvendo tudo).

1. No GitHub, abra o repositório EELUCIANE.
2. Use Add file > Upload files.
3. Extraia este ZIP no computador.
4. Envie o CONTEÚDO da pasta extraída, incluindo a pasta Imagens, para a raiz do repositório.
5. Faça Commit changes.

A estrutura esperada é: index.html, login.html, catalogo.html, player.html, arquivos JS/CSS e a pasta Imagens/ no mesmo nível.

## Firebase

Antes de testar cadastro/login, substitua os valores de exemplo no firebase-config.js pelos valores reais do app Web criado no Firebase Console. Não envie credenciais administrativas/service account.

## Vercel

Como os HTML estão na raiz, deixe Root Directory como ./ (raiz do repositório) nas configurações do projeto Vercel. O deploy normalmente inicia após o commit no GitHub.

## Link do site no painel do GitHub

O link do site não aparece automaticamente na seção About. Para mostrá-lo, na página principal do repositório clique no ícone de engrenagem ao lado de About, preencha Website com https://lucianee.vercel.app/ e salve. Isso apenas exibe o link no GitHub; não configura o deploy.
