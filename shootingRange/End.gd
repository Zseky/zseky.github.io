extends VBoxContainer


# Declare member variables here. Examples:
# var a: int = 2
# var b: String = "text"
var elapsed_millisec_5
var elapsed_sec_5
var time_text_5
var elapsed_millisec_15
var elapsed_sec_15
var time_text_15
var elapsed_millisec_30
var elapsed_sec_30
var time_text_30

onready var text_5 = $CenterContainer/best5
onready var text_15 = $CenterContainer3/best15
onready var text_30 = $CenterContainer2/best30

onready var Label1 = $Label
onready var Label2 = $Label3
onready var Label3 = $Label2
# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	var new_time = Globals.time_elapsed
	if Globals.how_many == 5:
		if Globals.lowest_time_5 != 0:
			if new_time < Globals.lowest_time_5:
				Globals.lowest_time_5 = new_time
				print(Globals.lowest_time_5)
		else: 
			Globals.lowest_time_5 = new_time
	elif Globals.how_many == 15:
		if Globals.lowest_time_15 != 0:
			if new_time < Globals.lowest_time_15:
				Globals.lowest_time_15 = new_time
		else: 
			Globals.lowest_time_15 = new_time
	elif Globals.how_many == 30:
		if Globals.lowest_time_30 != 0:
			if new_time < Globals.lowest_time_30:
				Globals.lowest_time_30 = new_time
		else:
			Globals.lowest_time_30 = new_time
	elapsed_millisec_5 = fmod(Globals.lowest_time_5,1)*1000
	elapsed_sec_5 = fmod(Globals.lowest_time_5, 60)
	time_text_5 = "%02d . %02d" % [elapsed_sec_5, elapsed_millisec_5]
	elapsed_millisec_15 = fmod(Globals.lowest_time_15,1)*1000
	elapsed_sec_15 = fmod(Globals.lowest_time_15, 60)
	time_text_15 = "%02d . %02d" % [elapsed_sec_15, elapsed_millisec_15]
	elapsed_millisec_30 = fmod(Globals.lowest_time_30,1)*1000
	elapsed_sec_30 = fmod(Globals.lowest_time_30, 60)
	time_text_30 = "%02d . %02d" % [elapsed_sec_30, elapsed_millisec_30]
	
	if Globals.lowest_time_5 == 0:
		text_5.set_text("None")
	else:
		text_5.set_text(time_text_5)
		
	if Globals.lowest_time_15 == 0:
		text_15.set_text("None")
	else:
		text_15.set_text(time_text_15)
		
	if Globals.lowest_time_30 == 0:
		text_30.set_text("None")
	else:
		text_30.set_text(time_text_30)

# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta: float) -> void:
#	pass


func _on_Label_gui_input(event: InputEvent) -> void:
	if event.is_action_released("click"):
		Globals.time_elapsed = 0
		Globals.hit = 0
		get_tree().change_scene("res://LimitBorders.tscn")

func _on_Label_mouse_entered() -> void:
	Label1.modulate.a = 0.5


func _on_Label_mouse_exited() -> void:
	Label1.modulate.a = 1


func _on_Label3_gui_input(event: InputEvent) -> void:
	if event.is_action_released("click"):
		Globals.time_elapsed = 0
		Globals.hit = 0
		get_tree().change_scene("res://Start.tscn")


func _on_Label3_mouse_entered() -> void:
	Label2.modulate.a = 0.5

func _on_Label3_mouse_exited() -> void:
	Label2.modulate.a = 1


func _on_Label2_gui_input(event: InputEvent) -> void:
	if event.is_action_released("click"):
		get_tree().quit()

func _on_Label2_mouse_exited() -> void:
	Label3.modulate.a = 1


func _on_Label2_mouse_entered() -> void:
	Label3.modulate.a = 0.5
