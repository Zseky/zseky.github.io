extends Label


# Declare member variables here. Examples:
# var a: int = 2
# var b: String = "text"


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta: float) -> void:
#	pass


func _on_Label_mouse_entered() -> void:
	self.modulate.a = 0.5


func _on_Label_mouse_exited() -> void:
	self.modulate.a = 1


func _on_Label_gui_input(event: InputEvent) -> void:
	if event.is_action_released("click"):
		Globals.hit = 0
		Globals.time_elapsed = 0
		get_tree().change_scene("res://LimitBorders.tscn")
