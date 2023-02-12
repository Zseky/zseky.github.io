extends HBoxContainer

var change = false

func _on_play5_gui_input(event: InputEvent) -> void:
	if event.is_action_released("click") && change == false:
		Globals.how_many = 5
		get_tree().change_scene("res://LimitBorders.tscn")
		change = true

func _on_play5_mouse_entered() -> void:
	$play5.modulate.a = 0.5


func _on_play5_mouse_exited() -> void:
	$play5.modulate.a = 1


func _on_play6_mouse_entered() -> void:
	$play6.modulate.a = 0.5


func _on_play6_gui_input(event: InputEvent) -> void:
	if event.is_action_released("click") && change == false:
		Globals.how_many = 15
		get_tree().change_scene("res://LimitBorders.tscn")
		change = true

func _on_play6_mouse_exited() -> void:
	$play6.modulate.a = 1


func _on_play7_gui_input(event: InputEvent) -> void:
	if event.is_action_released("click") && change == false:
		Globals.how_many = 30
		get_tree().change_scene("res://LimitBorders.tscn")
		change = true


func _on_play7_mouse_entered() -> void:
	$play7.modulate.a = 0.5


func _on_play7_mouse_exited() -> void:
	$play7.modulate.a = 1
