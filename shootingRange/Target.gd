extends StaticBody2D


onready var animated = $AnimatedSprite
var random
onready var impact = $AudioStreamPlayer2D
# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	randomize()
	random = Vector2(rand_range(448,960),rand_range(64,576))
	self.global_position = random

func _on_Area2D_area_entered(area: Area2D) -> void:
	$Area2D.queue_free()
	animated.play("Explode")
	impact.play()
	Globals.hit +=1
	yield(animated, "animation_finished")
	queue_free()
