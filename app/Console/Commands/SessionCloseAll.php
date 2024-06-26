<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SessionCloseAll extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sessions:close-all';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Logs out all users by clearing the sessions table';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(){
        DB::table('sessions')->truncate();
        
        $this->info('All users have been logged out.');
    }
}
