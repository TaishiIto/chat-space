$(function() {
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
      </div>
    `;
    $("#user-search-result").append(html);
  }
  

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id) {
    let html = `
    <div class="ChatMember clearfix" id="${id}">
      <input name='group[user_ids][]' type='hidden' value=${ user_id }>
      <p class="ChatMember__name">${name}</p>
      <a class="ChatMember__remove ChatMember__button" data-user-id="${id}" data-user-name="${name}">削除</a>
    </div>`;
    
    $(".ChatMembers").append(html);
  }

  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    console.log(input);

    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input },
      dataType: "json"
    })

    .done(function(users) {
      $("#user-search-result").empty();

      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })

    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    })
  });
    $(document).on("click", ".user-search-add", function () {
    $('.ChatMember clearfix').val();
      var userId = $(this).data('user-id');
      var userName = $(this).data('user-name');
      addUser(userId,userName);
      $(this).parent().remove();
    });

    $(document).on("click", ".user-search-remove", function () {
      $(this).parent().remove();
    });
  });  

