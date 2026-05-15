import { AudioSessionTypes, getAudioSession } from './utils';

export async function main() {
  const audioSession = getAudioSession();
  if (!audioSession) {
    throw new Error("Audio Session API not supported in this environment.");
  }

  audioSession.addEventListener("statechange", () => {
    console.log(`Audio Session Type: ${audioSession.type}`);
    const status = document.getElementById("status");
    if (status) {
      status.textContent = `Audio Session Type: ${audioSession.type}`;
    }
  });

  for (const type of Object.values(AudioSessionTypes)) {
    const button = document.createElement("button");
    button.textContent = `${type}`;
    button.addEventListener("click", () => {
      const event = new CustomEvent("audio-session-type-change", {
        detail: { type }
      });
      window.dispatchEvent(event);
    });
    document.body.appendChild(button);
  }
}

main()
