<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\ModelStatus\HasStatuses;

class Team extends Model
{
	use HasFactory;
	use HasStatuses;

	protected $fillable = ['name', 'description'];
		
	function users()
	{
		return $this->belongsToMany(User::class);
	}

	function roles()
	{
		return $this->belongsToMany(Role::class);
	}
}
