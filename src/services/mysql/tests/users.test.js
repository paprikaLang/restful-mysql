import test from 'ava'

const { connection, errorHandler } = require('./setup')

const users = require('../users')({ connection, errorHandler })

const create = () => users.save('user@test.com','123456')

test.beforeEach(t => connection.query('TRUNCATE TABLE users'))
test.after.always(t => connection.query('TRUNCATE TABLE users'))

test('list', async t => {
	await create()
	await create()
	await create()
	const list = await users.all()
	t.is(list.users.length, 2)
	
})

test('save', async t => {
    const result = await create()
    t.is(result.user.email,'user@test.com')
   

})

test('update', async t => {
	await create()

	const updated = await users.update(1,'222222')
	t.is(updated.affectedRows, 1)
})

test('remove', async t => {

	await create()

	const removed = await users.delete(1)
	t.is(removed.affectedRows, 1)
})