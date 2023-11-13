class EventsController < ApplicationController
  before_action :authenticate_admin!, except: [:show, :index]
  
  
  def index
    @events = Event.all
    respond_to do |format|
      format.html
      format.json { render 'calendar' }
    end
  end

  def show 
    @event = Event.find(params[:id])
  end
  
  def new
    @event = Event.new
  end
  
  def create
    @event = Event.new(event_params)
    @event.save
    redirect_to root_path
  end
  
  def edit
    @event = Event.find(params[:id])
  end
  
  def update
    @event = Event.find(params[:id])
    @event.update(event_params)
    redirect_to root_path
  end
  
  def destroy
    event = Event.find(params[:id])
    event.destroy
    redirect_to root_path
  end
  
  private
  
  def event_params
    params.require(:event).permit(:title, :description,:start, :end) 
  end
end
