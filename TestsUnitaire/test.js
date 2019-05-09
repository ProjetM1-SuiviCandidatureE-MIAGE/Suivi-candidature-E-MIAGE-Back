var assert = require('chai').assert;
var should = require('chai').should();


describe('test du renvoi des candidatures avec la fonction getAllCandidatures',function(){
  it('doit renvoyer des candidatures',function(){
    console.log(fetch("http://localhost:3010/candidatures/getAllCanidatures"));
     assert.equal(fetch("http://localhost:3010/candidatures/getAllCanidatures"), !null)
  })
})


/*describe('Tests for todo.app', function() {
  describe('the trimTodoName function', function() {
    it('should remove leading whitespace', function() {
      todo.util.trimTodoName('   name').should.equal('name');
    });
    it('should remove trailing whitespace', function() {
      todo.util.trimTodoName('name   ').should.have.length(4);
    });
    it('should remove leading and trailing whitespace', function() {
      assert(todo.util.trimTodoName('  name  '), 'name');
    });
  })}*/