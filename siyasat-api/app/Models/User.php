<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Filament\Models\Contracts\HasName;

class User extends Authenticatable implements FilamentUser, HasName
{
    use HasApiTokens, Notifiable;

    protected $table      = 'user';
    protected $primaryKey = 'user_id';
    public $incrementing  = true;
    protected $keyType    = 'int';

    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    protected $fillable = [
        'institutional_id',
        'first_name',
        'last_name',
        'email_address',
        'password_hash',
        'account_role',
        'department_id',
    ];

    protected $hidden = ['password_hash'];

    public function getFilamentEmail(): string
    {
        return $this->email_address;
    }

    public static function getFilamentEmailField(): string  
    {
        return 'email_address';
    }

    public function getFilamentName(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getAuthPassword(): string
    {
        return $this->password_hash;
    }

    public function getAuthIdentifierName(): string
    {
        return 'email_address';
    }

    public function getEmailForPasswordReset(): string
    {
        return $this->email_address;
    }

    // Only ColSec_Admin can access the Filament panel
    public function canAccessPanel(Panel $panel): bool
    {
        return $this->account_role === 'Colsec_Admin';
    }

    public function isAdmin(): bool
    {
        return $this->account_role === 'Colsec_Admin';
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function uploadedDocuments()
    {
        return $this->hasMany(ResearchDocument::class, 'uploader_id', 'user_id');
    }
}