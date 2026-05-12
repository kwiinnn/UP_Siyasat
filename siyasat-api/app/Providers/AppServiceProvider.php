<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use App\Extensions\CustomUserProvider;
use Illuminate\Support\Facades\URL;

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

        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }
}