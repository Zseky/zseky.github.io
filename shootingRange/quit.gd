extends Label


func _on_quit_mouse_entered() -> void:
	self.modulate.a = 0.5


func _on_quit_mouse_exited() -> void:
		self.modulate.a  = 1


func _on_quit_gui_input(event: InputEvent) -> void:
	if event.is_action_released("click"):
		get_tree().quit()


func _on_quit2_gui_input(event: InputEvent) -> void:
	if event.is_action_released("click"):
		get_tree().change_scene("res://Credits.tscn")

func _on_quit2_mouse_entered() -> void:
	get_parent().get_node("quit2").modulate.a = 0.5


func _on_quit2_mouse_exited() -> void:
	get_parent().get_node("quit2").modulate.a = 1
