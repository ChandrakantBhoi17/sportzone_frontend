# SportZone Account Layout & Sidebar Navigation Setup

## 📋 Overview

A complete account management system with left-side navigation menu. Users can manage their profile, orders, addresses, and shopping cart all in one place.

---

## ✨ Features Implemented

### 1. **Sidebar Navigation Layout**
- **Components**: `AccountLayout.tsx`
- Left sidebar with 4 menu items:
  - 👤 Profile - Edit account settings
  - 📦 My Orders - View order history
  - 📍 Addresses - Manage delivery addresses
  - 🛒 Shopping Cart - View & manage cart items
- Mobile-responsive with hamburger menu
- Active tab highlighting
- One-click logout

### 2. **Address Management** (`Account/Address.tsx`)
- ✅ Add new delivery addresses
- ✅ Edit existing addresses
- ✅ Delete addresses
- ✅ Set default address
- ✅ Multiple address support
- Form validation with required fields:
  - Full Name, Phone, Address
  - City, State, Postal Code
- Local storage persistence

### 3. **Enhanced Checkout** (`Checkout.tsx`)
- ✅ Select from saved addresses
- ✅ Or enter new address
- ✅ Auto-populate form from selected address
- ✅ State field added to address info
- ✅ Seamless integration with address manager

### 4. **Account Cart View** (`Account/CartView.tsx`)
- ✅ View cart items from account page
- ✅ Quantity controls (±)
- ✅ Remove items
- ✅ Order summary
- ✅ Direct checkout navigation

### 5. **Database Seeding**
- 📦 **26 Premium Products** across 7 categories:
  - Running (4 shoes)
  - Basketball (4 shoes)
  - Football (4 boots)
  - Tennis (4 shoes)
  - Swimming (3 items)
  - Gym (3 shoes)
  - Cycling (4 items)
- ✅ All products include:
  - Images, ratings, reviews
  - Price & original price
  - Material & weight specs
  - Category tags
  - Daily wear designation

---

## 📁 New Files Created

```
src/
├── components/
│   └── AccountLayout.tsx           # Main sidebar layout wrapper
└── pages/
    └── Account/
        ├── Address.tsx             # Address CRUD component
        ├── CartView.tsx            # Cart display for account page
        ├── AccountSettings.tsx      # Profile editor (existing, unchanged)
        └── OrdersList.tsx           # Orders list (existing, unchanged)

backend/
└── scripts/
    └── seed.ts                     # Product database seeding script
```

## 📝 Updated Files

### Frontend

1. **`src/pages/Account.tsx`**
   - Restructured with new `AccountLayout` wrapper
   - Tab switching logic
   - Dynamic content rendering

2. **`src/components/Navbar.tsx`**
   - Updated label from "Dashboard" → "Account"

3. **`src/pages/Checkout.tsx`**
   - Integrated saved addresses
   - Toggle between existing/new address
   - Auto-fill with selected address
   - Added state field

4. **`package.json`**
   - Fixed duplicate proxy entries

### Backend

1. **`backend/src/routes/index.ts`**
   - Proper route initialization

---

## 🚀 Getting Started

### Frontend Setup

```bash
cd /Users/chandrakantabhoi/sportzone

# Install dependencies
npm install

# Start development server
npm run dev
# Server runs at: http://localhost:8081
```

### Backend Setup

```bash
cd /Users/chandrakantabhoi/sportzone/backend

# Install dependencies
npm install

# Configure .env file
# MONGO_URI=your_mongodb_connection_string
# PORT=5000

# Start backend server
npm start
```

### Seed Database with Products

```bash
cd /Users/chandrakantabhoi/sportzone/backend

# Run seed script
npm run build
npm run seed

# Output: Seeded 26 products
```

---

## 🔄 User Flow

### 1. **Account Access**
```
User clicks "Account" in Navbar
    ↓
Redirects to /account
    ↓
Shows AccountLayout with sidebar
    ↓
Default opens Profile tab
```

### 2. **Address Management**
```
Click "Addresses" menu
    ↓
View saved addresses
    ↓
Add New → Fill form → Save
Edit → Update details → Save
Delete → Remove address
Set Default → Use as primary
```

### 3. **Checkout Flow**
```
Add items to cart
    ↓
Click "Proceed to Checkout"
    ↓
Requires login (redirects if needed)
    ↓
Checkout page loads
    ↓
Option 1: Select saved address
Option 2: Enter new address
    ↓
Form auto-populates
    ↓
Review order summary
    ↓
Place order → Creates order record
    ↓
View order confirmation
```

### 4. **View Cart from Account**
```
User logged in
    ↓
Go to /account
    ↓
Click "Shopping Cart"
    ↓
View all cart items
    ↓
Modify quantities or remove items
    ↓
Proceed to checkout
```

---

## 💾 Data Storage

### LocalStorage Persistence

| Key | Purpose | Format |
|-----|---------|--------|
| `sportzone_token` | Auth token | String |
| `sportzone_user` | User object | JSON |
| `sportzone_orders` | Order history | JSON Array |
| `sportzone_addresses` | Saved addresses | JSON Array |
| `jewel-cart` | Shopping cart | JSON Array |

### Example Address Object
```json
{
  "id": "1712501234567",
  "fullName": "John Doe",
  "phone": "+91 9876543210",
  "address": "123 Main Street",
  "city": "Delhi",
  "state": "Delhi",
  "postalCode": "110001",
  "isDefault": true
}
```

### Example Product Object (Database)
```json
{
  "id": 1,
  "name": "Nike Air Zoom Pegasus 40",
  "price": 12999,
  "originalPrice": 15999,
  "description": "Premium running shoes...",
  "material": "Nike",
  "category": "Running",
  "weight": "280g",
  "image": "https://...",
  "rating": 4.5,
  "reviews": 128,
  "dailyWear": true
}
```

---

## 🧪 Testing the Implementation

### Test Address Management
1. Navigate to `/account`
2. Login if needed
3. Click "Addresses"
4. Add new address with:
   - Full name, phone, address
   - City, state, postal code
5. Set as default
6. Edit address details
7. Verify in checkout flow

### Test Checkout with Saved Address
1. Add items to cart
2. Go to `/cart`
3. Click "Proceed to Checkout"
4. Should see option to select saved address
5. Select address and verify auto-fill
6. Place order

### Test Cart from Account
1. Go to `/account`
2. Click "Shopping Cart"
3. View all items
4. Modify quantities
5. Remove items
6. Click checkout

### Test Order History
1. Place multiple orders
2. Go to `/account`
3. Click "My Orders"
4. View order details
5. Click order to see full details

---

## 🎨 UI Components Used

- `AccountLayout` - Custom wrapper with sidebar
- `Button` - shadcn/ui button
- `Input` - Text input fields
- `Tabs` - Tab navigation (legacy, now using direct routing)
- `Badge` - Status indicators
- `Card` - Content containers

---

## 📦 Products Categories (26 Total)

| Category | Count | Examples |
|----------|-------|----------|
| Running | 4 | Nike Pegasus, Adidas Ultraboost, Puma Velocity |
| Basketball | 4 | Air Jordan, Adidas Dame, Puma Clyde |
| Football | 4 | Nike Mercurial, Adidas Predator, Puma Future Z |
| Tennis | 4 | Nike Vapor Pro, Adidas Barricade, Puma RS-0 |
| Swimming | 3 | Nike Goggles, Adidas Fins, Puma Cap |
| Gym | 3 | Nike Metcon, Adidas Nano, Puma Tazon |
| Cycling | 4 | Nike Helmet, Adidas Shoes, Puma Gloves |

---

## 🔗 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=Running` - Filter by category
- `GET /api/products/:id` - Get single product

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add to cart
- `DELETE /api/cart/:id` - Remove from cart

---

## 🐛 Troubleshooting

### Issue: Addresses not saving
**Solution**: Check browser console for localStorage availability. Ensure privacy mode is not enabled.

### Issue: Checkout form not populating
**Solution**: Verify saved addresses exist in localStorage. Clear cache and reload.

### Issue: Products not showing
**Solution**: Run seed script to populate database. Check MongoDB connection.

### Issue: Mobile menu not closing
**Solution**: Ensure `setMobileOpen` is called on link click. Check mobile viewport.

---

## 📞 Support

For issues or questions, refer to:
- [React Documentation](https://react.dev)
- [shadcn/ui Components](https://ui.shadcn.com)
- [MongoDB Guide](https://docs.mongodb.com)

---

**Last Updated**: April 7, 2026
**Version**: 1.0
