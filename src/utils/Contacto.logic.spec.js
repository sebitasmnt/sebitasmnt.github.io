/* Tests para ContactoLogic */
describe('ContactoLogic (Prueba)', function(){
  describe('validateContactForm (Prueba)', function(){
    it('valid cuando all fields present', function(){
      var res = window.ContactoLogic.validateContactForm({ nombre:'A', email:'a@b', mensaje:'hola' })
      expect(res.valid).toBe(true)
    })

    it('inválido cuando falta nombre', function(){
      var res = window.ContactoLogic.validateContactForm({ email:'a', mensaje:'b' })
      expect(res.valid).toBe(false)
    })

    it('inválido cuando null', function(){
      var res = window.ContactoLogic.validateContactForm(null)
      expect(res.valid).toBe(false)
    })
  })

  describe('prepareSubmission (Prueba)', function(){
    it('devuelve payload cuando valid', function(){
      var res = window.ContactoLogic.prepareSubmission({ nombre:'A', email:'a@b', mensaje:'x' })
      expect(res.success).toBe(true)
      expect(res.payload.nombre).toBe('A')
    })

    it('devuelve error cuando inválido', function(){
      var res = window.ContactoLogic.prepareSubmission({ nombre:'', email:'', mensaje:'' })
      expect(res.success).toBe(false)
    })

    it('maneja falta input', function(){
      var res = window.ContactoLogic.prepareSubmission(null)
      expect(res.success).toBe(false)
    })
  })
})
