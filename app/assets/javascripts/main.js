$(function() {
  function buildHTML(message) {

      //htmlに書き換え  
      // var addImage = '';
      // if (message.image.url) {
      //   addImage = `<img src="${message.image.url}" class="lower-message__image">`;
      // }
      var addImage = '';
      message.image.url ? addImage = `<img src="${message.image.url}" class="lower-message__image">`:"";

    let html = `<div class="message" data-message-id=${message.id}>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    </div>
                     ${addImage}
                </div>`

    return html 
  }

  $("#new_message").on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    //urlの定義
    let url = $(this).attr("action");
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
      })
      .done(function(data) {
        
        let html = buildHTML(data);
        $('.messages').append(html);
        $('.form__submit').removeAttr('disabled');
        $('#new_message')[0].reset();
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      })

      .fail(function() {
        alert('error');
    });
  });
  

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {last_id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
         insertHTML = buildHTML(message); 
         $('.messages').append(insertHTML);
         $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      })

    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 5000);
});

