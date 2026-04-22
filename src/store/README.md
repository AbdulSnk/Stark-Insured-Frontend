# Zustand State Management Guidelines

## Overview

This project uses **Zustand** for global state management. This document outlines when to use Zustand stores vs local component state (`useState`), naming conventions, and best practices.

## Existing Stores

### 1. `walletStore` - Wallet & Authentication State
**File:** `src/store/walletStore.ts`

**Manages:**
- Wallet connection status
- Auth sessions
- Registered users
- Connection flow state

**Usage:**
```typescript
import { useWalletStore } from '@/store/walletStore';

const status = useWalletStore(state => state.status);
const session = useWalletStore(state => state.session);
```

### 2. `formStore` - Form Submission State
**File:** `src/store/formStore.ts`

**Manages:**
- Form submission status (idle, loading, success, error)
- Form data
- Form errors

**Usage:**
```typescript
import { useFormStore } from '@/store/formStore';

const { startSubmission, completeSubmission, failSubmission } = useFormStore();
const formState = useFormStore(state => state.getFormState('claim-form'));
```

### 3. `uiStore` - UI State (Modals, Loading, Sidebar)
**File:** `src/store/uiStore.ts`

**Manages:**
- Modal open/close state
- Global loading states
- Sidebar toggle state

**Usage:**
```typescript
import { useUIStore } from '@/store/uiStore';

const { openModal, closeModal, setLoading } = useUIStore();
const isModalOpen = useUIStore(state => state.isModalOpen('purchase-modal'));
const isLoading = useUIStore(state => state.isLoading('policies-listing'));
```

### 4. `filterStore` - Filter & Pagination State
**File:** `src/store/filterStore.ts`

**Manages:**
- Policy filters (search, status, tab, price order, coverage range)
- Claims filters
- Pagination state

**Usage:**
```typescript
import { useFilterStore } from '@/store/filterStore';

const { setPoliciesSearch, setPoliciesPriceOrder } = useFilterStore();
const policies = useFilterStore(state => state.policies);
```

---

## When to Use Zustand vs Local State

### ✅ Use Zustand Stores For:

1. **Shared State** - State accessed by multiple components
   - User authentication status
   - Global loading indicators
   - Theme preferences
   - Notification state

2. **Persistent State** - State that should survive component unmount
   - Filter preferences
   - Form data across steps
   - Pagination state

3. **Complex State Logic** - State with complex update patterns
   - Multi-step form flows
   - Modal management
   - Wallet connection flow

4. **Cross-Cutting Concerns** - State affecting multiple features
   - Global error handling
   - Analytics tracking
   - User preferences

### ✅ Use Local State (`useState`) For:

1. **Component-Specific UI State** - State only relevant to one component
   - Loading state for a single data fetch
   - Toggle state for expandable sections
   - Input field values (unless form is multi-step)

2. **Ephemeral State** - State that doesn't need to persist
   - Temporary hover states
   - Animation states
   - Local validation errors

3. **Derived State** - State computed from props or other state
   - Filtered lists
   - Computed values
   - Memoized calculations

4. **Modal Instance State** - State specific to a modal instance
   - Modal form data
   - Modal-specific loading states
   - Transaction status within modal

---

## Examples from Codebase

### ✅ Correct: Local State for Component Loading

```typescript
// PolicyListingScreen.tsx
const [status, setStatus] = useState<UiStatus>("loading");
```

**Why:** This loading state is specific to the PolicyListingScreen component's data fetch. It doesn't need to be shared.

### ✅ Correct: Zustand for Filter State

```typescript
// Using usePolicyFilters hook which wraps useFilterStore
const { filterState, setSearchQuery } = usePolicyFilters();
```

**Why:** Filters affect multiple components and should persist across navigation.

### ✅ Correct: Local State for Modal Instance

```typescript
// PolicyPurchaseEntryModal.tsx
const [status, setStatus] = useState<PurchaseStatus>("review");
const [errorMessage, setErrorMessage] = useState<string | null>(null);
```

**Why:** This state is specific to a single modal instance and its purchase flow.

### ❌ Incorrect: When to Migrate to Zustand

If you find yourself doing this:
```typescript
// DON'T: Passing state through many levels
<Parent>
  <Child1 state={state} setState={setState}>
    <GrandChild state={state} setState={setState} />
  </Child1>
</Parent>
```

**DO:** Move to Zustand store
```typescript
// DO: Access directly in any component
const state = useMyStore(state => state.myState);
const setState = useMyStore(state => state.setMyState);
```

---

## Best Practices

### 1. Select Specific State
```typescript
// ❌ BAD: Re-renders on any store change
const store = useMyStore();

// ✅ GOOD: Only re-renders when count changes
const count = useMyStore(state => state.count);
```

### 2. Use Selectors for Derived State
```typescript
// In store
const useUIStore = create((set, get) => ({
  modals: {},
  isAnyModalOpen: () => {
    const { modals } = get();
    return Object.values(modals).some(m => m.isOpen);
  }
}));

// In component
const isAnyModalOpen = useUIStore(state => state.isAnyModalOpen());
```

### 3. Name Actions Clearly
```typescript
// ✅ Good
setLoading: (key, loading) => ...
openModal: (id, type, data) => ...

// ❌ Bad
set: (data) => ...
update: (val) => ...
```

### 4. Use DevTools for Debugging
All stores are wrapped with `devtools` middleware:
```typescript
export const useMyStore = create()(
  devtools(
    persist(
      (set, get) => ({...}),
      { name: 'my-store' }
    ),
    { name: 'MyStore' }
  )
);
```

### 5. Partialize Persisted State
Only persist what's necessary:
```typescript
persist(
  (set, get) => ({...}),
  {
    name: 'wallet-store',
    partialize: (state) => ({
      session: state.session,
      registeredUsers: state.registeredUsers,
    }),
  }
)
```

---

## Migration Guide

### Migrating from useState to Zustand

**Before:**
```typescript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

**After:**
```typescript
import { useUIStore } from '@/store/uiStore';

const setLoading = useUIStore(state => state.setLoading);
const isLoading = useUIStore(state => state.isLoading('my-component'));

// Usage
setLoading('my-component', true);
```

### Migrating Prop Drilling to Zustand

**Before:**
```typescript
<Parent>
  <Child data={data} onAction={handleAction} />
</Parent>
```

**After:**
```typescript
// In any component
const data = useMyStore(state => state.data);
const action = useMyStore(state => state.doAction);
```

---

## Store Creation Template

```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface MyState {
  // State properties
  value: string;
  isLoading: boolean;
  
  // Actions
  setValue: (value: string) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

const initialState = {
  value: '',
  isLoading: false,
};

export const useMyStore = create<MyState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        
        setValue: (value) => set({ value }, false, 'setValue'),
        setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
        reset: () => set(initialState, false, 'reset'),
      }),
      {
        name: 'my-store',
        partialize: (state) => ({
          value: state.value,
        }),
      }
    ),
    { name: 'MyStore' }
  )
);
```

---

## Common Pitfalls

### ❌ Don't Overuse Global State
Not all state needs to be global. Keep component-specific state local.

### ❌ Don't Store Derived State
Compute values from state instead of storing them:
```typescript
// ❌ Bad
const filteredItems = useStore(state => state.filteredItems);

// ✅ Good
const items = useStore(state => state.items);
const filteredItems = useMemo(() => filter(items), [items]);
```

### ❌ Don't Forget TypeScript
Always type your stores properly:
```typescript
interface MyState {
  value: string;
  setValue: (value: string) => void;
}
```

---

## Testing Stores

```typescript
import { useMyStore } from '@/store/myStore';

describe('MyStore', () => {
  it('should update value', () => {
    const { setValue } = useMyStore.getState();
    setValue('test');
    expect(useMyStore.getState().value).toBe('test');
  });
});
```

---

## Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Zustand Best Practices](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [When to Use Global State](https://kentcdodds.com/blog/application-state-management-with-react)
