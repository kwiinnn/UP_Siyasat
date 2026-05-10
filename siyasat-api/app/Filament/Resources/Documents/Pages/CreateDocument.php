<?php

namespace App\Filament\Resources\Documents\Pages;

use App\Filament\Resources\Documents\DocumentResource;
use Filament\Resources\Pages\CreateRecord;

class CreateDocument extends CreateRecord
{
    protected static string $resource = DocumentResource::class;

    // Automatically set uploader_id to the logged-in admin user
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['uploader_id'] = auth()->user()->user_id;

        return $data;
    }
}