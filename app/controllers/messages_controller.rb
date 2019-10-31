class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
    respond_to do |format|#false
      format.html
      format.json { @new_message = @group.messages.includes(:user).where('id > ?', params[:message][:id]) }
    end
  end

  def edit#false
  end

  def update
    @message = @group.messages.find(params[:id])
    @message.content = params[:content]
    if @message.save
      respond_to do |format|
        format.html  { redirect_to group_messages_path(@group), notice: 'メッセージが編集されました' }
        format.json
    end
  end

  def create#false
    @message = @group.messages.new(message_params)
      if @message.save
        respond_to do |format|
          format.html
          format.json
        end
      else
        @messages = @group.messages.includes(:user)
        flash.now[:alert] = 'メッセージを入力してください'
        render :index
      end
    end
  end

  def destroy#false
    @message =  @group.messages.find(params[:id])
    @message.destroy
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end