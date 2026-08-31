import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Component, type ReactNode } from 'react'
import { Layout } from '@/components/layout'
import { AdminLayout } from '@/components/admin-layout'
import { ProtectedRoute } from '@/components/protected-route'
import { ToastProvider } from '@/components/toast'
import { HomePage } from '@/pages/home'
import { ProductsPage } from '@/pages/products'
import { ProductDetailPage } from '@/pages/product-detail'
import { CartPage } from '@/pages/cart'
import { AboutPage } from '@/pages/about'
import { ContactPage } from '@/pages/contact'
import { AdminLoginPage } from '@/pages/admin/login'
import { AdminDashboard } from '@/pages/admin/dashboard'
import { AdminProductsPage } from '@/pages/admin/products'
import { AdminOrdersPage } from '@/pages/admin/orders'

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-muted">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-primary">Something went wrong</h1>
            <p className="text-muted-foreground">Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProductsPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  )
}

export default App
