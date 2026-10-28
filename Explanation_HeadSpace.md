# Explicação do Motor de Áudio "HeadSpace 8D"

## Explanation of the "HeadSpace 8D" Audio Engine

Este arquivo explica como funciona a arquitetura principal do HeadSpace 8D. Ao contrário de um script simples, uma extensão de áudio moderna do Chrome precisa usar documentos ocultos e APIs avançadas para garantir que o áudio não pare quando você fecha o popup.

This file explains how the core architecture of HeadSpace 8D works. Unlike a simple script, a modern Chrome audio extension needs to use hidden documents and advanced APIs to ensure the audio doesn't stop when you close the popup.

O código-fonte principal de processamento está em `offscreen.js` e a gerência de abas em `background.js`.
The main processing source code is in `offscreen.js` and the tab management is in `background.js`.

## Como funciona | How it works

1. **A Captura da Aba (Tab Capture) / The Tab Capture**
   Quando você clica em "Ligar" no popup, o arquivo `background.js` utiliza a API `chrome.tabCapture` para pegar a "stream" (fluxo) de áudio da aba que você está escutando.
   When you click "Turn on" in the popup, the `background.js` file uses the `chrome.tabCapture` API to get the audio "stream" from the tab you are currently listening to.

2. **O Documento Offscreen / The Offscreen Document**
   O Chrome manifest V3 não permite processar áudio pesado diretamente no background (Service Worker). Por isso, criamos uma página HTML invisível (`offscreen.html`) que roda o tempo todo em segundo plano, executando a verdadeira engine de áudio (`offscreen.js`).
   Chrome manifest V3 doesn't allow heavy audio processing directly in the background (Service Worker). Therefore, we create an invisible HTML page (`offscreen.html`) that runs in the background all the time, executing the real audio engine (`offscreen.js`).

3. **Web Audio API / Web Audio API**
   Dentro do documento offscreen, o áudio bruto da aba é conectado a um `AudioContext`. A partir daí, o som é roteado (passado) por vários "nós" (nodes):

   * **Filtros Biquad:** Alteram graves, agudos, simulam rádio, etc.

   * **Convolver:** Aplica reverberação realista de salas ou catedrais.

   * **PannerNode (HRTF):** Posiciona o som em 3D ao redor da sua cabeça.
     Inside the offscreen document, the raw tab audio is connected to an `AudioContext`. From there, the sound is routed through various "nodes":

   * **Biquad Filters:** Alter bass, treble, simulate radio, etc.

   * **Convolver:** Applies realistic room or cathedral reverberation.

   * **PannerNode (HRTF):** Positions the sound in 3D around your head.

4. **Gravação Integrada / Built-in Recording**
   O final da cadeia de áudio é enviado de volta para a sua caixa de som, mas também é copiado para um `MediaStreamDestination`. Isso permite usar um `MediaRecorder` para gravar exatamente o que você está ouvindo e salvar o arquivo no seu PC.
   The end of the audio chain is routed back to your speakers, but it is also copied to a `MediaStreamDestination`. This allows using a `MediaRecorder` to record exactly what you are hearing and save the file to your PC.

## Exemplo de Código Comentado | Commented Code Example

Abaixo está uma versão simplificada de como construímos a cadeia de áudio espacial dentro do `offscreen.js`:
Below is a simplified version of how we build the spatial audio chain inside `offscreen.js`:

```javascript
// Cria o contexto de áudio (o "cérebro" do processamento)
// Creates the audio context (the "brain" of the processing)
const audioCtx = new AudioContext();

function construirGrafoDeAudio(streamDaAba) {
    // 1. Pega o áudio bruto vindo da aba do Chrome
    // 1. Takes the raw audio coming from the Chrome tab
    const sourceNode = audioCtx.createMediaStreamSource(streamDaAba);
    
    // 2. Cria um filtro para aumentar os graves (Bass Boost)
    // 2. Creates a filter to increase the bass (Bass Boost)
    const bassFilter = audioCtx.createBiquadFilter();
    bassFilter.type = 'lowshelf';
    bassFilter.frequency.value = 140; // Frequência alvo / Target frequency
    bassFilter.gain.value = 5; // Adiciona 5dB de ganho / Adds 5dB of gain
    
    // 3. Cria o "Panner" que faz a mágica do 8D (Áudio 3D HRTF)
    // 3. Creates the "Panner" that does the 8D magic (3D HRTF Audio)
    const panner3D = new PannerNode(audioCtx, {
        panningModel: 'HRTF',      // Imersão realista com fones / Realistic headphone immersion
        distanceModel: 'linear',
        positionX: 0,              // Esquerda/Direita / Left/Right
        positionY: 0,              // Cima/Baixo / Up/Down
        positionZ: -1              // Frente/Trás / Front/Back
    });
    
    // 4. Conecta os cabos virtuais: Aba -> Graves -> Panner 3D -> Saída Final
    // 4. Connects the virtual cables: Tab -> Bass -> 3D Panner -> Final Output
    sourceNode.connect(bassFilter);
    bassFilter.connect(panner3D);
    panner3D.connect(audioCtx.destination);
    
    // Inicia um loop que atualiza a posição do Panner a cada frame, gerando o movimento circular
    // Starts a loop that updates the Panner position every frame, generating the circular motion
    setInterval(() => movimentarAudioEmCirculo(panner3D), 33);
}

function movimentarAudioEmCirculo(pannerNode) {
    // Usa matemática de seno/cosseno para mover o áudio em órbita ao redor da cabeça
    // Uses sine/cosine math to move the audio in orbit around the head
    const tempo = performance.now() / 1000;
    const raio = 1.5;
    
    // Altera a posição X (lados) e Z (frente/trás) dinamicamente
    // Changes the X (sides) and Z (front/back) position dynamically
    pannerNode.positionX.value = Math.sin(tempo) * raio;
    pannerNode.positionZ.value = -Math.cos(tempo) * raio;
}
```
