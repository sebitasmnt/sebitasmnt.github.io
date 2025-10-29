// Lógica pura extraída de src/pages/Contacto.jsx
(function(){
  window.ContactoLogic = window.ContactoLogic || {}

  // Valida el formulario de contacto básico
  window.ContactoLogic.validateContactForm = function(formData){
    if(!formData) return { valid:false, message: 'Datos vacíos' }
    if(!formData.nombre) return { valid:false, message: 'Nombre requerido' }
    if(!formData.email) return { valid:false, message: 'Email requerido' }
    if(!formData.mensaje) return { valid:false, message: 'Mensaje requerido' }
    return { valid:true }
  }

  // Simula envío (pura transformación que devolvería el payload)
  window.ContactoLogic.prepareSubmission = function(formData){
    var v = window.ContactoLogic.validateContactForm(formData)
    if(!v.valid) return { success:false, message: v.message }
    return { success:true, payload: { nombre: formData.nombre, email: formData.email, mensaje: formData.mensaje } }
  }

})();
