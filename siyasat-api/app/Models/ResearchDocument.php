<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResearchDocument extends Model
{
    protected $table = 'research_document';
    const CREATED_AT = 'upload_date';
    const UPDATED_AT = 'updated_at';

    protected $fillable = [
        'title',
        'abstract',
        'publication_year',
        'document_type',
        'degree_id',
        'drive_url',
        'uploader_id',
        'department_id',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function degree()
    {
        return $this->belongsTo(Degree::class);
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploader_id');
    }

    public function authors()
    {
        return $this->belongsToMany(
            Author::class,
            'document_author',
            'document_id',
            'author_id'
        );
    }

    public function categories()
    {
        return $this->belongsToMany(
            Category::class,
            'document_category',
            'document_id',
            'category_id'
        );
    }
}