import { splitStringFromMessages } from './ProfileEditable'

const string = 'Louis Display name updated'
const message = ' Display name updated'

test('split provided username from err-/success messages', () => {
    expect(splitStringFromMessages(string, message))
        .toBe('Louis')
});

const stringButLonger = `Louis Andrew Sutopo${message}`

test('exact same test as above, but with longer string', () => {
    expect(splitStringFromMessages( stringButLonger, message ))
        .toBe('Louis Andrew Sutopo')
})
