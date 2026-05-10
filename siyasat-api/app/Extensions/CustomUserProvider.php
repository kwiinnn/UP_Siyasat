<?php

namespace App\Extensions;

use Illuminate\Auth\EloquentUserProvider;

class CustomUserProvider extends EloquentUserProvider
{
    public function retrieveByCredentials(array $credentials)
    {
        // Remap 'email' → 'email_address' for Filament login
        if (isset($credentials['email'])) {
            $credentials['email_address'] = $credentials['email'];
            unset($credentials['email']);
        }

        return parent::retrieveByCredentials($credentials);
    }

    public function validateCredentials(
        \Illuminate\Contracts\Auth\Authenticatable $user,
        array $credentials
    ): bool {
        return $this->hasher->check(
            $credentials['password'],
            $user->getAuthPassword()
        );
    }
}