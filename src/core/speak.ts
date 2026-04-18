import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { getPlatform, getConfigDir } from '../utils/platform';


export function getSoundPath(key: string): string {
  return path.join(getConfigDir(), 'sounds', `${key}.mp3`);
}

export function speak(text: string, cacheKey?: string): void {
  if (cacheKey) {
    const localPack = path.join(process.cwd(), '.git-hype-sounds', `${cacheKey}.mp3`);
    if (fs.existsSync(localPack)) {
      playFile(localPack);
      return;
    }

    const cached = getSoundPath(cacheKey);
    if (fs.existsSync(cached)) {
      playFile(cached);
      return;
    }
  }

  speakOS(text);
}


function playFile(filePath: string): void {
  const platform = getPlatform();

  // ffplay handles any format on all platforms — preferred if ffmpeg is installed
  const ffplay = spawnSync(
    'ffplay', ['-nodisp', '-autoexit', '-loglevel', 'quiet', filePath],
    { stdio: 'ignore' }
  );
  if (ffplay.status === 0) return;

  if (platform === 'macos') {
    spawnSync('afplay', [filePath], { stdio: 'ignore' });
    return;
  }

  if (platform === 'windows') {
    const escaped = filePath.replace(/\\/g, '\\\\');
    const ps = [
      'Add-Type -AssemblyName presentationCore',
      `$p = [System.Windows.Media.MediaPlayer]::new()`,
      `$p.Open([uri]'file:///${escaped}')`,
      `$p.Play()`,
      `$t = 0`,
      `while (-not $p.NaturalDuration.HasTimeSpan -and $t -lt 20) { Start-Sleep -Milliseconds 100; $t++ }`,
      `if ($p.NaturalDuration.HasTimeSpan) { Start-Sleep -Milliseconds ($p.NaturalDuration.TimeSpan.TotalMilliseconds + 100) } else { Start-Sleep 3 }`,
      `$p.Close()`,
    ].join('; ');
    spawnSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', ps], { stdio: 'ignore' });
    return;
  }

  for (const { cmd, args } of [
    { cmd: 'mpg123', args: ['-q', filePath] },
    { cmd: 'mpg321', args: ['-q', filePath] },
    { cmd: 'vlc',    args: ['--intf', 'dummy', '--play-and-exit', filePath] },
  ]) {
    const r = spawnSync(cmd, args, { stdio: 'ignore' });
    if (r.status === 0) return;
  }
}

function speakOS(text: string): void {
  const platform = getPlatform();
  try {
    if (platform === 'macos') {
      spawnSync('say', ['-r', '175', text], { stdio: 'ignore' });
      return;
    }

    if (platform === 'windows') {
      const escaped = text.replace(/'/g, "''");
      const ps = `Add-Type -AssemblyName System.Speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).Speak('${escaped}')`;
      spawnSync('powershell', ['-NoProfile', '-NonInteractive', '-Command', ps], { stdio: 'ignore' });
      return;
    }

    for (const { cmd, args } of [
      { cmd: 'espeak', args: [text] },
      { cmd: 'spd-say', args: [text] },
    ]) {
      const r = spawnSync(cmd, args, { stdio: 'ignore' });
      if (r.status === 0) return;
    }
  } catch { /* never crash git over a voice line */ }
}