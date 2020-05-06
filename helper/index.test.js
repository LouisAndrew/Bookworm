import { setQueryToUppercase, createUniqueId } from './index'

const querySample = 'Harry Potter'

test('transform the query into what i wont', () => {
    expect(setQueryToUppercase(querySample)).toBe('HARRY_POTTER')
})

expect.extend({
    uniqueIdChanged: uniqueId => {

        if ( uniqueId === 'abcdefghijk' ) {
            
            return {
                message: () => 'unique ID is not changed',
                pass: false
            }
        } else {
            
            return {
                message: () => `unique ID changed successfully, unique id is: ${uniqueId}`,
                pass: true
            }
        }
    }
})

test('Testing when uniqueId is already available in inside the firestore database', () => {
    expect(createUniqueRevId('abcdefghjk'))
        .not.toBe('abcdefghjk')
})