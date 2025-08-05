browser.trial.ml.onProgress.addListener(progressData => {
    console.log("ML progress:", progressData);
  });
  
  // 2. Création du moteur Q&A
  async function initQAEngine() {
    await browser.trial.ml.createEngine({
      taskName: "translation",
      modelHub: "huggingface"
    });
  }
  
  // 3. Fonction qui interroge le moteur avec un contexte et une question
  async function answerQuestion(sentenceText) {
    const response = await browser.trial.ml.runEngine({
      args: [
        sentenceText, {
          tgt_lang: 'en', // English
        }
      ]
    });
    // response est un tableau, chaque élément contient answer, score, start, end
    const result = response[0]["translation_text"];
    return result;
  }
  
  // Exemple d’usage
  (async () => {
    await initQAEngine();

    const sentence = "Quelle taille en longueur fait le mont blanc ?";
    const res = await answerQuestion(sentence);
    console.log(`Réponse: ${res}`);
  })();