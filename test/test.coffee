chai = require 'chai'
do chai.should
assert = chai.assert
describe('#indexOf()', ->
    it('should return -1 when the value is not present', ->
        assert.equal(-1, [1,2,3].indexOf(5))
        assert.equal(-1, [1,2,3].indexOf(0))
    )
)