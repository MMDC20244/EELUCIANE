# DEMBEFLIX — configuração Firebase

## O que foi preparado
- Cadastro real com Firebase Authentication (e-mail/senha).
- Login real com validação de credenciais.
- Perfil salvo em `usuarios/{uid}` no Cloud Firestore.
- Proteção de `catalogo.html` e `player.html`: sem sessão válida, redireciona para `login.html`.
- Botão Sair encerra a sessão.
- Regras iniciais do Firestore em `firestore.rules`.

## Passos no Console Firebase
1. Crie/abra um projeto em https://console.firebase.google.com/.
2. Em Authentication > Sign-in method, habilite **E-mail/senha**.
3. Em Configurações do projeto > Seus apps, registre um app Web e copie a configuração.
4. Cole os valores no arquivo `firebase-config.js`, substituindo todos os `COLE...` e `SEU-PROJETO`.
5. Em Firestore Database, crie o banco (modo produção).
6. Na aba Regras do Firestore, publique o conteúdo de `firestore.rules`.
7. Execute o site por um servidor HTTP (por exemplo, Live Server ou hospedagem). Não abra os HTML diretamente por `file://`.

## Estrutura do Firestore
Coleção `usuarios`, documento com ID igual ao UID do Firebase Authentication:
- `uid` (string)
- `nome` (string)
- `email` (string)
- `genero` (string)
- `dataNascimento` (string YYYY-MM-DD)
- `status` (string: ativo)
- `criadoEm` (timestamp)

A senha NÃO é armazenada no Firestore. Ela fica sob responsabilidade segura do Firebase Authentication.

## Importante sobre bloquear acesso
O guard do navegador impede a navegação normal sem login. Para proteger vídeos, URLs de mídia e APIs, não deixe links diretos públicos dos arquivos de vídeo. Hospede/entregue mídia por uma camada que também valide autenticação e autorização. As regras do Firestore não protegem arquivos ou vídeos hospedados fora do Firestore.

## Observação sobre o projeto recebido
O player atual incorpora vídeos do YouTube. A autenticação protege a página do player, mas não transforma trailers públicos do YouTube em conteúdo privado nem substitui licenças de distribuição dos filmes.
