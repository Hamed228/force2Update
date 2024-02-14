var W = Object.defineProperty
var F = (r, t, e) =>
  t in r
    ? W(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (r[t] = e)
var s = (r, t, e) => (F(r, typeof t != 'symbol' ? t + '' : t, e), e),
  R = (r, t, e) => {
    if (!t.has(r)) throw TypeError('Cannot ' + e)
  }
var i = (r, t, e) => (
    R(r, t, 'read from private field'), e ? e.call(r) : t.get(r)
  ),
  o = (r, t, e) => {
    if (t.has(r))
      throw TypeError('Cannot add the same private member more than once')
    t instanceof WeakSet ? t.add(r) : t.set(r, e)
  },
  l = (r, t, e, n) => (
    R(r, t, 'write to private field'), n ? n.call(r, e) : t.set(r, e), e
  )
var q = (r, t, e) => (R(r, t, 'access private method'), e)
var y, b, P, S
class Z {
  constructor(t) {
    o(this, y, void 0)
    s(this, 'validation', () => !0)
    s(this, 'initialize', () => {
      i(this, y).inputElement.addEventListener('keydown', i(this, b))
    })
    s(this, 'dispose', () => {
      i(this, y).inputElement.removeEventListener('keydown', i(this, b))
    })
    s(this, 'onArrowDown')
    s(this, 'onArrowUp')
    s(this, 'onGotoNextEditableControl')
    s(this, 'onGotoNextControl')
    s(this, 'onGotoPreviousEditableControl')
    s(this, 'onGotoPreviousControl')
    o(this, b, (t) => {
      t.isTrusted &&
        (!t.altKey && !t.ctrlKey && !t.shiftKey && !t.metaKey
          ? i(this, P).call(this, t)
          : t.shiftKey &&
            !t.altKey &&
            !t.ctrlKey &&
            !t.metaKey &&
            i(this, S).call(this, t))
    })
    o(this, P, (t) => {
      this.onGotoNextEditableControl && t.key === 'Enter' && this.validation()
        ? (t.preventDefault(),
          t.stopPropagation(),
          this.onGotoNextEditableControl())
        : this.onGotoNextControl && t.key === 'Tab'
        ? (t.preventDefault(), t.stopPropagation(), this.onGotoNextControl())
        : this.onArrowDown && (t.key === 'Down' || t.key === 'ArrowDown')
        ? (t.preventDefault(), t.stopPropagation(), this.onArrowDown())
        : this.onArrowUp &&
          (t.key === 'Up' || t.key === 'ArrowUp') &&
          (t.preventDefault(), t.stopPropagation(), this.onArrowUp())
    })
    o(this, S, (t) => {
      this.onGotoPreviousEditableControl && t.key === 'Enter'
        ? (t.preventDefault(),
          t.stopPropagation(),
          this.onGotoPreviousEditableControl())
        : this.onGotoPreviousControl &&
          t.key === 'Tab' &&
          (t.preventDefault(),
          t.stopPropagation(),
          this.onGotoPreviousControl())
    })
    l(this, y, t)
  }
}
;(y = new WeakMap()),
  (b = new WeakMap()),
  (P = new WeakMap()),
  (S = new WeakMap())
class $ {
  constructor() {
    s(this, 'nextValidator')
    s(this, 'isValidMain', (t) => {
      const e = this.isValid(t)
      return e === null && this.nextValidator != null
        ? this.nextValidator.isValidMain(t)
        : e
    })
  }
  setNextValidator(t) {
    this.nextValidator = t
  }
  requiredValidate(t) {
    return (
      typeof t == 'object' &&
      typeof t.required == 'boolean' &&
      t.required === !0
    )
  }
  minLengthValidate(t) {
    return (
      typeof t == 'object' && typeof t.minLength == 'number' && t.minLength > -1
    )
  }
  minLengthIsValid(t, e) {
    const n = t == null ? void 0 : t.toString()
    return typeof n == 'string' && n.length >= e
  }
  maxLengthValidate(t) {
    return (
      typeof t == 'object' && typeof t.maxLength == 'number' && t.maxLength > -1
    )
  }
  maxLengthIsValid(t, e) {
    const n = t == null ? void 0 : t.toString()
    return typeof n == 'string' && n.length <= e
  }
  minValueValidate(t) {
    return (
      typeof t == 'object' && typeof t.minValue == 'number' && t.minValue > -1
    )
  }
  minValueIsValid(t, e) {
    return t >= e
  }
  maxValueValidate(t) {
    return (
      typeof t == 'object' && typeof t.maxValue == 'number' && t.maxValue > -1
    )
  }
  maxValueIsValid(t, e) {
    return t <= e
  }
}
class J extends $ {
  constructor() {
    super(...arguments)
    s(this, 'isValid', (e) =>
      this.requiredValidate(e.configuration) &&
      (e.amisaValue === null || e.amisaValue === void 0 || e.amisaValue == 0)
        ? e.configuration.validationText === 'string'
          ? `${e.configuration.validationText} is required!!`
          : 'required value!!'
        : null
    )
  }
}
class O extends $ {
  constructor() {
    super(...arguments)
    s(this, 'isValid', (e) => {
      const n = e.configuration
      return this.minLengthValidate(n) &&
        !this.minLengthIsValid(e.amisaValue, n.minLength)
        ? typeof n.validationText == 'string'
          ? `min ${n.validationText} Length at least: '${n.minLength}'!!`
          : `min length at least '${n.minLength}'!!`
        : null
    })
  }
}
class Q extends $ {
  constructor() {
    super(...arguments)
    s(this, 'isValid', (e) => {
      const n = e.configuration
      return this.maxLengthValidate(n) &&
        !this.maxLengthIsValid(e.amisaValue, n.maxLength)
        ? typeof n.validationText == 'string'
          ? `max ${n.validationText} Length at most: '${n.maxLength}'!!`
          : `max length at most '${n.maxLength}'!!`
        : null
    })
  }
}
class X extends $ {
  constructor() {
    super(...arguments)
    s(this, 'isValid', (e) => {
      const n = e.configuration
      return this.minValueValidate(n) &&
        !this.minValueIsValid(e.amisaValue, n.minValue)
        ? typeof n.validationText == 'string'
          ? `min ${n.validationText} Value at least: '${n.minValue}'!!`
          : `min Value at least '${n.minValue}'!!`
        : null
    })
  }
}
class Y extends $ {
  constructor() {
    super(...arguments)
    s(this, 'isValid', (e) => {
      const n = e.configuration
      return this.maxValueValidate(n) &&
        !this.maxValueIsValid(e.amisaValue, n.maxValue)
        ? typeof n.validationText == 'string'
          ? `max ${n.validationText} Value at most: '${n.maxValue}'!!`
          : `max Value at most '${n.maxValue}'!!`
        : null
    })
  }
}
var x, v
class _ {
  constructor() {
    o(this, x, void 0)
    o(this, v, void 0)
    s(this, 'add', (t) => {
      var e
      return (
        i(this, x)
          ? ((e = i(this, v)) == null || e.setNextValidator(t), l(this, v, t))
          : (l(this, x, t), l(this, v, t)),
        this
      )
    })
    s(this, 'addRequired', () => this.add(new J()))
    s(this, 'addMinLength', () => this.add(new O()))
    s(this, 'addMaxLength', () => this.add(new Q()))
    s(this, 'addMinValue', () => this.add(new X()))
    s(this, 'addMaxValue', () => this.add(new Y()))
    s(this, 'getFirst', () => i(this, x))
  }
}
;(x = new WeakMap()), (v = new WeakMap())
var w
class tt {
  constructor(t) {
    o(this, w, void 0)
    l(this, w, t)
  }
  performValidation(t) {
    const e = new _(),
      n = i(this, w).call(this, e).getFirst()
    return n == null ? void 0 : n.isValidMain(t)
  }
}
w = new WeakMap()
var p, C, d, m, a, c, u, f, V, N, B, H, E, D, g, L, j, G, K, U, z
class et {
  constructor(t, e, n) {
    o(this, B)
    o(this, L)
    o(this, p, null)
    s(this, 'getAmisaValue', () => i(this, p))
    s(this, 'setAmisaValue', (t) => {
      l(this, p, t)
    })
    o(this, C, null)
    s(this, 'getAmisaDefaultValue', () => i(this, C))
    s(this, 'initAmisaValueAsAny', (t) => {
      l(this, C, t), l(this, p, t)
    })
    o(this, d, void 0)
    o(this, m, void 0)
    o(this, a, void 0)
    o(this, c, void 0)
    o(this, u, void 0)
    o(this, f, void 0)
    o(this, V, void 0)
    o(this, N, () => {
      const t = i(this, u).labelText
      t &&
        (l(this, c, document.createElement('label')),
        (i(this, c).id = `${i(this, d)}-label`),
        (i(this, c).innerText = `${t} : `),
        i(this, m).append(i(this, c)))
    })
    o(this, E, (t) => {
      if (i(this, f)) t.preventDefault()
      else {
        const e = t,
          n = e.inputType
        this.onBaseBeforeValueChange(e.data, n) && t.preventDefault()
      }
    })
    o(this, D, (t) => {
      const e = t
      this.onBaseValueChanged(i(this, a).value, this.amisaValue, e.inputType),
        (i(this, a).value = i(this, p) || '')
    })
    s(this, 'dispose', () => {
      var t
      i(this, V).dispose(),
        (t = i(this, c)) == null || t.remove(),
        (i(this, a).autofocus = !1),
        i(this, a).removeEventListener('beforeinput', i(this, E)),
        i(this, a).removeEventListener('input', i(this, D)),
        i(this, a).remove(),
        i(this, m).remove()
    })
    s(this, 'simulateInput', (t) => {
      i(this, a).value = t
      const e = new InputEvent('input', {
        bubbles: !1,
        cancelable: !0,
        inputType: 'testInput'
      })
      this.inputElement.dispatchEvent(e)
    })
    o(this, g, null)
    s(this, 'validate', () => {
      l(this, g, new tt(this.getValidationSteps).performValidation(this)),
        q(this, L, j).call(this)
    })
    o(this, G, () => {
      var h
      ;(h = this.containerDiv.querySelector('#Confirm')) == null || h.remove()
      const t = this.containerDiv.querySelector('#unConfirm')
      t && t.remove()
      const e = document.createElement('span'),
        n = i(this, a).getBoundingClientRect()
      this.containerDiv.appendChild(e),
        (e.innerText = i(this, g)),
        (e.id = 'unConfirm'),
        (e.style.color = '#dc3545'),
        (e.style.position = 'absolute'),
        (e.style.top = n.top + n.height - 10 + 'px'),
        i(this, a).dir === 'ltr'
          ? (e.style.left = n.x + n.width - e.offsetWidth - 5 + 'px')
          : (e.style.left = n.x - 10 + 'px'),
        (e.style.backgroundColor = '#fff')
    })
    o(this, K, () => {
      var h
      ;(h = this.containerDiv.querySelector('#unConfirm')) == null || h.remove()
      const t = this.containerDiv.querySelector('#Confirm')
      t && t.remove()
      const e = document.createElement('span'),
        n = i(this, a).getBoundingClientRect()
      this.containerDiv.appendChild(e),
        (e.id = 'Confirm'),
        (e.innerText = 'Valid'),
        (e.style.position = 'absolute'),
        (e.style.top = n.top + n.height - 10 + 'px'),
        i(this, a).dir === 'ltr'
          ? (e.style.left = n.x + n.width - e.offsetWidth - 5 + 'px')
          : (e.style.left = n.x - 10 + 'px'),
        (e.style.color = '#198754'),
        (e.style.backgroundColor = '#fff')
    })
    o(this, U, (t) => {
      ;(i(this, a).style.borderColor = '#28a745'),
        (i(this, a).style.boxShadow = 'none'),
        (i(
          this,
          a
        ).style.backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e")`),
        (i(this, a).style.backgroundRepeat = 'no-repeat'),
        (i(this, a).style.backgroundPosition = `${
          t === 'ltr' ? 'right' : 'left'
        } calc(0.375em + 0.1875rem) center`),
        (i(this, a).style.backgroundSize =
          'calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)')
    })
    o(this, z, (t) => {
      ;(i(this, a).style.borderColor = '#dc3545'),
        (i(this, a).style.boxShadow = 'none'),
        (i(
          this,
          a
        ).style.backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e")`),
        (i(this, a).style.backgroundRepeat = 'no-repeat'),
        (i(this, a).style.backgroundPosition = `${
          t === 'ltr' ? 'right' : 'left'
        } calc(0.375em + 0.1875rem) center`),
        (i(this, a).style.backgroundSize =
          'calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)')
    })
    if (t) l(this, d, t)
    else
      throw (
        (l(this, d, 'randomId'),
        new Error('Can not set id as null or empty or undefined!!!'))
      )
    l(this, f, !1),
      l(this, u, n),
      e(i(this, u)),
      l(this, m, document.createElement('div')),
      (i(this, m).id = `${i(this, d)}-container`),
      l(this, a, document.createElement('input')),
      l(this, V, new Z(this)),
      q(this, B, H).call(this),
      i(this, N).call(this)
  }
  get any() {
    return this
  }
  get id() {
    return i(this, d)
  }
  get containerDiv() {
    return i(this, m)
  }
  get inputElement() {
    return i(this, a)
  }
  get labelElement() {
    return i(this, c)
  }
  get amisaConfiguration() {
    return i(this, u)
  }
  get readonly() {
    return i(this, f)
  }
  set readonly(t) {
    l(this, f, t)
  }
  get keydownManager() {
    return i(this, V)
  }
  get lastError() {
    return i(this, g)
  }
  set lastError(t) {
    l(this, g, t), q(this, L, j).call(this)
  }
  get hasError() {
    return typeof i(this, g) == 'string' && i(this, g).length > 0
  }
}
;(p = new WeakMap()),
  (C = new WeakMap()),
  (d = new WeakMap()),
  (m = new WeakMap()),
  (a = new WeakMap()),
  (c = new WeakMap()),
  (u = new WeakMap()),
  (f = new WeakMap()),
  (V = new WeakMap()),
  (N = new WeakMap()),
  (B = new WeakSet()),
  (H = function () {
    ;(i(this, a).id = `${i(this, d)}-input`),
      (i(this, a).type = 'text'),
      i(this, u).placeHolder &&
        (this.inputElement.placeholder = i(this, u).placeHolder),
      i(this, u).inputDir
        ? (i(this, a).dir = i(this, u).inputDir)
        : (i(this, a).dir = 'rtl'),
      typeof i(this, u).required == 'boolean' && (i(this, a).required = !0),
      i(this, a).addEventListener('beforeinput', i(this, E)),
      i(this, a).addEventListener('input', i(this, D)),
      i(this, V).initialize(),
      i(this, m).append(this.inputElement)
  }),
  (E = new WeakMap()),
  (D = new WeakMap()),
  (g = new WeakMap()),
  (L = new WeakSet()),
  (j = function () {
    i(this, a).removeAttribute('style'),
      this.hasError
        ? (i(this, z).call(this, i(this, a).dir), i(this, G).call(this))
        : (i(this, U).call(this, i(this, a).dir), i(this, K).call(this))
  }),
  (G = new WeakMap()),
  (K = new WeakMap()),
  (U = new WeakMap()),
  (z = new WeakMap())
class it extends et {
  // #style: HTMLStyleElement;
  constructor(e, n, h) {
    super(e, n, new h())
    s(this, 'gotoNexControl', () => {})
    s(this, 'gotoPreviousControl', () => {})
    s(this, 'initAmisaValue', (e) => {
      this.initAmisaValueAsAny(e)
    })
    s(
      this,
      'onBaseBeforeValueChange',
      (e, n) => !!this.onBeforeValueChange(e, n)
    )
    s(this, 'onBaseValueChanged', (e, n, h) => {
      this.setAmisaValue(e), this.validate(), this.onValueChanged(e, n, h)
    })
    this.configuration.inputDir || (this.configuration.inputDir = 'ltr')
  }
  get amisaValue() {
    return this.getAmisaValue()
  }
  get amisaDefaultValue() {
    return this.getAmisaDefaultValue()
  }
  get configuration() {
    return this.amisaConfiguration
  }
  setDefaultValueAsAny(e) {
    this.setDefaultValue(e)
  }
}
var A, T, k, M, I
class nt {
  constructor() {
    o(this, A, void 0)
    o(this, T, void 0)
    o(this, k, void 0)
    o(this, M, void 0)
    o(this, I, void 0)
  }
  get any() {
    return this
  }
  get validationText() {
    return i(this, A)
  }
  set validationText(t) {
    l(this, A, t)
  }
  get inputDir() {
    return i(this, T)
  }
  set inputDir(t) {
    l(this, T, t)
  }
  get labelText() {
    return i(this, k)
  }
  set labelText(t) {
    l(this, k, t)
  }
  get placeHolder() {
    return i(this, M)
  }
  set placeHolder(t) {
    l(this, M, t)
  }
  get required() {
    return i(this, I)
  }
  set required(t) {
    l(this, I, t)
  }
}
;(A = new WeakMap()),
  (T = new WeakMap()),
  (k = new WeakMap()),
  (M = new WeakMap()),
  (I = new WeakMap())
class st extends nt {
  constructor() {
    super(...arguments)
    s(this, 'onUserNameChanged')
  }
}
class rt extends it {
  constructor(e, n) {
    super(e, n, st)
    s(this, 'onValidateInput', (e) =>
      e ? /^[a-zA-Z]+[a-zA-Z0-9@.]*$/.test(e) : !0
    )
    s(this, 'setDefaultValue', (e) => {
      ;(this.inputElement.value = e || ''), this.initAmisaValue(e)
    })
    s(this, 'getValidationSteps', (e) => e)
    this.configuration.inputDir &&
      (this.inputElement.dir = this.configuration.inputDir),
      (this.inputElement.inputMode = 'email')
  }
  get userName() {
    return this.amisaValue
  }
  onBeforeValueChange(e, n) {
    return !this.onValidateInput(e)
  }
  onValueChanged(e, n, h) {
    this.configuration.onUserNameChanged &&
      this.configuration.onUserNameChanged(n, this.amisaValue)
  }
}
export { rt as UserNameBox, st as UserNameBoxConfig }
