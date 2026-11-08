import { spawn } from 'node:child_process';
import { join } from 'node:path';

const command = String.raw`
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$inputText = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String([Console]::In.ReadToEnd()))
$speaker = New-Object System.Speech.Synthesis.SpeechSynthesizer
$wave = New-Object System.IO.MemoryStream
try {
  $speaker.SetOutputToWaveStream($wave)
  $speaker.Speak($inputText)
  $speaker.SetOutputToNull()
  $data = $wave.ToArray()
  [Console]::OpenStandardOutput().Write($data, 0, $data.Length)
} finally {
  $speaker.Dispose()
  $wave.Dispose()
}
`;

export function renderSpeech(value: string, signal: AbortSignal): Promise<string> {
  if (process.platform !== 'win32' || !process.env.SystemRoot) return Promise.reject(Error('Windows speech is unavailable.'));
  return new Promise((resolve, reject) => {
    const executable = join(process.env.SystemRoot!, 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');
    const child = spawn(executable, ['-NoProfile', '-NonInteractive', '-Command', command], {
      windowsHide: true, stdio: ['pipe', 'pipe', 'ignore'],
      signal: AbortSignal.any([signal, AbortSignal.timeout(15000)]),
    });
    const buffers: Buffer[] = [];
    let bytes = 0;
    child.stdout.on('data', (chunk: Buffer) => {
      bytes += chunk.length;
      if (bytes > 8 * 1024 * 1024) child.kill();
      else buffers.push(chunk);
    });
    child.once('error', () => reject(Error('Windows speech could not start or was stopped.')));
    child.once('close', code => {
      const audio = Buffer.concat(buffers);
      if (code !== 0 || audio.length <= 44 || audio.toString('ascii', 0, 4) !== 'RIFF' || audio.toString('ascii', 8, 12) !== 'WAVE') {
        reject(Error('Windows could not produce offline speech.'));
      } else resolve(audio.toString('base64'));
    });
    child.stdin.on('error', () => {});
    child.stdin.end(Buffer.from(value, 'utf8').toString('base64'));
  });
}
