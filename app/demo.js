/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START speech_quickstart]
// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');

// [START translate_quickstart]
// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'your-project-id';

// Creates a client
const client = new speech.SpeechClient({
  projectId: projectId,
});

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});

// The name of the audio file to transcribe
const fileName = './resources/stupid.wav';

// Reads a local audio file and converts it to base64
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');

// The audio file's encoding, sample rate in hertz, and BCP-47 language code
const audio = {
  content: audioBytes,
};
const config = {
  encoding: 'LINEAR16',
  sampleRateHertz: 16000,
  languageCode: 'fr-FR',
};
const request = {
  audio: audio,
  config: config,
};

let stupidvar

// The target language
const target = 'en';

// Detects speech in the audio file
client
  .recognize(request)
  .then(data => {
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);

    stupidvar = response.results;
    
    translate
      .translate(stupidvar, target)
      .then(results => {
        const translation = results[0];

        console.log(stupidvar);
        console.log(`Text: ${stupidvar}`);
        console.log(`Translation: ${translation}`);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

// translate
//   .translate(stupidvar, target)
//   .then(results => {
//     const translation = results[0];

//     console.log(stupidvar);
//     console.log(`Text: ${stupidvar}`);
//     console.log(`Translation: ${translation}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });
// [END speech_quickstart]
