extends Node2D


onready var Time = $CanvasLayer/Timer

onready var ready_timer = $CanvasLayer/READY
const target = preload("res://Target.tscn")

func _ready() -> void:
	yield($ready, "timeout")
	ready_timer.visible = false
	Globals.start = true
	spawn_targets(Globals.how_many)
func _process(delta):
	ready_timer.set_text(str(int($ready.get_time_left()+1)))
	if $ready.is_stopped(): 
		Time.set_text(Globals.time_text)
		if Globals.how_many <= Globals.hit:
			Globals.start = false
			get_tree().change_scene("res://EndScene.tscn")
			
func spawn_targets(quantity):
	var loop_qt = 0
	while quantity > loop_qt:  
		var target_hit = target.instance()
		add_child(target_hit)
		target_hit.animated.play("Spawn")
		loop_qt+=1

