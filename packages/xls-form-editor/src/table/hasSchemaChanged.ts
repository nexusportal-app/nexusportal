import {Api} from '@infoportal/api-sdk'

const eqObjectShallow = (a: any, b: any): boolean => {
  if (a === b) return true
  if (!a || !b) return false

  const ak = Object.keys(a)
  const bk = Object.keys(b)
  if (ak.length !== bk.length) return false

  for (let i = 0; i < ak.length; i++) {
    console.log(i)
    const k = ak[i]
    if (a[k] !== b[k]) return false
  }
  return true
}

const eqArrayShallowObjects = (a?: any[], b?: any[]): boolean => {
  if (a === b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false

  for (let i = 0; i < a.length; i++) {
    if (!eqObjectShallow(a[i], b[i])) return false
  }
  return true
}

export const hasSchemaChanged = (value?: Api.Form.Schema, schema?: Api.Form.Schema): boolean => {
  if (!value || !schema) return true
  if (!eqArrayShallowObjects(value.survey, schema.survey)) {
    console.log('survey')
    return true
  }
  if (!eqArrayShallowObjects(value.choices, schema.choices)) {
    console.log('choices')
    return true
  }
  if (!eqArrayShallowObjects(value.translations, schema.translations)) {
    console.log('translations')
    return true
  }
  return false
}
