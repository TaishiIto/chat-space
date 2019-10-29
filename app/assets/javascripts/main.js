$(function() {
  function buildHTML(message) {
      //htmlに書き換え  
    

    let image = message.image? `<img src="${message.image}">` : ""

    let html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.name}
                    </div>
                    <div class="upper-message__date">
                      ${message.time}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    </div>
                     ${image}
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

    //dataに@messageの情報が入る
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
});