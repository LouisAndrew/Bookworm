import { setQuery } from './useFetchVolume'

const querySample = 'Harry Potter'

test('transform the query into what i wont', () => {
    expect(setQuery(querySample)).toBe('HARRY_POTTER')
})