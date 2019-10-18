# DB設計

### usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true| 
|password|string|null: false, unique: true| 

### Association
- has_many :groups, through: :groups_users
- belongs_to :user
- has_many :messages

###  groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

### groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :user, through: :groups_users
- has_many :messages

### messagesテーブル
|Column|Type|Options|
|------|----|-------|
|coments|text|null: false|
|image|string|null: false|
|user_id|integer|null: false|
|group_id|integer|null: false|


### Association
- belongs_to :group
- belongs_to :user