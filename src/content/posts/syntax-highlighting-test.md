---
title: Syntax Highlighting Test
date: 2026-05-04
description: Post fixture untuk menguji syntax highlighting dan tombol copy.
tags:
  - test
  - syntax-highlighting
draft: false
---

# Syntax Highlighting Test

Inline code: `const x = 42;` harus terlihat normal tanpa copy button.

## TypeScript

```ts
type User = { id: string; name: string };

function greet(user: User): string {
  return `Hello, ${user.name}!`;
}

const users: User[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
];

users.forEach((u) => console.log(greet(u)));
```

## JavaScript

```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
const evens = doubled.filter((n) => n % 4 === 0);
console.log(evens);
```

## Svelte

```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>

<button onclick={() => count++}>
  Count: {count} (doubled: {doubled})
</button>
```

## CSS

```css
.prose pre {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
}
```

## Bash

```bash
pnpm add -D rehype-pretty-code shiki
pnpm check
pnpm build
```
