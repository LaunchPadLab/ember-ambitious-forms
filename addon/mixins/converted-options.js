import Ember from 'ember'

export const ConvertedOption = Ember.Object.extend({
  source: null,

  value: null,
  classNames: Ember.computed('value', function () {
    let dashValue = Ember.String.dasherize(this.get('value').toString())
    return `amb-form-option-${dashValue}`
  }),
  text: Ember.computed('value', function () {
    return '' + this.get('value')
  }),
  isSelected: Ember.computed('value', 'source.value', function () {
    return this.get('value') === this.get('source.value')
  })
})

export function convert (source, rawOption) {
  let option = ConvertedOption.create({ source })
  if (Ember.isArray(rawOption)) {
    let [value, text, description] = rawOption
    option.setProperties({ value, text, description })
  } else if (rawOption.hasOwnProperty('value')) {
    option.setProperties(rawOption)
  } else {
    option.set('value', rawOption)
  }
  return option
}

export default Ember.Mixin.create({
  convertedOptions: Ember.computed('options.[]', function () {
    let options = this.get('options')
    if (options) {
      return options.map((option) => convert(this, option))
    }
  })
})
