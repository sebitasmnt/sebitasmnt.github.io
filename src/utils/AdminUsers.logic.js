// Lógica pura extraída de src/pages/AdminUsers.jsx
(function(){
  window.AdminUsersLogic = window.AdminUsersLogic || {}

  window.AdminUsersLogic.getStatusClass = function(status){
    switch(status){
      case 'shipped': return 'status-shipped'
      case 'pending': return 'status-pending'
      case 'cancelled': return 'status-cancelled'
      default: return ''
    }
  }

  window.AdminUsersLogic.getStatusText = function(status){
    switch(status){
      case 'shipped': return 'Shipped'
      case 'pending': return 'Pending'
      case 'cancelled': return 'Cancelled'
      default: return status
    }
  }

  window.AdminUsersLogic.paginate = function(items, page, itemsPerPage){
    page = Number(page) || 1
    itemsPerPage = Number(itemsPerPage) || 5
    var start = (page - 1) * itemsPerPage
    return (items || []).slice(start, start + itemsPerPage)
  }

  window.AdminUsersLogic.filterUsers = function(users, searchTerm){
    var s = (searchTerm || '').toLowerCase()
    return (users || []).filter(function(user){
      return (user.cliente && user.cliente.toLowerCase().indexOf(s) !== -1) || (user.numeroOrden && user.numeroOrden.toLowerCase().indexOf(s) !== -1)
    })
  }

})();
