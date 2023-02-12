extends KinematicBody2D


# Declare member variables here. Examples:
# var a: int = 2
var speed = 5000
var velocity = Vector2.ZERO
var angle

# Called when the node enters the scene tree for the first time.
func launch(mouse):
	angle = get_angle_to(mouse)
	self.rotate(angle)
	velocity.x = cos(angle)
	velocity.y = sin(angle)
	
func _physics_process(delta):
	move_and_slide(velocity*speed)

# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta: float) -> void:
#	pass







func _on_VisibilityNotifier2D_screen_exited() -> void:
	queue_free()




func _on_Area2D_area_entered(area: Area2D) -> void:
	queue_free()
