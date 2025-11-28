# 📦 Firebase Firestore Copy Tool

Uma ferramenta simples em **Node.js** para gerenciar collections do
**Firestore**, permitindo:

✅ Copiar **toda uma collection** para outra\
✅ Copiar **apenas documentos com IDs específicos**\
✅ Deletar documentos preservando apenas IDs informados\
✅ Automatizar tarefas administrativas do Firestore

------------------------------------------------------------------------

## 🚀 Tecnologias utilizadas

-   **Node.js**
-   **Firebase Admin SDK**
-   **Firestore (Firebase)**
-   **ES Modules**

------------------------------------------------------------------------

## 📁 Estrutura do projeto

    firebase-copy-tool/
      ├── index.js
      ├── package.json
      ├── .gitignore
      └── serviceAccountKey.json   (IGNORADO pelo Git)

------------------------------------------------------------------------

## 🔧 Instalação

### 1. Clone o repositório

``` sh
git clone https://github.com/rafaelxulipa/firebase-copy-tool.git
cd firebase-copy-tool
touch serviceAccountKey.json
```

### 2. Instale as dependências

``` sh
npm install
```

### 3. Adicione sua chave Firebase

No painel Firebase:

**Configurações do Projeto → Contas de Serviço → Gerar nova chave
privada**

Salve como:

    serviceAccountKey.json

> ⚠️ O arquivo está protegido pelo `.gitignore`.

------------------------------------------------------------------------

## 🧩 Funções inclusas

### 1️⃣ Copiar uma collection inteira

``` js
await copyCollection("users", "users2025");
```

------------------------------------------------------------------------

### 2️⃣ Copiar apenas documentos com IDs específicos

``` js
await copyOnlyIds("users", "users2026", ["id1", "id2"]);
```

------------------------------------------------------------------------

### 3️⃣ Deletar documentos preservando IDs informados

``` js
await deleteExcept("users2025", ["idImportante1", "idImportante2"]);
```

------------------------------------------------------------------------

## ▶️ Executando

``` sh
node index.js
```

------------------------------------------------------------------------

## 🛠 Exemplo real de execução

``` js
async function run() {
    const idsToCopy = [
      "2836GkeDAZPMpQG9yf3CI1ycZHb2",
      "5QG8LWpGBkVtnwhu6X8UTfcaHv72",
      "cLVWHESNxdgJ5eQkhmWaLdAKsTm2",
      "Ed1DEg4OiZYEKhGrsEfKFT7pacL2",
      "l6qp9QYZFWcgTjeMNVxNK5L97Tt2",
      "3GbwiBh9i0Su7s9EeZCcAx4Q4Pw1",
      "f6ODjyJTcCgZIXO5lnF32gtO7Gf2"
    ];

    // 1) Copiar collection inteira
    await copyCollection("users", "users2025");

    // 2) Deletar preservando IDs (opcional)
    // await deleteExcept("users2025", idsToCopy);

    // 3) Copiar apenas IDs específicos (opcional)
    // await copyOnlyIds("users", "users2026", idsToCopy);
}
```

------------------------------------------------------------------------

## 🛡 .gitignore recomendado

``` gitignore
node_modules/
.env
serviceAccountKey.json
*.credentials.json
*.key.json
*.private.json
.DS_Store
dist/
build/
```

------------------------------------------------------------------------

## 📄 Licença

MIT --- livre para uso e modificação.

------------------------------------------------------------------------

## ✨ Melhorias futuras

-   CLI interativo (Inquirer.js)
-   Paginação para collections grandes
-   Backup automático antes de deletar
-   Logs estruturados (Winston)