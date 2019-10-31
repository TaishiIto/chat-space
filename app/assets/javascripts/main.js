$(function() {
  function buildHTML(message) {

      //htmlに書き換え  
      var addImage = '';
      if (message.image.url) {
        addImage = `<img src="${message.image.url}" class="lower-message__image">`;
      }
    // let image = message.image? `<img src="${message.image}">` : ""

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
  // var reloadMessages = function () {
  //   if (window.location.href.match(/\/groups\/\d+\/messages/)){
  //     var last_message_id = $('.message:last').data("message-id"); 
      

  //     $.ajax({ 
  //       url: "api/messages", 
  //       type: 'GET', 
  //       dataType: 'json', 
  //       data: {id: last_message_id} 
  //     })
  //     .done(function (messages) { 
  //       var insertHTML = '';
  //       messages.forEach(function (message) {
  //         insertHTML = buildHTML(message); 
  //         $('.messages').append(insertHTML);
  //       })
  //       // $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  //     })
  //     .fail(function () {
  //       alert('自動更新に失敗しました');
  //     });
  //   }
  // };
  // setInterval(reloadMessages, 5000);

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data("message-id");
    console.log(last_message_id);
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'GET',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
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
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
});

