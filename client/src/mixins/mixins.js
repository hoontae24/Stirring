export const mixins = {
  methods: {
    validateName(name) {
      const re = /^[A-Za-z0-9_-]{2,20}$/
      if (re.test(name.value)) {
        name.valid = true
        name.helper = 'Welcome!'
        name.error = null
        return
      }
      name.valid = false
      name.helper = null
      name.error =
        'At 2 ~ 20 characters using letter, number, - , _ with no blank and other symbols.'
    },
    validateEmail(email) {
      // at least 'xx@y.zz'
      const re = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
      if (email.value.length < 255 && re.test(email.value)) {
        email.valid = true
        email.helper = 'This email is available.'
        email.error = null
        return
      }
      email.valid = false
      email.helper = null
      email.error = 'This email is NOT available.'
    },
    validatePassword(password) {
      if (password.confirm !== password.value) {
        password.valid = false
        password.helper = null
        password.error = 'Passwords is not matched.'
        return
      }
      // at least one number, one lowercase and one uppercase letter
      // at least six characters that are letters, numbers or the underscore
      // const re = /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~,-])|([!,@,#,$,%,^,&,*,?,_,~,-].*[a-zA-Z0-9])/
      const re = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,20}$/
      if (re.test(password.value)) {
        password.valid = true
        password.helper = 'This password is available.'
        password.error = null
        return
      }
      password.valid = false
      password.helper = null
      password.error =
        'At 6 ~ 20 chars incl. one number, one lowercase and one uppercase letter'
    }
  }
}
