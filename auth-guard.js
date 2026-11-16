import { auth } from "./firebase-init.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

document.documentElement.style.visibility = "hidden";
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.replace("login.html");
    return;
  }
  document.documentElement.style.visibility = "visible";
  window.usuarioLogado = user;
  document.dispatchEvent(new CustomEvent("dembe:autenticado", { detail: { user } }));
});

window.sairDaConta = async () => {
  await signOut(auth);
  window.location.replace("login.html");
};
