<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'user';
    protected $primaryKey = 'user_id';

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

    protected $hidden = [
        'password_hash',
    ];

    // Tell Laravel which column is the password
    public function getAuthPassword()
    {
        return $this->password_hash;
    }

    // Tell Laravel which column is the email
    public function getEmailForPasswordReset()
    {
        return $this->email_address;
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
        return $this->hasMany(ResearchDocument::class, 'uploader_id');
    }
}