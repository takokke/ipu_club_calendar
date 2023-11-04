json.array!(@events) do |event|
  json.id event.id
  json.title event.title
  json.description event.description
  json.start event.start.in_time_zone
  json.end event.end.in_time_zone
end