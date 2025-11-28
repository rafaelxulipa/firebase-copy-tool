import admin from "firebase-admin";
import fs from "fs";

// Inicializar Firebase Admin
const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json"));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/**
 * COPIAR COLLECTION
 */
async function copyCollection(source, target) {
    console.log(`📁 Copiando documentos de "${source}" para "${target}"...`);

    const snapshot = await db.collection(source).get();

    if (snapshot.empty) {
        console.log("⚠ Nenhum documento encontrado.");
        return;
    }

    const batch = db.batch();

    snapshot.forEach((doc) => {
        const newRef = db.collection(target).doc(doc.id);
        batch.set(newRef, doc.data());
    });

    await batch.commit();
    console.log("✅ Cópia concluída!");
}

/**
 * DELETAR DOCUMENTOS PRESERVANDO ALGUNS IDs
 */
async function deleteExcept(collectionName, preserveIds = []) {
    console.log(
        `🧹 Limpando "${collectionName}" mas preservando IDs: ${preserveIds.join(", ")}`
    );

    const snapshot = await db.collection(collectionName).get();

    const batch = db.batch();
    let deleteCount = 0;

    snapshot.forEach((doc) => {
        if (!preserveIds.includes(doc.id)) {
            batch.delete(doc.ref);
            deleteCount++;
        }
    });

    await batch.commit();

    console.log(`✅ Exclusão concluída. ${deleteCount} documentos deletados.`);
}


/**
 * COPIAR APENAS DOCUMENTOS COM IDS ESPECÍFICOS
 */
async function copyOnlyIds(source, target, ids = []) {
    console.log(`📂 Copiando somente IDs específicos de "${source}" para "${target}"...`);

    if (!ids.length) {
        console.log("⚠ Nenhum ID fornecido.");
        return;
    }

    const batch = db.batch();
    let copied = 0;

    for (const id of ids) {
        const docRef = db.collection(source).doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            console.log(`⚠ Documento não encontrado: ${id}`);
            continue;
        }

        const newRef = db.collection(target).doc(id);
        batch.set(newRef, doc.data());
        copied++;
    }

    await batch.commit();

    console.log(`✅ Cópia concluída! ${copied} documentos copiados.`);
}


/**
 * EXECUÇÃO EXEMPLO
 */
async function run() {
    const idsToCopy = ["2836GkeDAZPMpQG9yf3CI1ycZHb2", "5QG8LWpGBkVtnwhu6X8UTfcaHv72", "cLVWHESNxdgJ5eQkhmWaLdAKsTm2", "Ed1DEg4OiZYEKhGrsEfKFT7pacL2", "l6qp9QYZFWcgTjeMNVxNK5L97Tt2", "l6qp9QYZFWcgTjeMNVxNK5L97Tt2", "3GbwiBh9i0Su7s9EeZCcAx4Q4Pw1", "f6ODjyJTcCgZIXO5lnF32gtO7Gf2"];
    // 1) Copiar collection
    await copyCollection("users", "users2025");

    // 2) Deletar preservando alguns IDs
    //   await deleteExcept("minhaCollectionCopia", idsToCopy);

    // 3) Copiar apenas documentos com IDs específicos
    //   await copyOnlyIds("users", "users2026", idsToCopy);
}

run().catch(console.error);
