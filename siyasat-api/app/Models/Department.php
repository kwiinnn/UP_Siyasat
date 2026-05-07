<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $table = 'department';
    protected $primaryKey = 'department_id';
    public $timestamps = false;

    protected $fillable = [
        'department_name',
        'department_code',
        'college_name',
    ];

    public function degrees()
    {
        return $this->hasMany(Degree::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function researchDocuments()
    {
        return $this->hasMany(ResearchDocument::class);
    }
}