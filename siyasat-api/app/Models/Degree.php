<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Degree extends Model
{
    protected $table = 'degree';
    public $timestamps = false;

    protected $fillable = [
        'degree_name',
        'degree_code',
        'degree_level',
        'department_id',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function researchDocuments()
    {
        return $this->hasMany(ResearchDocument::class);
    }
}