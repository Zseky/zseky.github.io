extends KinematicBody2D


# Declare member variables here. Examples:
# var a: int = 2
onready var no_ammo = $no_ammo
onready var pistol_sound = $AudioStreamPlayer2D
const bullet = preload("res://Bullet.tscn")
var new_bullet_pos = Vector2()
onready var position_bullet = $Position2D
var bullets 
onready var reload = $Reload_timer
var reload_now = false
onready var label = $ColorRect
onready var num_bullets = $Label
# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	self.global_position = Vector2(100,300)
	bullets = 5
	label.visible = false
func _physics_process(delta: float):
	self.look_at(get_global_mouse_position())
	new_bullet_pos = position_bullet.global_position
	num_bullets.set_text(str(bullets))
	if bullets <= 0 && reload_now == false:
		reload()
		reload_now = true
func _input(event: InputEvent) -> void:
	if event.is_action_released("click") && bullets > 0:
		var mouse = get_global_mouse_position()
		var hit = bullet.instance()
		get_parent().add_child(hit)
		hit.global_position = new_bullet_pos
		pistol_sound.play()
		hit.launch(mouse)
		bullets -=1
	elif event.is_action_released("click") && bullets <= 0: 
		no_ammo.play()
func reload():
	reload.start()
	label.visible = true
	$AudioStreamPlayer2D2.play()
		
func _on_Reload_timer_timeout() -> void:
	bullets = 5
	reload_now = false
	label.visible = false
