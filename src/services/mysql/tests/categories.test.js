import test from 'ava'

const { connection, errorHandler } = require('./setup')

const categories = require('../categories')({ connection, errorHandler })

const create = () => categories.save('category-test')

test.beforeEach(t => connection.query('TRUNCATE TABLE categories'))
test.after.always(t => connection.query('TRUNCATE TABLE categories'))

test('save', async t => {
    const result = await create()
    t.is(result.category.name,'category-test')

})

test('update', async t => {
	await create()

	const updated = await categories.update(1,'category-test-updated')
	t.is(updated.category.name,'category-test-updated')
	t.is(updated.affectedRows, 1)
})

test('remove', async t => {

	await create()

	const removed = await categories.delete(1)
	t.is(removed.affectedRows, 1)
})