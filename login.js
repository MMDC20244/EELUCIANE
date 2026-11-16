import { auth, db } from "./firebase-init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagemAuth");
const botaoEntrar = document.getElementById("botaoEntrar");
const botaoCadastro = document.getElementById("botaoCadastro");

function mostrarMensagem(texto, erro = false) {
  if (!mensagem) return;
  mensagem.textContent = texto;
  mensagem.style.color = erro ? "#ff7777" : "#7ee2a8";
}

function alternarFormulario(tipo) {
  const mostrarLogin = tipo === "login";
  formLogin.style.display = mostrarLogin ? "block" : "none";
  formCadastro.style.display = mostrarLogin ? "none" : "block";
  botaoEntrar?.classList.toggle("opcaoAtiva", mostrarLogin);
  botaoCadastro?.classList.toggle("opcaoAtiva", !mostrarLogin);
  mostrarMensagem("");
}

botaoEntrar?.addEventListener("click", () => alternarFormulario("login"));
botaoCadastro?.addEventListener("click", () => alternarFormulario("cadastro"));

onAuthStateChanged(auth, (user) => {
  if (user) window.location.replace("catalogo.html");
});

formLogin?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("loginEmail")?.value.trim();
  const senha = document.getElementById("loginSenha")?.value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.replace("catalogo.html");
  } catch (error) {
    mostrarMensagem(mensagemFirebase(error), true);
    console.error("Erro no login:", error);
  }
});

formCadastro?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const nome = document.getElementById("cadNome")?.value.trim();
  const genero = document.getElementById("cadGenero")?.value;
  const nascimento = document.getElementById("cadNascimento")?.value;
  const email = document.getElementById("cadEmail")?.value.trim();
  const senha = document.getElementById("cadSenha")?.value;
  const confirma = document.getElementById("cadConfirmaSenha")?.value;

  if (!nome || !genero || !nascimento || !email || !senha || !confirma) {
    mostrarMensagem("Preencha todos os campos do cadastro.", true);
    return;
  }
  if (senha !== confirma) {
    mostrarMensagem("As senhas não coincidem.", true);
    return;
  }
  if (senha.length < 6) {
    mostrarMensagem("A senha precisa ter pelo menos 6 caracteres.", true);
    return;
  }

  const submit = formCadastro.querySelector('button[type="submit"]');
  if (submit) {
    submit.disabled = true;
    submit.textContent = "Criando conta...";
  }
  mostrarMensagem("Criando sua conta...");

  let credencial;
  try {
    credencial = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(credencial.user, { displayName: nome });

    try {
      await setDoc(doc(db, "usuarios", credencial.user.uid), {
        uid: credencial.user.uid,
        nome,
        email,
        genero,
        dataNascimento: nascimento,
        status: "ativo",
        criadoEm: serverTimestamp()
      });
    } catch (firestoreError) {
      console.error("Conta criada, mas houve erro ao salvar perfil:", firestoreError);
      mostrarMensagem(
        "Sua conta foi criada, mas o perfil não foi salvo no Firestore. Confira as regras da coleção usuarios. Você já pode entrar com seu e-mail e senha.",
        true
      );
      return;
    }

    mostrarMensagem("Cadastro concluído! Entrando no catálogo...");
    window.location.replace("catalogo.html");
  } catch (error) {
    mostrarMensagem(mensagemFirebase(error), true);
    console.error("Erro no cadastro:", error);
  } finally {
    if (submit && document.body.contains(submit)) {
      submit.disabled = false;
      submit.textContent = "Criar conta";
    }
  }
});

function mensagemFirebase(error) {
  const code = error?.code || "";
  const mensagens = {
    "auth/email-already-in-use": "Este e-mail já está cadastrado. Use a opção Entrar.",
    "auth/invalid-email": "Digite um endereço de e-mail válido.",
    "auth/weak-password": "A senha precisa ter pelo menos 6 caracteres.",
    "auth/invalid-credential": "E-mail ou senha incorretos.",
    "auth/user-disabled": "Esta conta foi desativada.",
    "auth/too-many-requests": "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
    "auth/operation-not-allowed": "O acesso por e-mail/senha não está habilitado no Firebase Authentication.",
    "auth/unauthorized-domain": "Este domínio do Vercel não está autorizado no Firebase Authentication.",
    "auth/network-request-failed": "Falha de conexão. Verifique sua internet e tente novamente.",
    "permission-denied": "O Firebase Authentication criou a conta, mas o Firestore recusou salvar o perfil. Confira as regras de usuarios."
  };
  return mensagens[code] || `Não foi possível concluir (${code || "erro desconhecido"}). Abra o Console do navegador (F12) para ver o detalhe.`;
}
