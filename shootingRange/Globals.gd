extends Node

var how_many = 0
var hit : int
var time_text : String
var time_elapsed = 0
var elapsed_millisec : float
var elapsed_sec : float
var start = false
var lowest_time_5= 0
var lowest_time_15= 0
var lowest_time_30= 0
# Called when the node enters the scene tree for the first time.
func _process(delta: float):
	if start == true:
		time_elapsed += delta
		elapsed_millisec = fmod(time_elapsed,1)*1000
		elapsed_sec = fmod(time_elapsed, 60)
		time_text = "%02d . %02d" % [elapsed_sec, elapsed_millisec]
		print(how_many)
# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta: float) -> void:
#	pass
