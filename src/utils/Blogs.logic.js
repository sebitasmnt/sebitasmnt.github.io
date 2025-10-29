// Lógica pura extraída de src/pages/Blogs.jsx
(function(){
  window.BlogsLogic = window.BlogsLogic || {}

  // Devuelve posts estáticos (copiado del componente)
  window.BlogsLogic.getPosts = function(){
    return [
      { title: 'Torneo de Smash Bros Ultimate', excerpt: 'Únete a nuestro torneo mensual...' },
      { title: 'Nuevos Productos Gaming', excerpt: 'Descubre los últimos lanzamientos...' }
    ]
  }

})();
