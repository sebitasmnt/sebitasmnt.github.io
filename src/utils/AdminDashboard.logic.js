// Lógica pura extraída de src/pages/AdminDashboard.jsx
(function(){
  window.AdminDashboardLogic = window.AdminDashboardLogic || {}

  window.AdminDashboardLogic.getQuickLinks = function(){
    return [
      { path: '/admin/new-user', label: 'Nuevo Usuario' },
      { path: '/admin/new-product', label: 'Nuevo Producto' },
      { path: '/admin/users', label: 'Gestionar Usuarios' }
    ]
  }

})();
