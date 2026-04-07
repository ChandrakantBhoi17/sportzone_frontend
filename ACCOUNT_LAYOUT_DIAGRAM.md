# Account Layout Structure

## Visual Layout

```
┌──────────────────────────────────────────────────────┐
│ SportZone                     🛒  👤 Account  🔐     │
└──────────────────────────────────────────────────────┘
│
├─ My Account - Welcome, John Doe        [Logout]     │
│
├───────────────────────┬──────────────────────────────┤
│                       │                              │
│  SIDEBAR (Left)       │  CONTENT (Right)             │
│                       │                              │
│  ┌─────────────────┐  │  ┌─────────────────────────┐ │
│  │                 │  │  │                         │ │
│  │ 👤 Profile      │  │  │ Profile Settings        │ │
│  │ 📦 My Orders    │  │  │ ┌──────────────────────┤ │
│  │ 📍 Addresses    │  │  │ │ Full Name: John      │ │
│  │ 🛒 Shopping Cart│  │  │ │ Email: john@...      │ │
│  │                 │  │  │ │ [Edit] [Save]        │ │
│  │ ─────────────── │  │  │ └──────────────────────┤ │
│  │ [Logout]        │  │  │                         │ │
│  │                 │  │  │                         │ │
│  └─────────────────┘  │  └─────────────────────────┘ │
│                       │                              │
└───────────────────────┴──────────────────────────────┘
│
└─ Footer
```

## Tab Views Detailed

### 1. Profile Tab
```
┌────────────────────────────────────┐
│ Account Settings                   │
├────────────────────────────────────┤
│ Full Name                          │
│ [John Doe_____________]            │
│                                    │
│ Email Address                      │
│ [john@example.com_____]            │
│                                    │
│ [Edit Profile]                     │
└────────────────────────────────────┘
```

### 2. My Orders Tab
```
┌────────────────────────────────────┐
│ My Orders                          │
├────────────────────────────────────┤
│ ┌──────────────────────────────┐  │
│ │ Order ORD-1712345678         │  │
│ │ Status: [Delivered]          │  │
│ │ Items: 2  |  Total: ₹25,998  │  │
│ │ Delhi, Delhi                 │  │
│ └──────────────────────────────┘  │
│                                    │
│ ┌──────────────────────────────┐  │
│ │ Order ORD-1712345600         │  │
│ │ Status: [Completed]          │  │
│ │ Items: 3  |  Total: ₹35,997  │  │
│ │ Mumbai, Maharashtra          │  │
│ └──────────────────────────────┘  │
└────────────────────────────────────┘
```

### 3. Addresses Tab
```
┌────────────────────────────────────┐
│ Delivery Addresses    [+ Add New]   │
├────────────────────────────────────┤
│ ┌──────────────────────────────┐  │
│ │ [Default Address]            │  │
│ │ John Doe                     │  │
│ │ 123 Main Street              │  │
│ │ Delhi, Delhi 110001          │  │
│ │ +91 9876543210               │  │
│ │ [Edit] [Delete]              │  │
│ └──────────────────────────────┘  │
│                                    │
│ ┌──────────────────────────────┐  │
│ │ Jane Doe                     │  │
│ │ 456 Second Ave               │  │
│ │ Mumbai, Maharashtra 400001   │  │
│ │ +91 9876543211               │  │
│ │ [Edit] [Delete] [Set Default]│  │
│ └──────────────────────────────┘  │
│                                    │
│ [+ Add New Address]                │
└────────────────────────────────────┘
```

### 4. Shopping Cart Tab
```
┌────────────────────────────────────┐
│ Shopping Cart                      │
├────────────────────────────────────┤
│ ┌──────────────────────────────┐  │
│ │ [IMG] Nike Air Zoom 40       │  │
│ │       ₹12,999                │  │
│ │       Qty: [−] 2 [+]         │  │
│ │       Subtotal: ₹25,998  [✕] │  │
│ └──────────────────────────────┘  │
│                                    │
│ ─────────────────────────────────  │
│ Subtotal:        ₹25,998          │
│ Shipping:        FREE             │
│ Total:           ₹25,998          │
│ ─────────────────────────────────  │
│                                    │
│ [Proceed to Checkout]              │
│ [Continue Shopping]                │
└────────────────────────────────────┘
```

## Mobile View

```
┌──────────────────────────┐
│ SportZone    ☰           │
└──────────────────────────┘
│                          │
│ My Account               │
│ Welcome, John Doe        │
│ [Logout]                 │
│                          │
│ [☰ Menu Expanded]        │
│ ┌──────────────────────┐ │
│ │ 👤 Profile           │ │
│ │ 📦 My Orders         │ │
│ │ 📍 Addresses         │ │
│ │ 🛒 Shopping Cart     │ │
│ │ [Logout]             │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │ Profile Settings     │ │
│ │                      │ │
│ │ [Form content...]    │ │
│ │                      │ │
│ └──────────────────────┘ │
│                          │
└──────────────────────────┘
```

## Checkout Flow with Saved Address

```
Checkout Page
├─ Existing Addresses (Radio)
│  └─ ☑ Use Existing Address
│     ┌─────────────────────────────┐
│     │ SELECT                      │
│     │ John - 123 Main St, Delhi   │
│     │ Jane - 456 Ave, Mumbai      │
│     └─────────────────────────────┘
│
├─ OR
│
└─ ☐ Enter New Address
   ┌──────────────────────────────┐
   │ Full Name [_________]         │
   │ Email [___________]           │
   │ Phone [___________]           │
   │ Address [_________]           │
   │ City [___] State [___] Zip    │
   │ [Place Order - ₹...]          │
   └──────────────────────────────┘
```

## Data Flow

```
User Login
    ↓
Navigate to /account
    ↓
AccountLayout renders with Navbar + Sidebar + Footer
    ↓
Click Menu Item (Profile/Orders/Addresses/Cart)
    ↓
setActiveTab updates state
    ↓
renderContent() switch case returns correct component
    ↓
Component displays appropriate content
    ↓
User interacts (edit, add, delete, etc)
    ↓
localStorage updated
    ↓
Component re-renders with new data
```

## Component Hierarchy

```
App
├── Navbar
├── Account Page
│   ├── AccountLayout
│   │   ├── Header (Welcome + Logout)
│   │   ├── Sidebar Navigation
│   │   │   ├── Profile Button
│   │   │   ├── Orders Button
│   │   │   ├── Address Button
│   │   │   ├── Cart Button
│   │   │   └── Logout Button
│   │   └── Content Area
│   │       ├── AccountSettings (Profile Tab)
│   │       ├── OrdersList (Orders Tab)
│   │       ├── Address (Addresses Tab)
│   │       └── CartView (Cart Tab)
│   │
│   └── Footer
│
└── Other Pages
```

## Responsive Breakpoints

| Size | Layout | Sidebar |
|------|--------|---------|
| Mobile (<768px) | Single Column | Hidden, Hamburger Menu |
| Tablet (768px-1024px) | 2 Column (1-3 ratio) | Visible |
| Desktop (>1024px) | 2 Column (1-3 ratio) | Visible |

## State Management

Each component manages its own state via React hooks:

1. **AccountLayout**: `activeTab`, `mobileOpen`
2. **Account**: `activeTab`
3. **Address**: `addresses`, `showForm`, `editingId`, `formData`
4. **CartView**: Uses `useCart()` context hook
5. **Checkout**: Uses `useCart()`, `useOrders()`, saved addresses

## User Interaction Flow

```
User Action          →  State Update  →  Re-render  →  Display
─────────────────────────────────────────────────────────────
Click Profile        →  activeTab="profile"  →  Show AccountSettings
Click Orders         →  activeTab="orders"   →  Show OrdersList
Click Addresses      →  activeTab="address"  →  Show Address
Click Shopping Cart  →  activeTab="cart"     →  Show CartView
Click Add Address    →  showForm=true        →  Show form
Click Edit           →  editingId=addr.id    →  Pre-fill form
Click Save           →  addresses updated    →  Refresh list
Click Delete         →  Remove from array    →  Refresh list
```
