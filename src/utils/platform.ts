import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export function getConfigDir(): string {
  const dir = path.join(os.homedir(), '.git-hype');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function getProjectConfigPath(root?: string): string {
  return path.join(root || process.cwd(), '.githyperc.json');
}

export function getGlobalConfigPath(): string {
  return path.join(getConfigDir(), 'config.json');
}

export function getPlatform(): 'macos' | 'windows' | 'linux' {
  const p = os.platform();
  if (p === 'darwin') return 'macos';
  if (p === 'win32') return 'windows';
  return 'linux';
}