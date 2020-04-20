import { setQueryToUppercase } from './index'

const querySample = 'Harry Potter'

test('transform the query into what i wont', () => {
    expect(setQueryToUppercase(querySample)).toBe('HARRY_POTTER')
})