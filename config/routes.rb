Rails.application.routes.draw do
  # devise_for :admins
  devise_for :admins, skip: [:registrations, :passwords], controllers: {
    sessions: 'admins/sessions'
  }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "events#index"
  get '/events', to: 'events#index', defaults: { format: 'json' }
  # get '/events/back_index', to: 'events#back_index'
  resources:events 
end
