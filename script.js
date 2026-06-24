const campoSenha = document.getElementById('campo-senha');
const btnDiminuir = document.getElementById('btn-diminuir');
const btnAumentar = document.getElementById('btn-aumentar');
const numeroCaracteres = document.getElementById('numero-caracteres');
const checkMaiusculas = document.getElementById('maiusculas');
const checkMinusculas = document.getElementById('minusculas');
const checkNumeros = document.getElementById('numeros');
const checkSimbolos = document.getElementById('simbolos');
const forcaNivel = document.getElementById('forca-nivel');
const btnGerar = document.getElementById('btn-gerar');
const btnCopiar = document.getElementById('btn-copiar');

const MAIUSCULAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const MINUSCULAS = 'abcdefghijklmnopqrstuvwxyz';
const NUMEROS = '0123456789';
const SIMBOLOS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

let tamanhoSenha = 12;

function atualizarNumeroCaracteres() {
    numeroCaracteres.textContent = tamanhoSenha;
}

function diminuirCaracteres() {
    if (tamanhoSenha > 4) {
        tamanhoSenha--;
        atualizarNumeroCaracteres();
        gerarSenha();
    }
}

function aumentarCaracteres() {
    if (tamanhoSenha < 32) {
        tamanhoSenha++;
        atualizarNumeroCaracteres();
        gerarSenha();
    }
}

function gerarSenha() {
    let caracteres = '';
    let senha = '';

    if (checkMaiusculas.checked) caracteres += MAIUSCULAS;
    if (checkMinusculas.checked) caracteres += MINUSCULAS;
    if (checkNumeros.checked) caracteres += NUMEROS;
    if (checkSimbolos.checked) caracteres += SIMBOLOS;

    if (caracteres === '') {
        caracteres = MINUSCULAS;
        checkMinusculas.checked = true;
    }

    for (let i = 0; i < tamanhoSenha; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[indiceAleatorio];
    }

    campoSenha.value = senha;

    atualizarForcaSenha();
}

function atualizarForcaSenha() {
    let pontos = 0;

    if (tamanhoSenha >= 8) pontos++;
    if (tamanhoSenha >= 12) pontos++;
    if (tamanhoSenha >= 16) pontos++;

    let tiposUsados = 0;
    if (checkMaiusculas.checked) tiposUsados++;
    if (checkMinusculas.checked) tiposUsados++;
    if (checkNumeros.checked) tiposUsados++;
    if (checkSimbolos.checked) tiposUsados++;

    pontos += tiposUsados;

    forcaNivel.classList.remove('fraca', 'media', 'forte');

    if (pontos <= 3) {
        forcaNivel.classList.add('fraca');
    } else if (pontos <= 5) {
        forcaNivel.classList.add('media');
    } else {
        forcaNivel.classList.add('forte');
    }
}

function copiarSenha() {
    if (campoSenha.value) {
        navigator.clipboard.writeText(campoSenha.value).then(() => {
            const textoOriginal = btnCopiar.innerHTML;
            btnCopiar.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            btnCopiar.style.color = '#00C851';
            
            setTimeout(() => {
                btnCopiar.innerHTML = textoOriginal;
                btnCopiar.style.color = '';
            }, 2000);
        });
    }
}

btnDiminuir.addEventListener('click', diminuirCaracteres);
btnAumentar.addEventListener('click', aumentarCaracteres);
btnGerar.addEventListener('click', gerarSenha);
btnCopiar.addEventListener('click', copiarSenha);

checkMaiusculas.addEventListener('change', gerarSenha);
checkMinusculas.addEventListener('change', gerarSenha);
checkNumeros.addEventListener('change', gerarSenha);
checkSimbolos.addEventListener('change', gerarSenha);

gerarSenha();
