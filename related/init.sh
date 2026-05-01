#!/bin/bash

mkdir -p src/assets
mkdir -p src/components/common
mkdir -p src/components/products
mkdir -p src/components/cart
mkdir -p src/navigation
mkdir -p src/screens/auth
mkdir -p src/screens/main
mkdir -p src/screens/cart
mkdir -p src/screens/profile
mkdir -p src/services
mkdir -p src/store
mkdir -p src/types
mkdir -p src/utils
mkdir -p src/config

touch src/services/supabase.ts
touch src/services/products.ts
touch src/services/orders.ts
touch src/store/useAuthStore.ts
touch src/store/useCartStore.ts
touch src/navigation/RootNavigator.tsx
touch src/navigation/AuthStack.tsx
touch src/navigation/MainTab.tsx
touch src/types/index.ts
touch src/utils/constants.ts
touch src/config/env.ts

echo "Project structure initialized successfully!"

# To make the script executable, run:
# chmod +x init.sh
# To run the script, use:
# ./init.sh