/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// import { shallowMount } from '@vue/test-utils';
import Login from '@/views/Login.vue'

jest.mock('@/firebase/providers')

describe('Login.vue', () => {
  it('has a created hook', () => {
    expect(typeof Login.methods.authWithGoogle).toBe('function')
  })
})
