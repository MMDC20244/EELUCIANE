# DEMBEFLIX — correção do cadastro Firebase

Este pacote mantém os arquivos na raiz do repositório EELUCIANE e inclui a pasta `Imagens/`.

## Correções aplicadas
- `firebase-config.js` preenchido com os dados do app Web DEMBEFLIX exibidos no Firebase Console.
- `login.html`: corrigidos os IDs dos campos Senha (`cadSenha`) e Confirmar senha (`cadConfirmaSenha`).
- `login.js`: valida campos, compara as senhas, trata erros do Firebase e mostra mensagens mais específicas.
- O catálogo só é aberto depois da autenticação.

## Como publicar
1. Extraia o ZIP.
2. No repositório GitHub EELUCIANE, envie o conteúdo de dentro desta pasta para a raiz do repositório (não envie uma pasta externa envolvendo tudo).
3. Faça Commit changes.
4. Aguarde o Vercel concluir o deployment.

## Passo obrigatório no Firebase
No Firebase Console:
1. Authentication > Settings / Configurações > Authorized domains / Domínios autorizados.
2. Adicione o domínio exato usado pelo site no Vercel, por exemplo `luluciane.vercel.app` (sem https:// e sem caminho).
3. Confirme em Authentication > Sign-in method que E-mail/senha está habilitado.

## Se a conta for criada mas o perfil não for salvo
Confira se as regras publicadas do Firestore correspondem ao arquivo `firestore.rules`.
A senha é armazenada pelo Firebase Authentication, nunca no documento Firestore.

## Segurança
A configuração Web do Firebase é destinada ao cliente. Não publique arquivos de conta de serviço, chaves privadas ou credenciais administrativas.
