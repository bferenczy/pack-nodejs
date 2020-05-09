var expect = require('chai').expect;
var getPackMW = require('../../../../middleware/post/getPostMW');

describe('getPost middleware', function(){


  it('should set res.locals.post with a post object from db', function(done) {
      const mw = getPackMW({
        PostModel: {
          findOne: (p1, cb) => {
            expect(p1).to.be.eql({_id: '2'});
            cb(null, 'mockpost');
          }
        }
      });

      const resMock={
        locals: {}
      };

      mw(
        //request
      {
        body: {
          postid: '2'
        }
      },
      //response
      resMock,
      (err)=>{
        expect(err).to.be.eql(undefined);
        expect(resMock.locals).to.be.eql({post: 'mockpost'});
        done();
      });
  });

  it('should call next with error when there is a db problem', function(done) {
      const mw = getPackMW({
        PostModel: {
          findOne: (p1, cb) => {
            expect(p1).to.be.eql({_id: '2'});
            cb('database_error', null);
          }
        }
      });

      const resMock={
        locals: {}
      };

      mw(
        //request
      {
        body: {
          postid: '2'
        }
      },
      //response
      resMock,
      (err)=>{
        expect(err).to.be.eql('database_error');
        done();
      });
  });

  it('should call next when no post found', function(done) {
      const mw = getPackMW({
        PostModel: {
          findOne: (p1, cb) => {
            expect(p1).to.be.eql({_id: '2'});
            cb(undefined, null);
          }
        }
      });

      const resMock={
        locals: {}
      };

      mw(
        //request
      {
        body: {
          postid: '2'
        }
      },
      //response
      resMock,
      (err)=>{
        expect(err).to.be.eql(undefined);
        expect(resMock.locals).to.be.eql({});
        done();
      });
  });

});
