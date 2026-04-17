import chalk from 'chalk';
import { speak } from './speak';

export type GitEvent = 'push' | 'merge' | 'commit';

export interface ProducerTag {
  key: string;
  display: string;
  speech: string;
  ref: string;
  stinger: string;
  events: GitEvent[];
  rare?: boolean;
}



export const PRODUCER_TAGS: ProducerTag[] = [


  {
    key: 'json_derulo',
    display: 'J   S   O   N     D  E  R  U  L  O',
    speech: 'Jason Derulo',
    ref: 'Jason Derulo — sings his name at the start of every song',
    stinger: '(commits to every repo)',
    events: ['push', 'merge'],
  },

  {
    key: 'honorable_c',
    display: 'Honorable   C . N . O . T . E .',
    speech: 'Honorable C. N. O. T. E.',
    ref: 'Honorable C.N.O.T.E. — deep cinematic orchestral hit',
    stinger: 'this diff... is cinematic.',
    events: ['merge'],
  },

  {
    key: 'macbook_music',
    display: 'M  M  M  M  M  M    MACBOOK MUSIC',
    speech: 'M, M, M, M, M, M... MacBook Music.',
    ref: 'Maybach Music (MMG) — engine revving before every beat',
    stinger: '(MacBook fan is the Maybach engine)',
    events: ['push', 'merge'],
  },

  {
    key: 'london_on_da_stack',
    display: 'LONDON PON THA STACK, AYYY',
    speech: 'London pon tha stack, ayyyy',
    ref: 'London on da Track — rapid-fire, yells his name at beat end',
    stinger: 'stack overflow never looked so clean',
    events: ['push'],
  },

  {
    key: 'claude_made_it',
    display: 'CLAUDE MADE IT',
    speech: 'Claude made it.',
    ref: 'Metro Boomin — "Metro Boomin Made It"',
    stinger: "if young Claude don't trust your code, I'm gon revert it",
    events: ['merge'],
  },

  {
    key: 'java_beats',
    display: 'JAVA BEATS — HOLLA AT ME',
    speech: 'Java Beats. Holla at me.',
    ref: 'Just Blaze / Boi-1da callout style — "holla at ya boy"',
    stinger: 'compiling since 1995, still hot',
    events: ['push'],
  },

  {
    key: 'da_got_that_code',
    display: 'D . A .   G O T   T H A T   C O D E',
    speech: 'D.A. got that code.',
    ref: 'D.A. Doman — "D.A. got that dope!" (his literal tag)',
    stinger: '(sliding into main branch)',
    events: ['merge'],
  },


  {
    key: 'sql_jacob',
    display: 'SQL JACOB!   SQL JACOB!',
    speech: 'Sequel Jacob! Sequel Jacob!',
    ref: 'Lil Jacob — "Jacob! Jacob!" double-stutter tag',
    stinger: 'SELECT * FROM bangers WHERE fire = TRUE',
    events: ['push', 'merge'],
  },


  {
    key: 'tay_keith',
    display: 'TAY KEITH,  FORK THESE REPOS UP!!',
    speech: 'Tay Keith! Fork these repos up!',
    ref: 'Tay Keith — tag is screamed by someone else over the beat',
    stinger: 'hardest commit in the codebase',
    events: ['merge'],
  },

  {
    key: 'put_these_files_up',
    display: 'PUT THESE FILES UP  ↑↑↑',
    speech: 'Put these files up!',
    ref: 'Pusha T — "Put the numbers up" / hands in the air',
    stinger: "staged, committed, pushed. it's a movie.",
    events: ['push'],
  },

  {
    key: 'we_the_best_code',
    display: '  WE  THE  BEST  CODE  ',
    speech: 'We the best code! Another one.',
    ref: 'DJ Khaled — "We the Best Music!" outro fanfare',
    stinger: 'ANOTHER ONE. ANOTHER MERGE. ANOTHER ONE.',
    events: ['merge'],
  },

  {
    key: 'gpt_made_it',
    display: 'GPT  MADE  IT',
    speech: 'GPT made it.',
    ref: 'Metro Boomin — "Metro Boomin Made It" (AI remix)',
    stinger: '...with a little help from the machine',
    events: ['push'],
  },

  {
    key: 'metro_codin',
    display: "M E T R O   C O D I N '",
    speech: "Metro codin'.",
    ref: 'Metro Boomin — "Metro Boomin want some more"',
    stinger: '(dark minor bells intensify)',
    events: ['merge'],
  },

  {
    key: 'pushin_code',
    display: '🅿  PUSHIN  CODE  🅿',
    speech: 'Pushin code. Everything is P.',
    ref: 'Gunna — "Pushin P" (P = player, positive, pure)',
    stinger: 'P = pushed, passing CI, perfectly clean',
    events: ['push'],
  },

  {
    key: 'working_on_coding',
    display: "I - I - I - I ' M   W O R K I N G   O N   C O D I N G",
    speech: "I, I, I, I'm working on coding.",
    ref: "O.T. Genasis — stutter hook from \"I'm In Love with the Coco\"",
    stinger: '(this PR has been open for 3 weeks)',
    events: ['commit'],
  },

  {
    key: 'vibe_coder',
    display: 'are you a vibe coder?',
    speech: 'Are you a vibe coder?',
    ref: 'Lo-fi hip hop radio — code & relax aesthetic',
    stinger: 'shipping in a hoodie at golden hour since forever',
    events: ['push', 'merge'],
  },

  {
    key: 'another_one',
    display: '    A N O T H E R   O N E .    ',
    speech: 'Another one.',
    ref: 'DJ Khaled — "Another One" (the original)',
    stinger: "they don't want you to push to main. do it anyway.",
    events: ['push', 'merge'],
    rare: true,
  },

  {
    key: 'okurrr',
    display: 'O K U R R R R R R R',
    speech: 'Okurrrrr.',
    ref: 'Cardi B — "Okurrr"',
    stinger: 'tests green. lint clean. okurrr.',
    events: ['push', 'merge'],
    rare: true,
  },
];


export function getTagsForEvent(event: GitEvent, includeRare = false): ProducerTag[] {
  return PRODUCER_TAGS.filter(t => t.events.includes(event) && (includeRare || !t.rare));
}

export function getRareTags(event: GitEvent): ProducerTag[] {
  return PRODUCER_TAGS.filter(t => t.events.includes(event) && t.rare === true);
}

export function getTagByKey(key: string): ProducerTag | undefined {
  return PRODUCER_TAGS.find(t => t.key === key);
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function renderTag(tag: ProducerTag, isRare = false): void {
  const width  = 58;
  const border = chalk.hex('#C9A227');
  const text   = chalk.hex('#C9A227').bold;
  const dim    = chalk.hex('#C9A227').dim;
  const gold   = chalk.hex('#C9A227');
  const white  = chalk.white;
  const line   = '─'.repeat(width);

  const pad = (s: string, w: number) => {
    const stripped = s.replace(/\u001b\[[0-9;]*m/g, '');
    const total = w - stripped.length;
    const left  = Math.floor(total / 2);
    return ' '.repeat(Math.max(0, left)) + s + ' '.repeat(Math.max(0, total - left));
  };

  console.log('');

  if (isRare) {
    console.log(border('┌' + '═'.repeat(width) + '┐'));
    console.log(border('║') + pad(chalk.whiteBright.bold('  💎  RARE DROP  💎  '), width) + border('║'));
    console.log(border('╞' + '═'.repeat(width) + '╡'));
  } else {
    console.log(border('┌' + line + '┐'));
  }

  console.log(border('│') + pad(text(tag.display), width) + border('│'));
  console.log(border('│') + pad(dim('ref: ' + tag.ref), width) + border('│'));
  console.log(border('│') + ' '.repeat(width) + border('│'));

  // Word-wrap stinger
  const stinger = '"' + tag.stinger + '"';
  const maxW = width - 4;
  const words = stinger.split(' ');
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxW) { if (cur) lines.push(cur.trim()); cur = w; }
    else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur.trim());
  for (const l of lines) {
    console.log(border('│') + pad(white(l), width) + border('│'));
  }

  console.log(border('│') + ' '.repeat(width) + border('│'));
  console.log(border('│') + pad(gold.dim('git-hype  ·  producer tag for devs'), width) + border('│'));

  if (isRare) {
    console.log(border('╘' + '═'.repeat(width) + '╛'));
  } else {
    console.log(border('└' + line + '┘'));
  }

  console.log('');

  speak(tag.speech, tag.key);
}