import { AudioSessionTypes, getAudioSession, getAudioSessionType, setAudioSessionType } from './utils';

function updateStatus() {
  const status = document.getElementById("status");
  if (!status) {
    throw new Error("Status element not found");
  }
  const type = getAudioSessionType();
  console.log(`Audio Session Type: ${type}`);
  status.textContent = `Audio Session Type: ${type}`;
}

export async function main() {
  // updateStatus();
  // setAudioSessionType("playback");
  // updateStatus();
  // setAudioSessionType("ambient");

  const audioSession = getAudioSession();
  if (!audioSession) {
    throw new Error("Audio Session API not supported in this environment.");
  }

  setInterval(() => {
    const type = getAudioSessionType();
    console.log(`Interval Check - Audio Session Type: ${type}`);
  }, 1000)

  function update() {
    console.log(`STATECHANGE Audio Session Type: ${audioSession.type}`);
    const status = document.getElementById("status");
    if (status) {
      status.textContent = `Audio Session Type: ${audioSession.type}`;
    }
  }
  audioSession.addEventListener("statechange", update)

  for (const type of Object.values(AudioSessionTypes)) {
    const button = document.createElement("button");
    button.textContent = `${type}`;
    button.addEventListener("click", () => {
      console.log(`Button Clicked: ${type}`);
      const event = new CustomEvent("audio-session-type-change", {
        detail: { type }
      });
      window.dispatchEvent(event);
    });
    document.body.appendChild(button);
    setAudioSessionType(type);
  }

}

main()
