<?php

namespace Database\Seeders;

use App\Enums\TeamStatus;
use App\Enums\UserStatus;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 */
	public function run(): void
	{
		// User::factory(10)->create();

		$user = User::factory()->create([
			'name' => 'Test User',
			'email' => 'test@gmail.com',
			'password' => Hash::make('123123123'),
		]);

		$user->setStatus(UserStatus::ACTIVE->value, "User creation");
		$user->teams()->create([
			'name' => "Test's Team",
			'description' => "This is your personal team. You can create more teams and invite other users to collaborate.",
		])->setStatus(TeamStatus::ACTIVE->value, "User specific team creation");
	}
}
