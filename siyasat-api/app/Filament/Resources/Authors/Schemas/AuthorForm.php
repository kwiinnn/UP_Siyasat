<?php

namespace App\Filament\Resources\Authors\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AuthorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('first_name')
                    ->required()
                    ->maxLength(50),
                TextInput::make('last_name')
                    ->required()
                    ->maxLength(50),
                TextInput::make('middle_initial')
                    ->maxLength(5)
                    ->nullable(),
                TextInput::make('affiliation')
                    ->default('UP Mindanao')
                    ->maxLength(100),
            ]);
    }
}