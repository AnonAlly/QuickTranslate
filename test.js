browser.trial.ml.onProgress.addListener(progressData => {
    console.log("ML progress:", progressData);
  });
  
  // 2. Création du moteur Q&A
  async function initQAEngine() {
    await browser.trial.ml.createEngine({
      taskName: "question-answering:",
      modelHub: "huggingface"
    });
  }
  
  // 3. Fonction qui interroge le moteur avec un contexte et une question
  async function answerQuestion(questionText, contextText) {
    const response = await browser.trial.ml.runEngine({
      args: [questionText, contextText]
    });
    // response est un tableau, chaque élément contient answer, score, start, end
    const result = response[0]["generated_text"];
    return result;
  }
  
  // Exemple d’usage
  (async () => {
    await initQAEngine();
    const context = "Le mont blanc fait 1000km de long et 20 de large.";
    const question = "Quelle taille en longueur fait le mont blanc ?";
    const res = await answerQuestion(question, context);
    console.log(`Réponse: ${res}`);
  })();