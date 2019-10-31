# json.name @message.user.name
# json.time @message.created_at.strftime("%Y/%m/%d %H:%M")# time_formatsでも書ける
# json.content @message.content
# json.image @message.image.url
json.id  @message.id#fasle
json.name  @message.user.name
json.created_at  @message.created_at.strftime("%Y/%m/%d %H:%M") 
json.content  @message.content
json.image  @message.image.url
json.user_id  @message.user.id