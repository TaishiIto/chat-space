#false
if @new_message.present?
  json.array! @new_message do |message|
    json.id  message.id
    json.name  message.user.name
    json.created_at  message.created_at.strftime("%Y/%m/%d %H:%M") 
    json.content  message.content
    json.image  message.image.url
  end
end