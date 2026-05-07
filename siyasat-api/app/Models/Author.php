<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $table = 'author';
    protected $primaryKey = 'author_id';
    public $timestamps = false;

    protected $fillable = [
        'first_name',
        'last_name',
        'middle_initial',
        'affiliation',
    ];

    public function researchDocuments()
    {
        return $this->belongsToMany(
            ResearchDocument::class,
            'document_author',
            'author_id',
            'document_id'
        );
    }
}