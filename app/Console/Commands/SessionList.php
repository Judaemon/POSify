<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SessionList extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sessions:list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'List all sessions.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $driver = config('session.driver');

        switch ($driver) {
            case 'file':
                $this->listFileSessions();
                break;
            case 'database':
                $this->listDatabaseSessions();
                break;
            case 'redis':
                $this->listRedisSessions();
                break;
            default:
                $this->error('Session driver not supported');
                break;
        }
    }

    protected function listFileSessions()
    {
        $files = Storage::disk('local')->files('framework/sessions');
        foreach ($files as $file) {
            $this->info($file);
        }
    }

    protected function listDatabaseSessions()
    {
        $sessions = DB::table('sessions')->get();
        foreach ($sessions as $session) {
            $this->info($session->id);
        }
    }

    protected function listRedisSessions()
    {
        // This is a simplified example, you need to adapt it to your redis setup
        $redis = app('redis');
        $keys = $redis->keys('*sessions*');
        foreach ($keys as $key) {
            $this->info($key);
        }
    }
}
