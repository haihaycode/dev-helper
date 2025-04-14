interface License {
  name: string;
  url: string;
}

interface Phonetic {
  text?: string;
  audio: string;
  sourceUrl?: string;
  license?: License;
}

interface Definition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
  example?: string;
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
  antonyms: string[];
}

interface DictionaryEntry {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
  license: License;
  sourceUrls: string[];
}

export type DictionaryResponse = DictionaryEntry[];
export type IDictionaryEntry = DictionaryEntry;
