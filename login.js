import { auth, db } from "./firebase-init.js";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  updateProfile, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagemAuth");
const mostrarMensagem = (texto, erro=false) => {
  mensagem.textContent = texto;
  mensagem.style.color = erro ? "#ff7777" : "#7ee2a8";
};

document.getElementById("botaoEntrar")?.addEventListener("click", () => {
  formLogin.style.display = "block";
  formCadastro.style.display = "none";
});
document.getElementById("botaoCadastro")?.addEventListener("click", () => {
  formLogin.style.display = "none";
  formCadastro.style.display = "block";
});

// Se já estiver autenticado, não precisa voltar à tela de login.
onAuthStateChanged(auth, user => {
  if (user) window.location.replace("catalogo.html");
});

formLogin.addEventListener("submit", async event => {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const senha = document.getElementById("loginSenha").value;
  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.replace("catalogo.html");
  } catch (error) {
    mostrarMensagem(mensagemFirebase(error.code), true);
  }
});

formCadastro.addEventListener("submit", async event => {
  event.preventDefault();
  const nome = document.getElementById("cadNome").value.trim();
  const genero = document.getElementById("cadGenero").value;
  const nascimento = document.getElementById("cadNascimento").value;
  const email = document.getElementById("cadEmail").value.trim();
  const senha = document.getElementById("cadSenha").value;
  const confirma = document.getElementById("cadConfirmaSenha").value;
  if (senha !== confirma) return mostrarMensagem("As senhas não coincidem.", true);
  if (senha.length < 6) return mostrarMensagem("A senha precisa ter pelo menos 6 caracteres.", true);
  try {
    const credencial = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(credencial.user, { displayName: nome });
    await setDoc(doc(db, "usuarios", credencial.user.uid), {
      uid: credencial.user.uid, nome, email, genero,
      dataNascimento: nascimento,
      status: "ativo",
      criadoEm: serverTimestamp()
    });
    window.location.replace("catalogo.html");
  } catch (error) {
    mostrarMensagem(mensagemFirebase(error.code), true);
  }
});

function mensagemFirebase(code) {
  const mensagens = {
    "auth/email-already-in-use": "Este e-mail já possui cadastro. Faça login.",
    "auth/invalid-email": "Digite um e-mail válido.",
    "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
    "auth/invalid-credential": "E-mail ou senha incorretos.",
    "auth/user-disabled": "Esta conta foi desativada.",
    "auth/too-many-requests": "Muitas tentativas. Aguarde e tente novamente.",
    "permission-denied": "Não foi possível salvar o perfil. Verifique as regras do Firestore."
  };
  return mensagens[code] || "Não foi possível concluir. Confira a configuração do Firebase e tente novamente.";
}
