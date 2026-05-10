<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use App\Extensions\CustomUserProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        Auth::provider('custom', function ($app, array $config) {
            return new CustomUserProvider(
                $app['hash'],
                $config['model']
            );
        });
    }
}