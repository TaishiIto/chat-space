#userテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|name|string|null: false|
### Association
- belongs_to :group
- belongs_to :user

#groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|
|group_id|integer|
|name|string|

### Association
- belongs_to :group
- belongs_to :user

#messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|integer|
|group_id|integer|
|name|string|

### Association
- belongs_to :group
- belongs_to :user