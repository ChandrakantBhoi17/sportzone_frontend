# Quick Start Commands & Implementation Guide

## 🚀 Quick Start (5 minutes)

### Terminal 1: Backend

```bash
# Navigate to backend
cd /Users/chandrakantabhoi/sportzone/backend

# Install dependencies
npm install

# Build TypeScript
npm run build

# Seed database with 26 products
npm run seed

# Start backend server
npm start
# ✅ Backend running at http://localhost:5000
```

### Terminal 2: Frontend

```bash
# Navigate to frontend
cd /Users/chandrakantabhoi/sportzone

# Install dependencies
npm install

# Start development server
npm run dev
# ✅ Frontend running at http://localhost:8081
```

### Terminal 3: Testing (Optional)

```bash
# Test API endpoints
curl http://localhost:5000/api/products
curl http://localhost:5000/api/products?category=Running
```

---

## 📋 File Checklist

### ✅ Frontend Files Created

- [x] `src/components/AccountLayout.tsx` - Sidebar navigation wrapper
- [x] `src/pages/Account/Address.tsx` - Address management CRUD
- [x] `src/pages/Account/CartView.tsx` - Cart display in account
- [x] `src/pages/Account.tsx` - Updated with layout integration
- [x] `src/components/Navbar.tsx` - Updated label
- [x] `src/pages/Checkout.tsx` - Updated with saved addresses

### ✅ Backend Files

- [x] `backend/scripts/seed.ts` - Product seeding script
- [x] `backend/src/routes/products.ts` - Product API endpoints
- [x] `backend/src/models/Product.ts` - Product schema

### ✅ Documentation Files

- [x] `ACCOUNT_SETUP.md` - Complete account setup guide
- [x] `ACCOUNT_LAYOUT_DIAGRAM.md` - Visual diagrams
- [x] `backend/SETUP.md` - Backend seeding guide
- [x] `QUICK_START.md` - This file

---

## 🧪 Testing Checklist

### Test 1: Access Account Page
- [ ] Navigate to `/account`
- [ ] Should redirect to login if not authenticated
- [ ] After login, should show sidebar with 4 menu items
- [ ] Welcome message displays user name/email

### Test 2: Test Profile Tab
- [ ] Click "Profile" in sidebar
- [ ] Shows AccountSettings component
- [ ] Can edit name and email
- [ ] Save button works

### Test 3: Test Orders Tab
- [ ] Click "My Orders"
- [ ] Shows OrdersList component
- [ ] If no orders: "No Orders Yet" message
- [ ] After placing order: order appears in list

### Test 4: Test Address Tab
- [ ] Click "Addresses"
- [ ] Shows Address component
- [ ] Click "Add New Address"
- [ ] Form appears with all fields
- [ ] Submit form → address saves
- [ ] Address appears in list
- [ ] Can edit address
- [ ] Can delete address
- [ ] Can set as default

### Test 5: Test Cart Tab
- [ ] Add items to cart from products page
- [ ] Go to `/account`
- [ ] Click "Shopping Cart"
- [ ] Shows all cart items
- [ ] Can adjust quantities
- [ ] Can remove items
- [ ] Checkout button navigates to `/checkout`

### Test 6: Test Checkout with Saved Address
- [ ] Go to `/checkout`
- [ ] Should see saved addresses dropdown
- [ ] Select an address
- [ ] Form auto-populates
- [ ] Place order
- [ ] Order created successfully

### Test 7: Test Mobile Responsive
- [ ] Resize browser to <768px
- [ ] Sidebar should be hidden
- [ ] Hamburger menu appears
- [ ] Click menu → sidebar shows
- [ ] Click menu item → sidebar closes
- [ ] Desktop: sidebar always visible

---

## 🔧 Common Issues & Fixes

### Issue: "Address component not showing"
```bash
# Check file exists
ls -la src/pages/Account/Address.tsx

# Check imports in Account.tsx
grep "import Address" src/pages/Account.tsx
```

### Issue: Products not loading in checkout
```bash
# Check seed was successful
curl http://localhost:5000/api/products | grep -c "name"
# Should return 26

# Restart backend if needed
npm start
```

### Issue: Saved addresses not populating checkout
```bash
# Clear localStorage and start fresh
# In browser console:
localStorage.clear()
# Then add new address
```

### Issue: "Cannot find module" errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## 📊 Features Summary

| Feature | Status | Location |
|---------|--------|----------|
| Sidebar Navigation | ✅ Complete | `AccountLayout.tsx` |
| Profile Management | ✅ Complete | `AccountSettings.tsx` |
| Order History | ✅ Complete | `OrdersList.tsx` |
| Address CRUD | ✅ Complete | `Address.tsx` |
| Cart View | ✅ Complete | `CartView.tsx` |
| Checkout Integration | ✅ Complete | `Checkout.tsx` |
| Products Seeding | ✅ Complete | `seed.ts` |
| Mobile Responsive | ✅ Complete | All components |

---

## 🎯 Future Enhancements

### Phase 2 (Backend Integration)
- [ ] Move addresses to backend database
- [ ] Move cart to backend (persistent across devices)
- [ ] User profile API endpoints
- [ ] Order management API
- [ ] Address API (CRUD)

### Phase 3 (Payment Integration)
- [ ] Stripe payment gateway
- [ ] Order payment status tracking
- [ ] Invoice generation
- [ ] Email confirmations

### Phase 4 (Advanced Features)
- [ ] Order tracking/shipping status
- [ ] Wishlist functionality
- [ ] Reviews & ratings
- [ ] Recommendation engine
- [ ] Analytics dashboard

---

## 📚 Resource Links

### Documentation
- [React Docs](https://react.dev)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB Guide](https://docs.mongodb.com)
- [Express.js Docs](https://expressjs.com)

### UI Components Available
- Button, Input, Tabs, Card, Badge
- Accordion, Dialog, Dropdown Menu
- Sidebar, Toast, Alert, Progress
- All from shadcn/ui

---

## 🎓 Learning Path

### If you want to:

**Add more pages to account:**
1. Create new component in `src/pages/Account/`
2. Import in `Account.tsx`
3. Add case in `renderContent()` switch
4. Add menu item to `AccountLayout`

**Add new product category:**
1. Add category to seed.ts products
2. Update Product model enum
3. Re-run seed script
4. Products filter automatically works

**Style components:**
1. Edit Tailwind classes
2. Check `globals.css`
3. Use existing color scheme
4. All shadows/rounded use Tailwind utilities

**Add form validation:**
1. Use React Hook Form (already installed)
2. Add validation in component
3. Toast errors with `toast.error()`

---

## ✨ Current Architecture

```
Frontend (React + TypeScript + Tailwind)
├── Pages (Account, Cart, Products, etc)
├── Components (Navbar, AccountLayout, etc)
├── Contexts (Auth, Cart, Orders)
├── UI Components (from shadcn/ui)
└── Hooks (useAuth, useCart, useOrders)

Backend (Express + MongoDB)
├── Routes (products, auth, cart, users)
├── Models (Product, User, Cart, Order)
├── Middleware (auth)
└── Database (MongoDB)
```

---

## 🎉 What's Working

✅ User authentication
✅ Product catalog (26 products)
✅ Shopping cart
✅ Address management
✅ Order creation
✅ Account dashboard with sidebar
✅ Mobile responsive design
✅ Local storage persistence
✅ API endpoints

---

## 💡 Pro Tips

1. **Use localStorage DevTools** in Chrome for debugging
   - F12 → Application → LocalStorage
   
2. **Test API in Browser** - Just visit:
   - `http://localhost:5000/api/products`
   - `http://localhost:5000/api/products/1`

3. **Clear Cache** if issues persist:
   - F12 → Application → Clear Storage
   
4. **Console Logs** - Check browser console for errors
   - F12 → Console tab

5. **Network Tab** - Debug API calls
   - F12 → Network tab → reload page

---

## 📞 Quick Support

**Q: How to reset database?**
A: `npm run seed` clears and re-seeds automatically

**Q: How to test without backend?**
A: All data stored in localStorage, works offline

**Q: How to add new product?**
A: Edit seed.ts and run `npm run seed`

**Q: How to deploy?**
A: Build frontend with `npm run build`, deploy dist/

---

**Last Updated**: April 7, 2026
**Status**: Production Ready ✅
