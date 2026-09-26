// High-quality Web Audio API Synthesizer for romantic sound effects & soundtrack

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private musicPlaying: boolean = false;
  private musicInterval: any = null;
  private vinylNode: AudioNode | null = null;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.musicPlaying) {
      this.stopMusic();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Soft romantic chime when discovering a flower
  public playFlowerChime() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Sparkling notes: E5, G#5, B5, E6
      const freqs = [659.25, 830.61, 987.77, 1318.51];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.3);
      });
    } catch (e) {
      // Audio fallback
    }
  }

  // Soft paper rustle when opening an envelope or unfolding a note
  public playPaperRustle() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(2.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
    } catch (e) {}
  }

  // Warm gentle heartbeat pulse
  public playHeartbeat() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      [0, 0.22].forEach((offset) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(65, now + offset);
        osc.frequency.exponentialRampToValueAtTime(35, now + offset + 0.14);

        gain.gain.setValueAtTime(0, now + offset);
        gain.gain.linearRampToValueAtTime(0.12, now + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.16);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + offset);
        osc.stop(now + offset + 0.18);
      });
    } catch (e) {}
  }

  // Soft breeze sound effect
  public playBreeze() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 1.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.linearRampToValueAtTime(800, now + 0.6);
      filter.frequency.linearRampToValueAtTime(200, now + 1.5);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
    } catch (e) {}
  }

  // Generative Romantic Ambient Soundtrack:
  // Plays warm lofi Rhodes/piano chords in D Major (Dmaj7 -> Bm7 -> Gmaj7 -> A7)
  public startMusic(onBeat?: (bar: number) => void) {
    if (this.musicPlaying) return;
    this.initCtx();
    this.musicPlaying = true;

    // Chords progression frequencies
    const chordProgressions = [
      // Dmaj7 (D3, F#3, A3, C#4)
      [146.83, 185.00, 220.00, 277.18, 369.99],
      // Bm7 (B2, D3, F#3, A3)
      [123.47, 146.83, 185.00, 220.00, 293.66],
      // Gmaj7 (G2, B2, D3, F#3)
      [98.00, 123.47, 146.83, 185.00, 246.94],
      // A7sus4 / Asus4 -> A (A2, E3, G3, D4)
      [110.00, 164.81, 196.00, 293.66, 329.63],
    ];

    let chordIdx = 0;

    const playChord = () => {
      if (!this.musicPlaying || this.isMuted || !this.ctx) return;
      const now = this.ctx.currentTime;
      const chord = chordProgressions[chordIdx];

      chord.forEach((freq, noteIdx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        // Warm electric piano tone
        osc.type = noteIdx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + noteIdx * 0.05);

        gain.gain.setValueAtTime(0, now + noteIdx * 0.05);
        gain.gain.linearRampToValueAtTime(0.04 / (noteIdx + 1), now + noteIdx * 0.05 + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + noteIdx * 0.05 + 3.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + noteIdx * 0.05);
        osc.stop(now + noteIdx * 0.05 + 3.4);
      });

      if (onBeat) onBeat(chordIdx);
      chordIdx = (chordIdx + 1) % chordProgressions.length;
    };

    playChord();
    this.musicInterval = setInterval(playChord, 3500);
  }

  public stopMusic() {
    this.musicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public isMusicActive(): boolean {
    return this.musicPlaying;
  }
}

export const sounds = new SoundManager();
