# ✅ Problem 3: Messy React – Refactor & Explanation

## 📌 Overview

This task demonstrates how I identified inefficiencies in a messy React + TypeScript component, explained the anti-patterns, and refactored it to follow modern best practices.

---

## ✅ 1. Issues in the Original Version

### 🚩 1) `getPriority` declared inside the component

- It was re-created on every render, causing unnecessary re-computation.

---

### 🚩 2) Weak or missing type safety

- The `blockchain` parameter used `any` ➜ no type checking.
- `WalletBalance` was declared in multiple places ➜ risk of inconsistent types.

---

### 🚩 3) Wrong variable in filter

- The filter logic used an undefined variable `lhsPriority` instead of `balancePriority`.

---

### 🚩 4) Confusing filter logic

- It kept balances with `amount <= 0` instead of filtering them out ➜ unclear intention.

---

### 🚩 5) Redundant `formattedBalances`

- An extra mapped array was generated but never actually used ➜ wasted code.

---

### 🚩 6) Bad `useMemo` dependency

- The memoization depended on `prices` even though they were not used in the filtering or sorting ➜ causes unnecessary recalculations.

---

### 🚩 7) Using `key={index}`

- Using array index as a key in `.map` is an anti-pattern ➜ can break rendering if the list order changes.

---

### 🚩 8) Unnecessary `BoxProps` and empty `Props`

- The original `Props` extended `BoxProps` from MUI but the component used a plain `<div>` ➜ extra dependency for no reason.
- The `Props` interface was otherwise empty ➜ redundant.

---

## ✅ 2. How I Improved It

### ✨ 1) Moved `getPriority` outside the component

- This avoids re-creating the function every render ➜ more efficient.

---

### ✨ 2) Stronger typing for `blockchain`

- Explicitly typed `blockchain` as `string` instead of `any` ➜ safer.

---

### ✨ 3) Centralized `WalletBalance` type

- Declared `WalletBalance` in `types/wallet.ts` and imported it ➜ reuse across hooks and components ➜ consistent and DRY.

---

### ✨ 4) Filter logic simplified

- Clear, simple condition:
  ```ts
  return priority > -99 && balance.amount > 0;
  ```

### ✨ 5) Removed unused formattedBalances

- No extra arrays ➜ formatting handled directly when rendering rows.

### ✨ 6) Corrected useMemo dependencies

- Now depends only on balances ➜ prices only used when rendering.

### ✨ 7) Used stable unique key

- Replaced key={index} with key={balance.currency} ➜ stable and safe for React reconciliation.

### ✨ 8) Removed BoxProps and empty Props

- Now the component uses plain HTML elements ➜ no MUI dependency ➜ simpler and lighter.

### ✨ 9) Better folder structure

- Added a types/ folder for shared types.

- Hooks and components all reuse the same types ➜ better maintainability.

## ✅ 3. Final Project Structure

```plaintext
problem-3-messy-react/
├── src/
│ ├── components/
│ │ ├── WalletPage_Messy.tsx # Original messy version
│ │ ├── WalletPage_Refactored.tsx # Clean version
│ │ ├── WalletRow.tsx # Simple presentational row
│ ├── hooks/
│ │ ├── useWalletBalances.ts # Dummy data hook
│ │ ├── usePrices.ts # Dummy prices hook
│ ├── types/
│ │ ├── wallet.ts # Shared WalletBalance type
│ ├── App.tsx # Entry point
```

## ✅ 4. How to run

# Required Node version

```bash
nvm use 24.4.0

npm install
npm run dev
```
