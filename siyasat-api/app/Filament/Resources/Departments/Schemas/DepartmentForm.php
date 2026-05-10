<?php

namespace App\Filament\Resources\Departments\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class DepartmentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('department_name')
                    ->label('Department Name')
                    ->required()
                    ->maxLength(100),

                TextInput::make('department_code')
                    ->label('Department Code')
                    ->required()
                    ->maxLength(10),

                Select::make('college_name')
                    ->label('College')
                    ->required()
                    ->options([
                        'CSM'  => 'College of Sciences and Mathematics',
                        'CHSS' => 'College of Humanities and Social Sciences',
                        'SOM'  => 'School of Management',
                    ]),
            ]);
    }
}