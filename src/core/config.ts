import * as fs from 'fs';
import { getGlobalConfigPath, getProjectConfigPath } from '../utils/platform';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EventConfig {
  enabled: boolean;
  tag: string;
  rareDropChance: number;
  rareDropTag: string;
}

export interface GitHypeConfig {
  version: string;
  enabled: boolean;
  events: {
    push:   EventConfig;
    merge:  EventConfig;
    commit: EventConfig;
  };
  stats: {
    totalPushes: number;
    totalMerges: number;
    totalCommits: number;
    rareDropsTriggered: number;
    lastEvent: string | null;
  };
}

export function defaultConfig(): GitHypeConfig {
  return {
    version: '1.0.0',
    enabled: true,
    events: {
      push:   { enabled: true,  tag: '',                  rareDropChance: 10, rareDropTag: 'another_one' },
      merge:  { enabled: true,  tag: '',                  rareDropChance: 20, rareDropTag: 'another_one' },
      commit: { enabled: false, tag: 'working_on_coding', rareDropChance: 5,  rareDropTag: 'okurrr'      },
    },
    stats: {
      totalPushes: 0, totalMerges: 0, totalCommits: 0,
      rareDropsTriggered: 0, lastEvent: null,
    },
  };
}


export class ConfigManager {
  private globalPath: string;
  private projectPath: string;

  constructor(projectRoot?: string) {
    this.globalPath  = getGlobalConfigPath();
    this.projectPath = getProjectConfigPath(projectRoot);
  }

  loadGlobal(): GitHypeConfig {
    if (!fs.existsSync(this.globalPath)) {
      const cfg = defaultConfig();
      this.saveGlobal(cfg);
      return cfg;
    }
    try {
      return { ...defaultConfig(), ...JSON.parse(fs.readFileSync(this.globalPath, 'utf-8')) };
    } catch { return defaultConfig(); }
  }

  saveGlobal(cfg: GitHypeConfig): void {
    fs.writeFileSync(this.globalPath, JSON.stringify(cfg, null, 2));
  }

  loadProject(): Partial<GitHypeConfig> | null {
    if (!fs.existsSync(this.projectPath)) return null;
    try { return JSON.parse(fs.readFileSync(this.projectPath, 'utf-8')); }
    catch { return null; }
  }

  saveProject(cfg: Partial<GitHypeConfig>): void {
    fs.writeFileSync(this.projectPath, JSON.stringify(cfg, null, 2));
  }

  // Project config overrides global — enables per-repo customization
  load(): GitHypeConfig {
    const global  = this.loadGlobal();
    const project = this.loadProject();
    if (!project) return global;
    return deepMerge(
      global  as unknown as Record<string, unknown>,
      project as unknown as Record<string, unknown>
    ) as unknown as GitHypeConfig;
  }

  recordEvent(event: 'push' | 'merge' | 'commit', rare = false): void {
    const cfg = this.loadGlobal();
    if (event === 'push')   cfg.stats.totalPushes++;
    if (event === 'merge')  cfg.stats.totalMerges++;
    if (event === 'commit') cfg.stats.totalCommits++;
    if (rare) cfg.stats.rareDropsTriggered++;
    cfg.stats.lastEvent = new Date().toISOString();
    this.saveGlobal(cfg);
  }
}

function deepMerge(
  t: Record<string, unknown>,
  s: Record<string, unknown>
): Record<string, unknown> {
  const r: Record<string, unknown> = { ...t };
  for (const k of Object.keys(s)) {
    const sv = s[k], tv = t[k];
    r[k] = (sv && typeof sv === 'object' && !Array.isArray(sv)
            && tv && typeof tv === 'object')
      ? deepMerge(tv as Record<string, unknown>, sv as Record<string, unknown>)
      : sv !== undefined ? sv : tv;
  }
  return r;
}