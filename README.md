### userテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|
|password|

### Association
- belongs_to :group
- belongs_to :user
  has_many :messages

###  user_groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|


### groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|

### Association
- belongs_to :user
  has_many :messages

### messagesテーブル
|Column|Type|Options|
|------|----|-------|
|coments|text|
|image|string|
|user_id|integer|
|group_id|integer|


### Association
- belongs_to :group
- belongs_to :user