var expect = require('chai').expect;
var getCommentsMW = require('../../../../middleware/comment-reply/getCommentsMW');

describe('getComments middleware', function(){

  it('should set res.locals.comments with comments from db', function(done) {
      const mw = getCommentsMW({
        CommentModel: {
          find: (p1, cb) => {
            expect(p1).to.be.eql({post: { '$in': [ 1, 2 ] }});
            cb(null, 'mockcomments');
          }
        }
      });

      const resMock={
        locals: {}
      };

      const reqMock={
        locals: {
          postids: [1,2]
        }
      };

      mw(
        //request
      reqMock,
      //response
      resMock,
      (err)=>{
        expect(err).to.be.eql(undefined);
        expect(resMock.locals).to.be.eql({comments: 'mockcomments'});
        done();
      });
  });


  it('should call next with error when there is a db problem', function(done) {
      const mw = getCommentsMW({
        CommentModel: {
          find: (p1, cb) => {
            expect(p1).to.be.eql({post: { '$in': [ 1, 2 ] }});
            cb('database_error', null);
          }
        }
      });

      const resMock={
        locals: {}
      };

      const reqMock={
        locals: {
          postids: [1,2]
        }
      };

      mw(
        //request
      reqMock,
      //response
      resMock,
      (err)=>{
        expect(err).to.be.eql('database_error');
        expect(resMock.locals).to.be.eql({});
        done();
      });
  });


});
