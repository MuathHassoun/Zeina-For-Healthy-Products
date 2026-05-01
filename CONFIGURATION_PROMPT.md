# React Native Mobile App - Complete Configuration Prompt

## Project Overview
This document contains a comprehensive prompt for configuring a React Native mobile application with TypeScript, React Navigation, Zustand state management, and Supabase backend integration.

---

## COMPLETE CONFIGURATION PROMPT FOR AI

### Initial Setup Instructions

**Task**: Set up a complete React Native mobile application with the following specifications:

#### 1. PROJECT INITIALIZATION
- Initialize a React Native project (v0.85.2) with TypeScript support
- Use the command: `npx @react-native-community/cli@latest init [ProjectName]`
- Accept default options when prompted
- The project should have a clean structure with android/, ios/, and src/ folders

#### 2. CORE DEPENDENCIES TO INSTALL
Run the following installation command:
```bash
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs zustand @supabase/supabase-js react-native-screens react-native-safe-area-context
```

This installs:
- **@react-navigation/native**: Core navigation library
- **@react-navigation/stack**: Stack navigator for screen transitions
- **@react-navigation/bottom-tabs**: Tab navigation for main app screens
- **zustand**: Lightweight state management library
- **@supabase/supabase-js**: Supabase client for database and authentication
- **react-native-screens**: Performance optimization for navigation
- **react-native-safe-area-context**: Safe area handling for modern devices

#### 3. PROJECT FOLDER STRUCTURE
Create the following directory structure inside the `src/` folder:
```
src/
├── assets/              # Images, fonts, and static files
├── components/
│   ├── cart/           # Cart-related components
│   ├── common/         # Reusable common components
│   └── products/       # Product-related components
├── config/
│   └── env.ts          # Environment variables and API keys
├── navigation/
│   ├── AuthStack.tsx   # Authentication navigation stack
│   ├── MainTab.tsx     # Main app tab navigation
│   └── RootNavigator.tsx # Root navigation container
├── screens/
│   ├── auth/           # Authentication screens (Login, Register, etc.)
│   ├── cart/           # Shopping cart screens
│   ├── main/           # Main app screens
│   └── profile/        # User profile screens
├── services/
│   ├── supabase.ts     # Supabase client initialization
│   ├── products.ts     # Product API service
│   └── orders.ts       # Orders API service
├── store/
│   ├── useAuthStore.ts # Authentication state management
│   └── useCartStore.ts # Shopping cart state management
├── types/
│   └── index.ts        # TypeScript type definitions
└── utils/
    └── constants.ts    # App constants and configuration values
```

#### 4. FILE CONFIGURATIONS

**File: `src/config/env.ts`**
```typescript
export const SUPABASE_URL = 'your-supabase-project-url'
export const SUPABASE_ANON_KEY = 'your-supabase-anon-key'
```
Purpose: Stores environment variables. Replace with actual Supabase credentials from your Supabase project dashboard.

**File: `src/services/supabase.ts`**
```typescript
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/env'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
```
Purpose: Initializes and exports the Supabase client for use throughout the app.

**File: `src/store/useAuthStore.ts`** (Zustand Store Template)
```typescript
import { create } from 'zustand'

interface User {
  id: string
  email: string
  [key: string]: any
}

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ user: null }),
}))
```
Purpose: Manages global authentication state using Zustand.

**File: `src/store/useCartStore.ts`** (Zustand Store Template)
```typescript
import { create } from 'zustand'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ items: [] }),
}))
```
Purpose: Manages shopping cart state using Zustand.

**File: `src/types/index.ts`** (Type Definitions Template)
```typescript
// User Types
export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

// Product Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
  stock: number
}

// Order Types
export interface Order {
  id: string
  userId: string
  products: Product[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered'
  createdAt: string
}

// Cart Types
export interface CartItem extends Product {
  quantity: number
}
```
Purpose: Centralized TypeScript type definitions for the entire app.

**File: `src/utils/constants.ts`** (Constants Template)
```typescript
// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  ORDERS: '/orders',
  USERS: '/users',
  AUTH: '/auth',
}

// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'Zeina For Health Products',
  VERSION: '0.0.1',
  TIMEOUT: 30000, // 30 seconds
}

// Status Codes
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please try again.',
  AUTH_ERROR: 'Authentication failed. Please log in again.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
}
```
Purpose: Centralized constants for the entire application.

**File: `src/navigation/RootNavigator.tsx`** (Navigation Template)
```typescript
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useAuthStore } from '../store/useAuthStore'
import AuthStack from './AuthStack'
import MainTab from './MainTab'

export default function RootNavigator() {
  const user = useAuthStore((state) => state.user)

  return (
    <NavigationContainer>
      {user ? <MainTab /> : <AuthStack />}
    </NavigationContainer>
  )
}
```
Purpose: Root navigation container that switches between auth and main app based on user login state.

**File: `src/navigation/AuthStack.tsx`** (Auth Navigation Template)
```typescript
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Add your authentication screens here */}
      {/* Example:
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      */}
    </Stack.Navigator>
  )
}
```
Purpose: Stack navigator for authentication screens.

**File: `src/navigation/MainTab.tsx`** (Tab Navigation Template)
```typescript
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

export default function MainTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      {/* Add your main app screens here as tabs */}
      {/* Example:
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      */}
    </Tab.Navigator>
  )
}
```
Purpose: Bottom tab navigator for main app screens.

#### 5. MAIN APP FILE UPDATE

**File: `App.tsx`**
Replace the default content with:
```typescript
import React from 'react'
import RootNavigator from './src/navigation/RootNavigator'

export default function App() {
  return <RootNavigator />
}
```
Purpose: Main entry point that renders the navigation system.

#### 6. DATABASE SCHEMA (Supabase SQL)
Store this SQL in a `db/` folder for reference:
```sql
-- User Authentication Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255),
  category VARCHAR(100),
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
```

#### 7. DEVELOPMENT COMMANDS
```bash
# Start the Metro bundler
npm start

# Run on Android emulator
npm run android

# Run on iOS simulator (macOS only)
npm run ios

# Run linter
npm run lint

# Run tests
npm run test
```

#### 8. NEXT STEPS FOR IMPLEMENTATION
1. Set up your Supabase project at https://supabase.com
2. Update `src/config/env.ts` with your Supabase URL and Anon Key
3. Create authentication screens in `src/screens/auth/`
4. Create main app screens in `src/screens/main/`, `src/screens/cart/`, `src/screens/profile/`
5. Implement API services in `src/services/products.ts` and `src/services/orders.ts`
6. Add reusable components in `src/components/`
7. Connect screens to Zustand stores for state management
8. Test on Android emulator or iOS simulator

#### 9. IMPORTANT NOTES
- This structure follows the container/presentational component pattern
- Use Zustand for global state and React hooks for local component state
- All API calls should go through the services layer
- Type definitions ensure type safety throughout the app
- React Navigation handles all routing and screen transitions
- The app automatically switches between auth and main navigation based on login state

---

## END OF PROMPT

Use this prompt with any AI assistant to replicate the exact same configuration for another React Native project.
