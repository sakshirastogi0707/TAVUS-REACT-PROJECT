const getTranscriptSentence = (words) => {
    let wordsCombined = "";
    words.forEach(({ punctuatedWord }) => {
      wordsCombined += ` ${punctuatedWord}`;
    });
    return wordsCombined;
  };

export default getTranscriptSentence