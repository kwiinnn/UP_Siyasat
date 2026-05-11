<?php

namespace App\Filament\Resources\Degrees\Schemas;

use App\Models\Department;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class DegreeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('department_id')
                    ->label('Department')
                    ->required()
                    ->options(
                        Department::all()->pluck('department_name', 'department_id')
                    )
                    ->searchable(),

                TextInput::make('degree_name')
                    ->label('Degree Name')
                    ->required()
                    ->maxLength(150)
                    ->placeholder('e.g. Bachelor of Science in Computer Science'),

                TextInput::make('degree_code')
                    ->label('Degree Code')
                    ->required()
                    ->maxLength(30)
                    ->placeholder('e.g. BSCS'),

                Select::make('degree_level')
                    ->label('Degree Level')
                    ->required()
                    ->options([
                        'Undergraduate' => 'Undergraduate',
                        'Postgraduate'  => 'Postgraduate',
                    ]),
            ]);
    }
}