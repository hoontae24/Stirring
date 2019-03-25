export const mixins = {
  methods: {
    validateName(name) {
      const re = /^[A-Za-z0-9_-]{2,20}$/
      if (re.test(name.value)) {
        name.valid = true
        name.helper = 'welcome'
        name.error = null
        return
      }
      name.valid = false
      name.helper = null
      name.error =
        'nameInvalid'
    },
    validateEmail(email) {
      // at least 'xx@y.zz'
      // eslint-disable-next-line
      const re = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
      if (email.value.length < 255 && re.test(email.value)) {
        email.valid = true
        email.helper = 'emailValid'
        email.error = null
        return
      }
      email.valid = false
      email.helper = null
      email.error = 'emailInvalid'
    },
    validatePassword(password) {
      if (password.confirm !== password.value && password.confirm !== "oldPassword") {
        password.valid = false
        password.helper = null
        password.error = 'passwordNotMatched'
        return
      }
      // at least one number, one lowercase and one uppercase letter
      // at least six characters that are letters, numbers or the underscore
      // const re = /([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~,-])|([!,@,#,$,%,^,&,*,?,_,~,-].*[a-zA-Z0-9])/
      const re = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,20}$/
      if (re.test(password.value)) {
        password.valid = true
        password.helper = 'passwordValid'
        password.error = null
        return
      }
      password.valid = false
      password.helper = null
      password.error =
        'passwordInValid'
    }
  }
}
