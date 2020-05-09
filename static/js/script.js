/*
-------TOC------

--- Init

--- Feed related
Showing writer on replies
Deleting post
Like button bubbling disable
Mobile sidebar toggle
Liking
Posting with enter key
Posting with click
Posting mechanism
Comment writing
Reply writing
Edit post
Posting edit

--- Pack settings
Icon selection
Newly added removal
Add to Invite
Remove member
*/
$(document).ready(function() {

  //$('div.card, article.post').attr('data-aos', 'fade-up');
  AOS.init();
  const USERNAME="Balint420";

  // SHOWING WRITER ON REPLIES
  $(document).on('click', 'a#show-replies, div.comment', function() {
    if ($(this).attr('data-comment-id') != 0) {
      event.preventDefault();
      let post = $(this).attr("data-post-id");
      let comment_id = $(this).attr("data-comment-id");

      let found = $('div.comment-reply[data-reply-id="0"][data-post-id="' + post + '"][data-comment-id="' + comment_id + '"]');

      if (found.length > 0) {
        $('div.comment-reply[data-reply-id="0"][data-post-id="' + post + '"][data-comment-id="' + comment_id + '"]').remove();
      } else {
        let writer = '<div class="comment-reply" data-post-id="' + post + '" data-comment-id="' + comment_id + '" data-reply-id="0"><div class="comment-header"><small>Replying to ' + $(this).find('p.username').html() +
          '...</small></div><textarea class="form-control comment-reply-ta" id="reply" placeholder="Write your reply here." required></textarea></div>'
        $(writer).insertAfter(this);

      }

      $('div.comment-reply[data-comment-id=' + comment_id + '][data-post-id=' + post + ']').toggle();
      return false;
    }
  });
  // END OF SHOWING WRITER ON REPLIES

  // DELETING POST
  $(document).on("click", 'a#delete-post', function() {
    event.preventDefault();
    var $div = $(this).parents('article.post').eq(0).fadeOut();
    deletePost($(this).parents('article.post').eq(0).attr('data-post-id'));
    return false;
  });
  // END OF DELETING POST


  // LIKE BUTTON BUBBLING DISABLE
  $(document).on("click", 'button.likes', function() {
    event.preventDefault();
    return false;
  });
  // END OF LIKE BUTTON BUBBLING DISABLE


  // MOBILE SIDEBAR TOGGLE
  $(document).on("click", 'i.menu-icon, i.close-menu', function() {
    event.preventDefault();
    $('div.sidebar').toggle();
    return false;
  });
  // END OF MOBILE SIDEBAR TOGGLE

  // LIKING
  $(document).on("click", 'i.like', function() {
    event.preventDefault();
    let postid = $(this).parents('article.post').eq(0).attr('data-post-id');
    let add = false;
    if($(this).hasClass("like-on")){
      add = true;
      $(this).removeClass("like-on");
      $(this).addClass("like-off");
    } else {
        $(this).addClass("like-on");
        $(this).removeClass("like-off");
    }
    likePost(postid, add);
    return false;
  });
  // END OF LIKING


  // POSTING WITH ENTER KEY
  $(document).on("keypress", 'textarea.send-post', function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      sendPost(this);
      $(this).val('');
    }
  });
  // END OFPOSTING WITH ENTER KEY

  // POSTING WITH CLICK
  $(document).on("click", 'i.send-post', function(event) {
      event.preventDefault();
      sendPost(this);
      $(this).val('');
  });
  // END OF POSTING WITH CLICK

  // POSTING MECHANISM

  // END OF POSTING MECHANISM


  // COMMENT WRITING
  $(document).on("keypress", 'textarea.post-comment', function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      let id = $(this).parents('div.comment.comment-write').eq(0).attr("data-post-id");
      let dt = new Date();
      let time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

      console.log(id);
      makeComment(id, $(this).val());


    }
  });
  // END OF COMMENT WRITING


  // REPLY WRITING
  $(document).on("keypress", 'textarea.comment-reply-ta', function(event) {
    if (event.keyCode == 13) {

      event.preventDefault();
      let post_id = $(this).parent('div.comment-reply').attr("data-post-id");

      let comment_id = $(this).parent('div.comment-reply').attr("data-comment-id");

      sendReply(comment_id, $(this).val());

    }
  });
  // END OF REPLY WRITING

  //EDIT POST
  $(document).on("click", 'a.edit', function(event) {
    event.preventDefault();
      let prev_p = $(this).parents("article.post").eq(0).find('p.post-text');
      $(prev_p).replaceWith('<textarea class="form-control edit-post" id="edit-post" placeholder="Change your post." required>'+$(prev_p).html()+'</textarea>');
      $('textarea.edit-post').focus();
      $(this).toggle();
      return false;
  });
  //END OF EDIT POST

  //POSTING EDIT
  $(document).on("keypress", 'textarea.edit-post', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        var postid = $(this).parents('article.post').eq(0).attr('data-post-id');
        $(this).parents("article.post").eq(0).find('a.edit').toggle();
        let text = $(this).val();
        $(this).replaceWith('<p class="post-text">'+text+'</p>');
        var newtext = text;
        editPost(postid, newtext);
    }
  });

    $(document).on("click", 'textarea.edit-post', function(event) {
      event.preventDefault();
      return false;
    });
  //POSTING EDIT


  //ICON SELECTION
  $(document).on("click", 'div.icon-selector > p', function(event) {
      $('div.chosen-icon').html($(this).html());
      $('input[type=hidden]#icon').val($(this).html());
  });
  //END OF ICON SELECTION


  //NEWLY ADDED REMOVAL
  $(document).on("click", 'div.email-holder > div.added-email', function(event) {
    var tagval = ($(this).html());
    tagval = tagval.substring(0, tagval.indexOf('<'));

    var value = $('#emails').val();
    console.log(value);
    if(value == 'undefined') {
      value = [];
    } else {
        value = JSON.parse(value);

    }

    value = value.filter(item => item !== tagval);
    console.log(value);
    $('#emails').val(JSON.stringify(value));

      $(this).fadeOut();
  });
  //END OF NEWLY ADDED REMOVAL

  //ADD TO INVITE
  $(document).on("keypress", 'input.email-adder', function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        $('div.email-holder').append('<div class="added-email mr-2">'+$(this).val()+' <small>(delete)</small></div>')

        var value = $('#emails').val();
        console.log(value);
        if(value == 'undefined') {
          value = [];
        } else {
            value = JSON.parse(value);
        }
        console.log(value);
        value.push($(this).val());

        console.log(value);
        $('#emails').val(JSON.stringify(value));
        $(this).val('');
    }
  });
  //END OF ADD TO INVITE

  //REMOVE MEMBER
  $(document).on("click", 'div.member-holder > div.member', function(event) {

      $(this).fadeOut();

  });
  //END OF REMOVE MEMBER



});
